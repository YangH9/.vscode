"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathAliasDefinition = void 0;
const vscode_1 = require("vscode");
const common_1 = require("../util/common");
const path = require("path");
const fs = require("fs");
const traverseSourceFile_1 = require("../util/traverseSourceFile");
class PathAliasDefinition {
    constructor(statMap, aliasList) {
        this._aliasList = [];
        let subscriptions = [];
        this._disposable = vscode_1.Disposable.from(...subscriptions);
        this.setStatMapAndAliasList(statMap, aliasList);
    }
    dispose() {
        this._disposable.dispose();
    }
    setStatMapAndAliasList(statMap, aliasList) {
        this._statMap = statMap;
        this._aliasList = aliasList;
    }
    provideDefinition(document, position, token) {
        const reg = /\"(.*)\"|\'(.*)\'/;
        const range = document.getWordRangeAtPosition(position, reg);
        const index = common_1.getIndexOfWorkspaceFolder(document.uri);
        if (index === undefined)
            return null;
        if (range) {
            const inputPath = document.getText(range);
            const resPath = inputPath.slice(1, -1);
            const mostLike = common_1.mostLikeAlias(this._aliasList[index], resPath.split('/')[0]);
            if (mostLike) {
                let statInfo = this._statMap[index][mostLike];
                let splitPath = resPath.split('/').slice(1).filter(Boolean);
                const lastStatInfo = splitPath
                    .slice(0, -1)
                    .reduce((pre, cur) => {
                    if (common_1.isObject(pre)) {
                        pre = pre.children[cur];
                        return pre;
                    }
                    return null;
                }, statInfo);
                const currentDocumentExt = path.extname(document.uri.path);
                if (lastStatInfo) {
                    let lastPath = lastStatInfo.children[splitPath[splitPath.length - 1]];
                    if (lastPath || lastStatInfo.type === 'directory') {
                        if (lastPath && lastPath.type === 'file') {
                            return new vscode_1.Location(vscode_1.Uri.file(lastPath.absolutePath), new vscode_1.Position(0, 0));
                        }
                        {
                            // if path has no base string, only dir name
                            if (lastPath && lastPath.type === 'directory') {
                                let extensionList = [`${currentDocumentExt}`, '.js'];
                                for (let i = 0; i < extensionList.length; i++) {
                                    const extension = extensionList[i];
                                    const tryAddIndexFileToPath = path.resolve(lastPath.absolutePath, `index${extension}`);
                                    if (fs.existsSync(tryAddIndexFileToPath)) {
                                        return new vscode_1.Location(vscode_1.Uri.file(tryAddIndexFileToPath), new vscode_1.Position(0, 0));
                                    }
                                }
                            }
                            else {
                                lastPath = lastStatInfo;
                                // here the absolute path has base string, try to add extension
                                const basename = path.basename(resPath);
                                let extensionList = [`${currentDocumentExt}`, '.js'];
                                for (let i = 0; i < extensionList.length; i++) {
                                    const extension = extensionList[i];
                                    const tryAddIndexFileToPath = path.resolve(lastPath.absolutePath, `${basename}${extension}`);
                                    if (fs.existsSync(tryAddIndexFileToPath)) {
                                        return new vscode_1.Location(vscode_1.Uri.file(tryAddIndexFileToPath), new vscode_1.Position(0, 0));
                                    }
                                }
                            }
                        }
                    }
                    else {
                        const lastPathDir = lastStatInfo.absolutePath;
                        const lastPathString = splitPath[splitPath.length - 1] || '';
                        const lastPathPrefix = path.resolve(lastPathDir, lastPathString);
                        const currentDocumentTypePath = lastPathPrefix + currentDocumentExt;
                        const JsTypePath = lastPathPrefix + '.js';
                        if (fs.existsSync(currentDocumentTypePath)) {
                            return new vscode_1.Location(vscode_1.Uri.file(currentDocumentTypePath), new vscode_1.Position(0, 0));
                        }
                        else if (fs.existsSync(JsTypePath)) {
                            return new vscode_1.Location(vscode_1.Uri.file(JsTypePath), new vscode_1.Position(0, 0));
                        }
                        return null;
                    }
                }
            }
        }
        else {
            return this.importDefinition(document, position);
        }
        return null;
    }
    importDefinition(document, position) {
        const importReg = /(import\s*){([^{}]*)}\s*from\s*(?:('(?:.*)'|"(?:.*)"))/g;
        const content = document.getText();
        const zeroBasedPosition = document.offsetAt(position);
        const wsIndex = common_1.getIndexOfWorkspaceFolder(document.uri);
        if (wsIndex === undefined)
            return null;
        console.time('reg');
        let execResult = null;
        while ((execResult = importReg.exec(content))) {
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
            const reg = /\w+/;
            const wordRange = document.getWordRangeAtPosition(position, reg);
            if (!wordRange) {
                return null;
            }
            const word = document.getText(wordRange);
            let [, , , pathAlias] = execResult;
            pathAlias = pathAlias.slice(1, -1);
            const mostLike = common_1.mostLikeAlias(this._aliasList[wsIndex], pathAlias.split('/')[0]);
            if (mostLike) {
                const pathList = [
                    this._statMap[wsIndex][mostLike]['absolutePath'],
                    ...pathAlias.split('/').slice(1),
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
                        encoding: 'utf8',
                    });
                    // 这里是已经导入的函数或变量
                    const exportIdentifierList = traverseSourceFile_1.traverse(absolutePathWithExtname, file);
                    const retDefinition = exportIdentifierList.filter((token) => token.identifier === word)[0];
                    console.timeEnd('ast');
                    if (retDefinition) {
                        return new vscode_1.Location(vscode_1.Uri.file(absolutePathWithExtname), new vscode_1.Position(retDefinition.position.line, retDefinition.position.character));
                    }
                }
            }
        }
    }
}
exports.PathAliasDefinition = PathAliasDefinition;
//# sourceMappingURL=index.js.map