"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vsHelp = void 0;
const vscode_1 = __importDefault(require("vscode"));
exports.vsHelp = {
    /**
     * 展示信息提示框
     *
     * @param {string} content 提示内容
     * @returns {Thenable<string>}
     */
    showInfo(content) {
        return vscode_1.default.window.showInformationMessage(content);
    },
    /**
     * 提示信息并重启
     *
     * @param {string} content 提示内容
     * @returns {Thenable<void>}
     */
    showInfoRestart(content) {
        return vscode_1.default.window.showInformationMessage(content, { title: 'Restart vscode' }).then(function (item) {
            if (!item)
                return;
            vscode_1.default.commands.executeCommand('workbench.action.reloadWindow');
        });
    }
};
//# sourceMappingURL=vsHelp.js.map