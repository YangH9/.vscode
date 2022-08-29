"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionSignatureFromFiles = void 0;
const ts = require("typescript");
function getFunctionSignatureFromFiles(files) {
    // Build a program using the set of root file names in fileNames
    console.time('typechecker');
    const doc = generateDocumentation(files, {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS,
        allowJs: true,
        checkJs: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs
    });
    console.timeEnd('typechecker');
    return doc;
}
exports.getFunctionSignatureFromFiles = getFunctionSignatureFromFiles;
/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames, options) {
    // Build a program using the set of root file names in fileNames
    let program = ts.createProgram(fileNames, options);
    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();
    let output = [];
    let lastSignatureHelpCollectItem = null;
    // Visit every sourceFile in the program
    const sourceFiles = program.getSourceFiles();
    for (const sourceFile of sourceFiles) {
        if (!sourceFile.isDeclarationFile) {
            // Walk the tree to search for classes
            try {
                lastSignatureHelpCollectItem = {
                    id: sourceFile.fileName,
                    functionTokenList: []
                };
                ts.forEachChild(sourceFile, visit);
                output.push(lastSignatureHelpCollectItem);
            }
            catch (err) { }
        }
    }
    // print out the doc
    // fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));
    return output;
    function visit(node) {
        // Only consider exported nodes
        try {
            if (!isNodeExported(node)) {
                return;
            }
            if (ts.isFunctionDeclaration(node) && node.name) {
                // This is a top level class, get its symbol
                let symbol = checker.getSymbolAtLocation(node.name);
                if (symbol) {
                    lastSignatureHelpCollectItem.functionTokenList.push(serializeFunction(symbol));
                }
                // No need to walk any further, class expressions/inner declarations cannot be exported
            }
            else if (ts.isVariableStatement(node)) {
                node.declarationList.declarations.forEach(decl => {
                    if (decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
                        let symbol = getSymbolAtLocation(decl);
                        if (symbol) {
                            lastSignatureHelpCollectItem.functionTokenList.push(serializeFunction(symbol));
                        }
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /** Serialize a symbol into a json object */
    function serializeSymbol(symbol) {
        // const text = symbol.valueDeclaration.getText();
        try {
            const docEntry = {
                name: symbol.getName(),
                documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
                type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
            };
            const declaration = symbol.valueDeclaration;
            if (declaration &&
                ts.isParameter(declaration) &&
                declaration.initializer) {
                docEntry.optional = true;
            }
            return docEntry;
        }
        catch (err) {
            return {};
        }
    }
    /** Serialize a class symbol information */
    function serializeFunction(symbol) {
        let details = serializeSymbol(symbol);
        // Get the construct signatures
        let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        details = Object.assign(Object.assign({}, constructorType.getCallSignatures().map(serializeSignature)[0]), details);
        return details;
    }
    /** Serialize a signature (call or construct) */
    function serializeSignature(signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
        };
    }
    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node) {
        return ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !==
            0 ||
            (node &&
                node.parent !== undefined &&
                node.parent.kind === ts.SyntaxKind.SourceFile));
    }
}
function getSymbolAtLocation(node) {
    return node.symbol;
}
// const ret = generateDocumentation(['/Users/apple/Documents/vscode-extension/path-alias/src/util/test.js'], {
//   target: ts.ScriptTarget.ES5,
//   module: ts.ModuleKind.CommonJS,
//   allowJs: true,
//   checkJs: true,
//   moduleResolution: ts.ModuleResolutionKind.NodeJs
// });
// console.log(ret);
//# sourceMappingURL=getSignatureFromFile.js.map