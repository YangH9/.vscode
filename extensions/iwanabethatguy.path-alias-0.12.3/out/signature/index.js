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
exports.PathAliasSignatureHelpProvider = void 0;
const vscode_1 = require("vscode");
const __1 = require("..");
class PathAliasSignatureHelpProvider {
    constructor() {
        this._functionTokenList = [];
        this._importAliasPathList = [];
        const subscriptions = [];
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    dispose() {
        this._disposable.dispose();
    }
    setFunctionTokenList(functionList) {
        this._functionTokenList = functionList;
    }
    provideSignatureHelp(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const theCall = this.walkBackwardsToBeginningOfCall(document, position);
            if (theCall == null) {
                return Promise.resolve(null);
            }
            const callerPos = this.previousTokenPosition(document, theCall.openParen);
            if (!callerPos) {
                return null;
            }
            const callerToken = document.getText(document.getWordRangeAtPosition(callerPos));
            try {
                const signatures = this._functionTokenList.filter(item => item.name === callerToken);
                if (!signatures.length) {
                    const importReg = /(import\s*){([^{}]*)}\s*from\s*(?:('(?:.*)'|"(?:.*)"))/g;
                    const content = document.getText();
                    let execResult = null;
                    while ((execResult = importReg.exec(content))) {
                        let [, , , pathAlias] = execResult;
                        pathAlias = pathAlias.slice(1, -1);
                        if (this._importAliasPathList.indexOf(pathAlias) === -1) {
                            // this.recollectDeppendencies(document);
                            __1.eventBus.emit('recollect', document);
                            break;
                        }
                    }
                    return null;
                }
                const result = new vscode_1.SignatureHelp();
                let si = signatures.map(item => {
                    const parameters = (item.parameters || []).map(parameter => `${parameter.name}${parameter.optional ? '?' : ''}: ${parameter.type}`);
                    const info = {
                        documentation: item.documentation,
                        label: `${item.name} (${parameters.join(', ')}): ${item.returnType}`,
                        parameters: parameters.map(p => new vscode_1.ParameterInformation(p))
                    };
                    return info;
                });
                result.signatures = si;
                result.activeSignature = 0;
                result.activeParameter = Math.min(theCall.commas.length, si[0].parameters.length - 1);
                return result;
            }
            catch (e) {
                return null;
            }
        });
    }
    previousTokenPosition(document, position) {
        while (position.character > 0) {
            const word = document.getWordRangeAtPosition(position);
            if (word) {
                return word.start;
            }
            position = position.translate(0, -1);
        }
        return null;
    }
    /**
     * Goes through the function params' lines and gets the number of commas and the start position of the call.
     */
    walkBackwardsToBeginningOfCall(document, position) {
        let parenBalance = 0;
        let maxLookupLines = 30;
        const commas = [];
        for (let lineNr = position.line; lineNr >= 0 && maxLookupLines >= 0; lineNr--, maxLookupLines--) {
            const line = document.lineAt(lineNr);
            // Stop processing if we're inside a comment
            // if (isPositionInComment(document, position)) {
            //   return null;
            // }
            // if its current line, get the text until the position given, otherwise get the full line.
            const [currentLine, characterPosition] = lineNr === position.line
                ? [line.text.substring(0, position.character), position.character]
                : [line.text, line.text.length - 1];
            for (let char = characterPosition; char >= 0; char--) {
                switch (currentLine[char]) {
                    case '(':
                        parenBalance--;
                        if (parenBalance < 0) {
                            return {
                                openParen: new vscode_1.Position(lineNr, char),
                                commas
                            };
                        }
                        break;
                    case ')':
                        parenBalance++;
                        break;
                    case ',':
                        const commaPos = new vscode_1.Position(lineNr, char);
                        // if (parenBalance === 0 && !isPositionInString(document, commaPos)) {
                        //   commas.push(commaPos);
                        // }
                        if (parenBalance === 0) {
                            commas.push(commaPos);
                        }
                        break;
                }
            }
        }
        return null;
    }
}
exports.PathAliasSignatureHelpProvider = PathAliasSignatureHelpProvider;
//# sourceMappingURL=index.js.map