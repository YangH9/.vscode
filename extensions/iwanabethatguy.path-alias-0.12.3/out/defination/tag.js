"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathAliasTagDefinition = void 0;
const vscode_1 = require("vscode");
const common_1 = require("../util/common");
class PathAliasTagDefinition {
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
        console.time('tag-defination');
        const reg = /\<([\w-]+).*?/;
        const range = document.getWordRangeAtPosition(position, reg);
        const sourceCode = document.getText();
        const index = common_1.getIndexOfWorkspaceFolder(document.uri);
        if (index === undefined)
            return null;
        if (range) {
            const importDefaultDeclarationReg = /import\s+(\w+)\s+from\s(\'(?:.*?)\'|\"(?:.*?)\")/g;
            const tag = document
                .getText(range)
                .replace('<', '')
                .trim();
            const normalizedTag = common_1.transformHyphenToPascal(common_1.transformCamelToPascal(tag));
            let regMatch = null;
            let aliasPath = '';
            while ((regMatch = importDefaultDeclarationReg.exec(sourceCode))) {
                const [, localIdentifier, path] = regMatch;
                if (common_1.transformCamelToPascal(localIdentifier) === normalizedTag) {
                    aliasPath = path.slice(1, -1);
                    break;
                }
            }
            if (aliasPath) {
                const mostLike = common_1.mostLikeAlias(this._aliasList[index], aliasPath.split('/')[0]);
                let statInfo = this._statMap[index][mostLike];
                const absolutePath = aliasPath.replace(mostLike, statInfo.absolutePath);
                console.timeEnd('tag-defination');
                const normalizedAbsolutePath = absolutePath + (absolutePath.endsWith('vue') ? '' : '.vue');
                return new vscode_1.Location(vscode_1.Uri.file(normalizedAbsolutePath), new vscode_1.Position(0, 0));
            }
        }
        return null;
    }
}
exports.PathAliasTagDefinition = PathAliasTagDefinition;
//# sourceMappingURL=tag.js.map