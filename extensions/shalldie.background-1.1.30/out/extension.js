'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = __importDefault(require("vscode"));
const background_1 = require("./background");
const vsHelp_1 = require("./vsHelp");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "background" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode_1.default.commands.registerCommand('extension.background.info', function () {
        vsHelp_1.vsHelp.showInfo('You can config your background in settings.json. Enjoy it!');
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(background_1.background.watch());
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    // vscode.window.showInformationMessage('deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map