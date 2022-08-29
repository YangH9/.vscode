"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathAlias = exports.eventBus = void 0;
const vscode_1 = require("vscode");
const fs = require("fs");
const completion_1 = require("./completion");
const definition_1 = require("./definition");
const tag_1 = require("./definition/tag");
const fs_1 = require("fs");
const path = require("path");
const events_1 = require("events");
const common_1 = require("./util/common");
const watcher_1 = require("./util/watcher");
const codeAction_1 = require("./codeAction");
const config_1 = require("./util/config");
const signature_1 = require("./signature");
const getSignatureFromFile_1 = require("./util/getSignatureFromFile");
exports.eventBus = new events_1.EventEmitter();
const isWin = process.platform === "win32";
class PathAlias {
    constructor(ctx) {
        this._statMap = [{}];
        this._aliasMap = [{}];
        this._aliasList = [];
        this._importAbsolutePathList = [];
        this._importAliasPathList = [];
        this._functionTokenList = [];
        // console.time('init');
        this._ctx = ctx;
        this.init();
        if (vscode_1.workspace.workspaceFolders && vscode_1.workspace.getWorkspaceFolder.length) {
            vscode_1.workspace.workspaceFolders.forEach(ws => {
                watcher_1.generateWatcher(ws.uri.fsPath);
            });
        }
        vscode_1.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('pathAlias.aliasMap')) {
                this.updateStatInfo();
            }
        });
        vscode_1.window.onDidChangeActiveTextEditor(event => {
            if (event) {
                this.recollectDependencies(event.document);
            }
        });
        const handler = common_1.debounce(() => {
            this.updateStatInfo();
        }, 1000);
        exports.eventBus
            .on('file-change', path => {
            const normalizedPath = isWin ? path.replace(/\\/g, '/') : path;
            const ws = vscode_1.workspace.getWorkspaceFolder(vscode_1.Uri.parse(`file://${normalizedPath}`));
            if (!ws) {
                return;
            }
            handler();
        })
            .on('recollect', (document) => {
            if (document) {
                this.recollectDependencies(document);
            }
        });
        // console.timeEnd('init');
    }
    recollectDependencies(document) {
        this._functionTokenList = [];
        this._importAliasPathList = [];
        this._importAbsolutePathList = [];
        const importReg = /(import\s*){([^{}]*)}\s*from\s*(?:('(?:.*)'|"(?:.*)"))/g;
        const content = document.getText();
        let execResult = null;
        const ws = vscode_1.workspace.getWorkspaceFolder(document.uri);
        if (!ws) {
            return;
        }
        const index = ws.index;
        while ((execResult = importReg.exec(content))) {
            let [, , , pathAlias] = execResult;
            pathAlias = pathAlias.slice(1, -1);
            const mostLike = common_1.mostLikeAlias(this._aliasList[index], pathAlias.split('/')[0]);
            if (mostLike) {
                this._importAliasPathList.push(pathAlias);
                const pathList = [
                    this._statMap[index][mostLike]['absolutePath'],
                    ...pathAlias.split('/').slice(1)
                ];
                let absolutePath = path.join(...pathList);
                let extname = path.extname(absolutePath);
                if (!extname) {
                    if (fs.existsSync(`${absolutePath}.js`)) {
                        extname = 'js';
                    }
                    else if (fs.existsSync(`${absolutePath}.ts`)) {
                        extname = 'ts';
                    }
                    else if (fs.existsSync(common_1.normalizePath(absolutePath))) {
                        absolutePath += '/index';
                        extname = 'js';
                    }
                }
                if (extname === 'js' || extname === 'ts') {
                    // console.time('ast');
                    const absolutePathWithExtname = absolutePath + '.' + extname;
                    // const file = fs.readFileSync(absolutePathWithExtname, {
                    //   encoding: 'utf8'
                    // }).toString();
                    this._importAbsolutePathList.push(absolutePathWithExtname);
                }
            }
        }
        this._functionTokenList = getSignatureFromFile_1.getFunctionSignatureFromFiles(this._importAbsolutePathList);
        this._importCompletion.setFunctionTokenListAndPathList(this._functionTokenList, this._importAbsolutePathList, this._importAliasPathList);
        this._signature.setFunctionTokenList(this._functionTokenList.reduce((pre, cur) => {
            return pre.concat(cur.functionTokenList);
        }, []));
    }
    init() {
        this.initStatInfo();
        this.initCompletion();
        this.initDefinition();
        this.initCodeAction();
        this.initSignature();
    }
    initSignature() {
        this._signature = new signature_1.PathAliasSignatureHelpProvider();
        this._ctx.subscriptions.push(vscode_1.languages.registerSignatureHelpProvider([
            { language: 'javascript', scheme: 'file' },
            { language: 'vue', scheme: 'file' }
        ], this._signature, ',', '('));
    }
    updateStatInfo() {
        this.initStatInfo();
        this._completion.setStatMapAndAliasList(this._statMap, this._aliasList);
        this._definition.setStatMapAndAliasList(this._statMap, this._aliasList);
        this._tagDefinition.setStatMapAndAliasList(this._statMap, this._aliasList);
    }
    initStatInfo() {
        if (vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders.length) {
            this._statMap = vscode_1.workspace.workspaceFolders.map(_ => ({}));
            vscode_1.workspace.workspaceFolders.forEach((ws, index) => {
                this._aliasMap[index] =
                    vscode_1.workspace.getConfiguration('pathAlias').get('aliasMap') || {};
                this._aliasMap[index] = Object.assign(Object.assign({}, this._aliasMap[index]), config_1.getAliasConfig(ws.uri.fsPath || ''));
                Object.keys(this._aliasMap[index]).forEach(alias => {
                    const realPath = this._aliasMap[index][alias].replace('${cwd}', ws.uri.fsPath || '');
                    let isLegal = true;
                    if (isLegal && !fs_1.existsSync(realPath)) {
                        console.warn(`${realPath} does not exist`);
                        isLegal = false;
                    }
                    else if (isLegal && !path.isAbsolute(realPath)) {
                        console.warn(`${realPath} is not a absolutePath`);
                        isLegal = false;
                    }
                    else if (isLegal && !fs_1.statSync(realPath).isDirectory()) {
                        console.warn(`${realPath} is not a directory`);
                        isLegal = false;
                    }
                    if (isLegal) {
                        this._statMap[index][alias] = aliasStatInfo(alias, realPath);
                    }
                });
                this._aliasList[index] = Object.keys(this._aliasMap[index]).sort();
            });
        }
    }
    initCodeAction() {
        this._codeAction = new codeAction_1.PathAliasCodeActionProvider(this._statMap);
        this._ctx.subscriptions.push(vscode_1.languages.registerCodeActionsProvider([
            { language: 'javascript', scheme: 'file' },
            { language: 'vue', scheme: 'file' }
        ], this._codeAction));
    }
    initCompletion() {
        this._completion = new completion_1.PathAliasCompletion(this._statMap, this._aliasList);
        this._importCompletion = new completion_1.ImportFunctionCompletion();
        this._ctx.subscriptions.push(vscode_1.languages.registerCompletionItemProvider([
            { language: 'javascript', scheme: 'file' },
            { language: 'vue', scheme: 'file' }
        ], this._completion, '/', ',', '{'), vscode_1.languages.registerCompletionItemProvider([
            { language: 'javascript', scheme: 'file' },
            { language: 'vue', scheme: 'file' }
        ], this._importCompletion));
    }
    initDefinition() {
        this._definition = new definition_1.PathAliasDefinition(this._statMap, this._aliasList);
        this._tagDefinition = new tag_1.PathAliasTagDefinition(this._statMap, this._aliasList);
        this._ctx.subscriptions.push(vscode_1.languages.registerDefinitionProvider([
            { language: 'javascript', scheme: 'file' },
            { language: 'vue', scheme: 'file' }
        ], this._definition), vscode_1.languages.registerDefinitionProvider([{ language: 'vue', scheme: 'file' }], this._tagDefinition));
    }
}
exports.PathAlias = PathAlias;
function aliasStatInfo(alias, realPath) {
    if (isWin) {
        realPath = realPath.replace(/\//g, '\\');
    }
    const stat = {
        name: alias,
        type: 'directory',
        absolutePath: realPath,
        children: Object.create(null)
    };
    stat['children'] = fs_1.readdirSync(realPath).reduce((pre, currentPath) => {
        if (currentPath !== 'node_modules') {
            const absolutePath = path.resolve(realPath, currentPath);
            pre[currentPath] = getStatInfo(currentPath, absolutePath);
        }
        return pre;
    }, stat.children);
    return stat;
}
function getStatInfo(name, absolutePath) {
    const resStatInfo = {
        name,
        absolutePath,
        type: 'file',
        children: Object.create(null)
    };
    if (fs_1.statSync(absolutePath).isDirectory()) {
        resStatInfo['children'] = fs_1.readdirSync(absolutePath).reduce((pre, curName) => {
            if (curName !== 'node_modules') {
                pre[curName] = getStatInfo(curName, path.resolve(absolutePath, curName));
            }
            return pre;
        }, resStatInfo.children);
        resStatInfo['type'] = 'directory';
    }
    return resStatInfo;
}
//# sourceMappingURL=index.js.map