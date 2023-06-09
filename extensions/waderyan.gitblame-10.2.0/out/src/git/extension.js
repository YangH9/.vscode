"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
const vscode_1 = require("vscode");
const editorvalidator_1 = require("../util/editorvalidator");
const textdecorator_1 = require("../util/textdecorator");
const view_1 = require("../view");
const blame_1 = require("./blame");
const property_1 = require("../util/property");
const get_tool_url_1 = require("./util/get-tool-url");
const uncommitted_1 = require("./util/uncommitted");
const message_1 = require("../util/message");
const get_active_1 = require("../util/get-active");
const head_watch_1 = require("./head-watch");
class Extension {
    constructor() {
        this.blame = new blame_1.Blamer;
        this.view = new view_1.StatusBarView;
        this.headWatcher = new head_watch_1.HeadWatch;
        this.disposable = this.setupListeners();
        this.updateView();
    }
    async blameLink() {
        const toolUrl = await (0, get_tool_url_1.getToolUrl)(await this.commit(true));
        if (toolUrl) {
            vscode_1.commands.executeCommand("vscode.open", toolUrl);
        }
        else {
            (0, message_1.errorMessage)("Empty gitblame.commitUrl");
        }
    }
    async showMessage() {
        const lineAware = await this.commit();
        if (!lineAware || (0, uncommitted_1.isUncomitted)(lineAware.commit)) {
            this.view.clear();
            return;
        }
        const message = (0, textdecorator_1.parseTokens)((0, property_1.getProperty)("infoMessageFormat"), (0, textdecorator_1.normalizeCommitInfoTokens)(lineAware.commit));
        const toolUrl = await (0, get_tool_url_1.getToolUrl)(lineAware);
        const action = toolUrl ? [{
                title: "View",
                action() {
                    vscode_1.commands.executeCommand("vscode.open", toolUrl);
                },
            }] : undefined;
        this.view.set(lineAware.commit, (0, get_active_1.getActiveTextEditor)());
        (await (0, message_1.infoMessage)(message, action))?.action();
    }
    async copyHash() {
        const lineAware = await this.commit(true);
        if (lineAware && !(0, uncommitted_1.isUncomitted)(lineAware.commit)) {
            await vscode_1.env.clipboard.writeText(lineAware.commit.hash);
            (0, message_1.infoMessage)("Copied hash");
        }
    }
    async copyToolUrl() {
        const lineAware = await this.commit(true);
        const toolUrl = await (0, get_tool_url_1.getToolUrl)(lineAware);
        if (toolUrl) {
            await vscode_1.env.clipboard.writeText(toolUrl.toString());
            (0, message_1.infoMessage)("Copied tool URL");
        }
        else {
            (0, message_1.errorMessage)("gitblame.commitUrl config empty");
        }
    }
    dispose() {
        this.view.dispose();
        this.disposable.dispose();
        this.blame.dispose();
        this.headWatcher.dispose();
    }
    setupListeners() {
        const changeTextEditorSelection = (textEditor) => {
            const { scheme } = textEditor.document.uri;
            if (scheme === "file" || scheme === "untitled") {
                this.updateView(textEditor);
            }
        };
        this.headWatcher.onChange(({ repositoryRoot }) => {
            this.blame.removeFromRepository(repositoryRoot);
        });
        return vscode_1.Disposable.from(vscode_1.window.onDidChangeActiveTextEditor((textEditor) => {
            if ((0, editorvalidator_1.validEditor)(textEditor)) {
                this.view.activity();
                this.blame.file(textEditor.document.fileName);
                /**
                 * For unknown reasons files without previous or stored
                 * selection locations don't trigger the change selection
                 * event. I have not been able to find a way to detect when
                 * this happens. Running the event handler twice seames to
                 * be a good enough workaround.
                 */
                changeTextEditorSelection(textEditor);
            }
            else {
                this.view.clear();
            }
        }), vscode_1.window.onDidChangeTextEditorSelection(({ textEditor }) => {
            changeTextEditorSelection(textEditor);
        }), vscode_1.workspace.onDidSaveTextDocument(() => {
            this.updateView();
        }), vscode_1.workspace.onDidCloseTextDocument((document) => {
            this.blame.remove(document.fileName);
        }));
    }
    async updateView(textEditor = (0, get_active_1.getActiveTextEditor)(), delay = (0, property_1.getProperty)("delayBlame")) {
        if (!(0, editorvalidator_1.validEditor)(textEditor)) {
            this.view.clear();
            return;
        }
        this.view.activity();
        this.headWatcher.addFile(textEditor.document.fileName);
        const before = (0, get_active_1.getFilePosition)(textEditor);
        const lineAware = await this.blame.getLine(textEditor.document.fileName, textEditor.selection.active.line);
        if (delay > 0) {
            await new Promise((f) => setTimeout(f, delay));
        }
        const after = (0, get_active_1.getFilePosition)(textEditor);
        // Only update if we haven't moved since we started blaming
        // or if we no longer have focus on any file
        if (before === after || after === get_active_1.NO_FILE_OR_PLACE) {
            this.view.set(lineAware?.commit, textEditor);
        }
    }
    async commit(undercover = false) {
        const notBlame = () => (0, message_1.errorMessage)("Unable to blame current line");
        const editor = (0, get_active_1.getActiveTextEditor)();
        if (!(0, editorvalidator_1.validEditor)(editor)) {
            notBlame();
            return;
        }
        if (!undercover) {
            this.view.activity();
        }
        this.headWatcher.addFile(editor.document.fileName);
        const line = await this.blame.getLine(editor.document.fileName, editor.selection.active.line);
        if (!line) {
            notBlame();
        }
        return line;
    }
}
exports.Extension = Extension;
//# sourceMappingURL=extension.js.map