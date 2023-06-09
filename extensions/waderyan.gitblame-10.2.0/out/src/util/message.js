"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = exports.infoMessage = void 0;
const vscode_1 = require("vscode");
const infoMessage = (message, item = []) => {
    return Promise.resolve(vscode_1.window.showInformationMessage(message, ...item));
};
exports.infoMessage = infoMessage;
const errorMessage = (message, ...items) => Promise.resolve(vscode_1.window.showErrorMessage(message, ...items));
exports.errorMessage = errorMessage;
//# sourceMappingURL=message.js.map