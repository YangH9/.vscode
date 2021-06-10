'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const settings_1 = require("./settings");
var Window = vscode.window;
var Position = vscode.Position;
var Range = vscode.Range;
var Selection = vscode.Selection;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var settings = new settings_1.Settings();
    if (!settings.Enabled) {
        console.log("The extension \"asciidecorator\" is disabled.");
        return;
    }
    context.subscriptions.push(vscode.commands.registerCommand('asciidecorator.replaceWithDefaultFont', replaceSelectionsWithDefaultFont));
    context.subscriptions.push(vscode.commands.registerCommand('asciidecorator.replaceWithSelectedFont', replaceSelectionWithSelectedFont));
    context.subscriptions.push(vscode.commands.registerCommand('asciidecorator.generateFontTestWithLorem', generateFontTestWithLorem));
    context.subscriptions.push(vscode.commands.registerCommand('asciidecorator.generateFontTestWithSelected', generateFontTestWithSelected));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
function generateFontTestWithSelected() {
    let e = Window.activeTextEditor;
    let d = e.document;
    let sel = e.selections;
    //get first selection only, ignore all others
    let txt = d.getText(new Range(sel[0].start, sel[0].end));
    generateFontTest(txt);
}
function generateFontTestWithLorem() {
    generateFontTest("Lorem ipsum");
}
function generateFontTest(text) {
    var figlet = require('figlet');
    var fonts = [];
    figlet.fontsSync().forEach(function (font) {
        fonts.push(font);
    }, this);
    var fontTest = [];
    fonts.forEach(function (font) {
        fontTest.push("Font: " + font);
        fontTest.push("\n");
        fontTest.push(figlet.textSync(text, {
            font: font,
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }));
        fontTest.push("\n");
        fontTest.push("\n");
    });
    let fontTestWindow = Window.createOutputChannel("Font Test");
    fontTestWindow.append(fontTest.join(""));
    fontTestWindow.show();
}
function replaceSelectionsWithFont(font) {
    var figlet = require('figlet');
    var settings = new settings_1.Settings();
    let e = Window.activeTextEditor;
    let d = e.document;
    let sel = e.selections;
    processSelection(e, d, sel, figlet.textSync, [font]);
}
function replaceSelectionWithSelectedFont() {
    var figlet = require('figlet');
    var items = [];
    figlet.fontsSync().forEach(function (font) {
        items.push({ label: font, description: "Use the " + font + " font" });
    }, this);
    let fontTestWindow = Window.createOutputChannel("Font Test");
    let e = Window.activeTextEditor;
    let d = e.document;
    let sel = e.selections;
    //font test is shown only for the first selection
    let txt = d.getText(new Range(sel[0].start, sel[0].end));
    let options = {
        placeHolder: 'Select a font',
        matchOnDescription: true,
        onDidSelectItem: item => {
            if (!txt) {
                return;
            }
            fontTestWindow.clear();
            fontTestWindow.append(figlet.textSync(txt, {
                font: item.label,
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }));
            fontTestWindow.show(true);
        }
    };
    Window.showQuickPick(items, options).then(function (selection) {
        if (!selection) {
            fontTestWindow.hide();
            fontTestWindow.dispose();
            return;
        }
        replaceSelectionsWithFont(selection.label);
        fontTestWindow.hide();
        fontTestWindow.dispose();
    });
}
function replaceSelectionsWithDefaultFont() {
    var settings = new settings_1.Settings();
    replaceSelectionsWithFont(settings.DefaultFont);
}
// This function takes a callback function for the text formatting 'formatCB', 
// if there are any args pass an array as 'argsCB'
function processSelection(e, d, sel, formatCB, argsCB) {
    var replaceRanges = [];
    e.edit(function (edit) {
        // iterate through the selections
        for (var x = 0; x < sel.length; x++) {
            let prefixStart = new Position(sel[x].start.line, 0);
            let prefixEnd = sel[x].start;
            let prefix = d.getText(new Range(prefixStart, prefixEnd));
            let txt = d.getText(new Range(sel[x].start, sel[x].end));
            if (argsCB.length > 0) {
                // in the case of figlet the params are test to change and font so this is hard coded
                // the idea of the array of parameters is to allow for a more general approach in the future
                txt = formatCB.apply(this, [txt, argsCB[0]]);
            }
            else {
                txt = formatCB(txt);
            }
            // add the prefix before every line of the selection
            txt = txt.split("\n").join("\n" + prefix);
            // replace the txt in the current select and work out any range adjustments
            edit.replace(sel[x], txt);
            let startPos = new Position(sel[x].start.line, sel[x].start.character);
            let endPos = new Position(sel[x].start.line + txt.split(/\r\n|\r|\n/).length - 1, sel[x].start.character + txt.length);
            replaceRanges.push(new Selection(startPos, endPos));
        }
    });
    e.selections = replaceRanges;
}
//# sourceMappingURL=extension.js.map