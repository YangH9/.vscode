"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = void 0;
const typescript_1 = require("typescript");
function traverse(filename, fileContent, needParams = false) {
    const exportKeywordList = [];
    const result = typescript_1.createSourceFile(filename, fileContent, typescript_1.ScriptTarget.ES2015, true);
    _traverse(result, exportKeywordList, result, needParams);
    return exportKeywordList;
}
exports.traverse = traverse;
function _traverse(node, tokenList, source, needParams, depth = 0) {
    getExportKeyword(node, tokenList, source);
    if (depth <= 1) {
        node.forEachChild((n) => {
            _traverse(n, tokenList, source, needParams, depth + 1);
        });
    }
}
function getExportKeyword(node, tokenList, source) {
    try {
        if (node.modifiers && node.modifiers[0].kind === typescript_1.SyntaxKind.ExportKeyword) {
            if (typescript_1.isVariableStatement(node)) {
                node.declarationList.declarations.forEach(declaration => {
                    const exportToken = {
                        identifier: declaration.name.getText(),
                        description: node.getText(),
                        position: typescript_1.getLineAndCharacterOfPosition(source, declaration.pos),
                        kind: 'variable'
                    };
                    // if (
                    //   decleration.initializer &&
                    //   needParams &&
                    //   (isFunctionDeclaration(decleration.initializer) ||
                    //     isArrowFunction(decleration.initializer))
                    // ) {
                    //   exportToken.params = getSignature(decleration.initializer);
                    // }
                    tokenList.push(exportToken);
                });
            }
            else if (typescript_1.isFunctionDeclaration(node) || typescript_1.isArrowFunction(node)) {
                const position = typescript_1.getLineAndCharacterOfPosition(source, node.name.getStart());
                const exportToken = {
                    identifier: node.name.getText(),
                    position,
                    description: node.getText(),
                    kind: 'function'
                };
                tokenList.push(exportToken);
            }
        }
    }
    catch (error) {
    }
}
//# sourceMappingURL=traverseSourceFile.js.map