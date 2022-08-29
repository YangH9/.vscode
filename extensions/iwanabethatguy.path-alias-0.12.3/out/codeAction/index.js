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
exports.PathAliasCodeActionProvider = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
const common_1 = require("../util/common");
class PathAliasCodeActionProvider {
    constructor(statMap) {
        const subscription = [];
        this._disposable = vscode_1.Disposable.from(...subscription);
        this.setStatMap(statMap);
    }
    dispose() {
        this._disposable.dispose();
    }
    setStatMap(statMap) {
        this._statMap = statMap;
    }
    provideCodeActions(document, range, context, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = [];
            if (range.isEmpty) {
                const reg = /\"(.*)\"|\'(.*)\'/;
                const position = range.start;
                const pathRange = document.getWordRangeAtPosition(position, reg);
                const index = common_1.getIndexOfWorkspaceFolder(document.uri);
                if (index === undefined)
                    return [];
                if (pathRange) {
                    const inputPath = document.getText(pathRange);
                    const resPath = inputPath.slice(1, -1);
                    if (isRelativePath(resPath)) {
                        const absolutePath = path_1.resolve(path_1.dirname(document.fileName), resPath);
                        Object.entries(this._statMap[index]).forEach(([alias, stat]) => {
                            const alias2AbsolutePath = stat['absolutePath'];
                            if (absolutePath.startsWith(alias2AbsolutePath)) {
                                const insertPath = absolutePath
                                    .replace(alias2AbsolutePath, alias)
                                    .replace(/\\/g, '/');
                                const action = new vscode_1.CodeAction(insertPath);
                                action.kind = vscode_1.CodeActionKind.Refactor;
                                action.edit = new vscode_1.WorkspaceEdit();
                                action.edit.replace(document.uri, pathRange, `'${insertPath}'`);
                                ret.push(action);
                            }
                        });
                    }
                }
            }
            return ret;
        });
    }
}
exports.PathAliasCodeActionProvider = PathAliasCodeActionProvider;
function isRelativePath(path) {
    return path.startsWith('./') || path.startsWith('../');
}
//# sourceMappingURL=index.js.map