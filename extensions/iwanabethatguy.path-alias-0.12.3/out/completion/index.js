"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportFunctionCompletion = exports.PathAliasCompletion = void 0;
const vscode_1 = require("vscode");
const common_1 = require("../util/common");
const path = require("path");
const fs = require("fs");
const traverseSourceFile_1 = require("../util/traverseSourceFile");
const isWin = process.platform === "win32";
class PathAliasCompletion {
    constructor(statMap, aliasList) {
        this._aliasList = [];
        this._needExtension = true;
        let subscriptions = [];
        this._needExtension = !!vscode_1.workspace
            .getConfiguration('pathAlias')
            .get('needExtension');
        this._autoSuggestion = !!vscode_1.workspace
            .getConfiguration('pathAlias')
            .get('autoSuggestion');
        this._ignoreExtensionList =
            vscode_1.workspace.getConfiguration('pathAlias').get('ignoreExtensionList') || [];
        this.setStatMapAndAliasList(statMap, aliasList);
        // 当配置更新时，查看pathalias 配置有相关更新
        vscode_1.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('pathAlias.needExtension')) {
                this._needExtension = !!vscode_1.workspace
                    .getConfiguration('pathAlias')
                    .get('needExtension');
            }
            if (e.affectsConfiguration('pathAlias.ignoreExtensionList')) {
                this._ignoreExtensionList =
                    vscode_1.workspace.getConfiguration('pathAlias').get('ignoreExtensionList') ||
                        [];
            }
            if (e.affectsConfiguration('pathAlias.autoSuggestion')) {
                this._autoSuggestion = !!vscode_1.workspace
                    .getConfiguration('pathAlias')
                    .get('autoSuggestion');
            }
        });
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    setStatMapAndAliasList(statMap, aliasList) {
        this._statMap = statMap;
        this._aliasList = aliasList;
    }
    dispose() {
        this._disposable.dispose();
    }
    provideCompletionItems(document, position, token, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const completionList = [];
            // console.time('completion');
            const aliasReg = /\"(.*?)\"|\'(.*?)\'/;
            const range = document.getWordRangeAtPosition(position, aliasReg);
            const index = common_1.getIndexOfWorkspaceFolder(document.uri);
            if (index === undefined)
                return completionList;
            if (range) {
                const inputPath = document.getText(range);
                const resPath = inputPath.slice(1, -1);
                const mostLike = common_1.mostLikeAlias(this._aliasList[index], resPath.split('/')[0]);
                if (mostLike) {
                    let statInfo = this._statMap[index][mostLike];
                    let prefixPathList = [];
                    let insertPath = '';
                    resPath.split('/').forEach((path, index, array) => {
                        if (index > 0 && index < array.length - 1) {
                            prefixPathList.push(path);
                        }
                        else if (index === array.length - 1) {
                            insertPath = path;
                        }
                    });
                    const lastPath = prefixPathList.reduce((pre, cur) => {
                        if (common_1.isObject(pre)) {
                            pre = pre.children[cur];
                            return pre;
                        }
                        return null;
                    }, statInfo);
                    if (lastPath) {
                        const children = lastPath.children;
                        const retCompletionList = Object.keys(children).map((key) => {
                            const curStatInfo = children[key];
                            const completionItem = new vscode_1.CompletionItem(key);
                            // debugger
                            const replaceRange = getInsertPathRange(range, document, insertPath.length);
                            completionItem.range = replaceRange;
                            const splitList = key.split('.');
                            const basename = splitList.slice(0, -1).join('.');
                            const extension = splitList[splitList.length - 1];
                            if (curStatInfo.type === 'file' &&
                                !this._needExtension &&
                                this._ignoreExtensionList.indexOf(extension) > -1) {
                                completionItem.insertText = basename;
                            }
                            completionItem.kind =
                                curStatInfo.type === 'directory'
                                    ? vscode_1.CompletionItemKind.Folder
                                    : vscode_1.CompletionItemKind.File;
                            if (curStatInfo.type !== 'file' && this._autoSuggestion) {
                                completionItem.label += '/';
                                completionItem.command = {
                                    command: 'editor.action.triggerSuggest',
                                    title: 'Trigger Suggest'
                                };
                            }
                            return completionItem;
                        });
                        completionList.push(...retCompletionList);
                    }
                }
            }
            else {
                completionList.push(...this.importCompletion(document, position));
            }
            // console.timeEnd('completion');
            return completionList;
        });
    }
    importCompletion(document, position) {
        const importReg = /(import\s*){([^{}]*)}\s*from\s*(?:('(?:.*)'|"(?:.*)"))/g;
        const content = document.getText();
        const zeroBasedPosition = document.offsetAt(position);
        const completionList = [];
        const index = common_1.getIndexOfWorkspaceFolder(document.uri);
        if (index === undefined)
            return completionList;
        // console.time('reg');
        let execResult = null;
        while (execResult = importReg.exec(content)) {
            const [, beforeLeftBrace, importIdentifiers] = execResult;
            const index = execResult.index;
            const leftBrachStart = index + beforeLeftBrace.length;
            if (zeroBasedPosition > leftBrachStart &&
                zeroBasedPosition <= leftBrachStart + importIdentifiers.length + 1) {
                break;
            }
        }
        console.timeEnd('reg');
        if (execResult) {
            let [, , importIdentifiers, pathAlias] = execResult;
            pathAlias = pathAlias.slice(1, -1);
            const mostLike = common_1.mostLikeAlias(this._aliasList[index], pathAlias.split('/')[0]);
            if (mostLike) {
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
                    console.time('ast');
                    const absolutePathWithExtname = absolutePath + '.' + extname;
                    const file = fs.readFileSync(absolutePathWithExtname, {
                        encoding: 'utf8'
                    });
                    // 这里是已经导入的函数或变量
                    const importIdentifierList = importIdentifiers
                        .split(',')
                        .filter(Boolean)
                        .map(id => id.trim());
                    const exportIdentifierList = traverseSourceFile_1.traverse(absolutePathWithExtname, file);
                    console.timeEnd('ast');
                    const retCompletionList = exportIdentifierList
                        .filter(token => importIdentifierList.indexOf(token.identifier) === -1)
                        .map(token => {
                        const completionItem = new vscode_1.CompletionItem(token.identifier);
                        completionItem.sortText = `0${token.identifier}`;
                        completionItem.kind =
                            token.kind === 'function'
                                ? vscode_1.CompletionItemKind.Function
                                : vscode_1.CompletionItemKind.Property;
                        completionItem.documentation = token.description;
                        return completionItem;
                    });
                    completionList.push(...retCompletionList);
                }
            }
        }
        return completionList;
    }
}
exports.PathAliasCompletion = PathAliasCompletion;
class ImportFunctionCompletion {
    constructor() {
        this._functionTokenList = [];
        this._absoluteToAliasMap = new Map();
        let subscriptions = [];
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    setFunctionTokenListAndPathList(functionTokenList, absolutePathList, aliasPathList) {
        this._absoluteToAliasMap.clear();
        this._functionTokenList = functionTokenList;
        for (let i = 0; i < absolutePathList.length; i++) {
            this._absoluteToAliasMap.set(absolutePathList[i], aliasPathList[i]);
        }
    }
    dispose() {
        this._disposable.dispose();
    }
    provideCompletionItems(document, position, token, context) {
        return __awaiter(this, void 0, void 0, function* () {
            console.time('completion');
            // const aliasReg = /\"(.*?)\"|\'(.*?)\'/;
            const importReg = /(import\s*){([^{}]*)}\s*from\s*(?:('(?:.*)'|"(?:.*)"))/g;
            const content = document.getText();
            const completionList = [];
            console.time('reg');
            const aliasInfoMap = new Map();
            let execResult = null;
            const importIdentifierSet = new Set();
            while ((execResult = importReg.exec(content))) {
                let empty = true;
                let [, beforeLeftBrace, importIdentifiers, pathAlias] = execResult;
                pathAlias = pathAlias.slice(1, -1);
                const index = execResult.index;
                const braceEnd = index + beforeLeftBrace.length + importIdentifiers.length + 1;
                importIdentifiers.split(',').forEach(identifier => {
                    const normalizedIdentifier = identifier.trim();
                    if (normalizedIdentifier) {
                        importIdentifierSet.add(identifier.trim());
                        if (empty) {
                            empty = false;
                        }
                    }
                });
                aliasInfoMap.set(pathAlias, {
                    braceEnd,
                    empty
                });
            }
            const range = document.getWordRangeAtPosition(position);
            // debugger;
            if (range) {
                // const callerToken = document.getText(range);
                const signatureHelpCollectList = this._functionTokenList;
                for (let i = 0, length = signatureHelpCollectList.length; i < length; i++) {
                    const item = signatureHelpCollectList[i].functionTokenList;
                    const path = isWin ? signatureHelpCollectList[i].id.replace(/\//g, '\\') : signatureHelpCollectList[i].id;
                    const aliasPath = this._absoluteToAliasMap.get(path);
                    let zeroBasedPosition;
                    let info;
                    let insertRange = null;
                    if (aliasPath) {
                        info = aliasInfoMap.get(aliasPath);
                        if (info) {
                            zeroBasedPosition = info.braceEnd;
                        }
                        if (zeroBasedPosition !== undefined) {
                            insertRange = new vscode_1.Range(document.positionAt(zeroBasedPosition), document.positionAt(zeroBasedPosition));
                        }
                    }
                    for (let j = 0, len = item.length; j < len; j++) {
                        if (importIdentifierSet.has(item[j].name)) {
                            continue;
                        }
                        const completionItem = new vscode_1.CompletionItem(item[j].name);
                        completionItem.kind = vscode_1.CompletionItemKind.Function;
                        completionItem.documentation = item[j].documentation;
                        completionItem.detail = `从 ${path} 自动导入\n${item[j].type}`;
                        completionList.push(completionItem);
                        if (info && insertRange) {
                            completionItem.additionalTextEdits = [
                                {
                                    newText: `${info.empty ? '' : ','} ${item[j].name}`,
                                    range: insertRange,
                                    newEol: vscode_1.EndOfLine.LF
                                }
                            ];
                        }
                    }
                }
            }
            console.timeEnd('completion');
            return completionList;
        });
    }
}
exports.ImportFunctionCompletion = ImportFunctionCompletion;
function getInsertPathRange(range, document, length) {
    const numberOfEndPoint = document.offsetAt(range.end);
    const end = document.positionAt(numberOfEndPoint - 1);
    const start = document.positionAt(numberOfEndPoint - length - 1);
    return new vscode_1.Range(start, end);
}
//# sourceMappingURL=index.js.map