"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarView = void 0;
const vscode_1 = require("vscode");
const uncommitted_1 = require("./git/util/uncommitted");
const get_active_1 = require("./util/get-active");
const property_1 = require("./util/property");
const textdecorator_1 = require("./util/textdecorator");
class StatusBarView {
    constructor() {
        this.decorationType = vscode_1.window.createTextEditorDecorationType({});
        this.statusBar = this.createStatusBarItem();
        vscode_1.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration("gitblame")) {
                this.createStatusBarItem();
            }
        });
    }
    createStatusBarItem() {
        if (this.statusBar) {
            this.statusBar.dispose();
        }
        const statusBar = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, (0, property_1.getProperty)("statusBarPositionPriority"));
        statusBar.show();
        return statusBar;
    }
    createLineDecoration(text, editor) {
        if (!(0, property_1.getProperty)("inlineMessageEnabled")) {
            return;
        }
        const margin = (0, property_1.getProperty)("inlineMessageMargin");
        const decorationPosition = new vscode_1.Position(editor.selection.active.line, Number.MAX_SAFE_INTEGER);
        this.removeLineDecoration();
        // Add new decoration
        editor.setDecorations?.(this.decorationType, [
            {
                renderOptions: {
                    after: {
                        contentText: text,
                        margin: `0 0 0 ${margin}rem`,
                        color: new vscode_1.ThemeColor("editorCodeLens.foreground"),
                    },
                },
                range: new vscode_1.Range(decorationPosition, decorationPosition),
            },
        ]);
    }
    removeLineDecoration() {
        const editor = (0, get_active_1.getActiveTextEditor)();
        editor?.setDecorations?.(this.decorationType, []);
    }
    set(commit, editor) {
        if (!commit) {
            this.clear();
        }
        else if ((0, uncommitted_1.isUncomitted)(commit)) {
            this.text((0, property_1.getProperty)("statusBarMessageNoCommit"), false);
            if (editor) {
                this.createLineDecoration((0, property_1.getProperty)("inlineMessageNoCommit"), editor);
            }
        }
        else {
            this.text((0, textdecorator_1.toStatusBarTextView)(commit), true);
            if (editor) {
                this.createLineDecoration((0, textdecorator_1.toInlineTextView)(commit), editor);
            }
        }
    }
    clear() {
        this.text("", false);
        this.removeLineDecoration();
    }
    activity() {
        this.text("$(sync~spin) Waiting for git blame response", false);
    }
    dispose() {
        this.statusBar?.dispose();
        this.decorationType.dispose();
    }
    command() {
        const action = (0, property_1.getProperty)("statusBarMessageClickAction");
        if (action === "Open tool URL") {
            return "gitblame.online";
        }
        return "gitblame.quickInfo";
    }
    text(text, command) {
        this.statusBar.text = "$(git-commit) " + text.trimEnd();
        this.statusBar.tooltip = `git blame${command ? "" : " - No info about the current line"}`;
        this.statusBar.command = command ? this.command() : undefined;
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=view.js.map