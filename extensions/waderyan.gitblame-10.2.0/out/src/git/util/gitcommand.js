"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultBranch = exports.getRelativePathOfActiveFile = exports.blameProcess = exports.isGitTracked = exports.getGitFolder = exports.getRemoteUrl = exports.getActiveFileOrigin = exports.getGitCommand = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const vscode_1 = require("vscode");
const editorvalidator_1 = require("../../util/editorvalidator");
const property_1 = require("../../util/property");
const logger_1 = require("../../util/logger");
const execcommand_1 = require("../../util/execcommand");
const get_active_1 = require("../../util/get-active");
const split_1 = require("../../util/split");
const getGitCommand = () => {
    const vscodeGit = vscode_1.extensions.getExtension("vscode.git");
    if (vscodeGit?.exports.enabled) {
        return vscodeGit.exports.getAPI(1).git.path;
    }
    return "git";
};
exports.getGitCommand = getGitCommand;
const runGit = (cwd, ...args) => (0, execcommand_1.execute)((0, exports.getGitCommand)(), args, { cwd: (0, path_1.dirname)(cwd) });
const getActiveFileOrigin = async (remoteName) => {
    const activeEditor = (0, get_active_1.getActiveTextEditor)();
    if (!(0, editorvalidator_1.validEditor)(activeEditor)) {
        return "";
    }
    return runGit(activeEditor.document.fileName, "ls-remote", "--get-url", remoteName);
};
exports.getActiveFileOrigin = getActiveFileOrigin;
const getRemoteUrl = async (fallbackRemote) => {
    const activeEditor = (0, get_active_1.getActiveTextEditor)();
    if (!(0, editorvalidator_1.validEditor)(activeEditor)) {
        return "";
    }
    const { fileName } = activeEditor.document;
    const currentBranch = await runGit(fileName, "symbolic-ref", "-q", "--short", "HEAD");
    const curRemote = await runGit(fileName, "config", `branch.${currentBranch}.remote`);
    return runGit(fileName, "config", `remote.${curRemote || fallbackRemote}.url`);
};
exports.getRemoteUrl = getRemoteUrl;
const getGitFolder = async (fileName) => runGit(fileName, "rev-parse", "--git-dir");
exports.getGitFolder = getGitFolder;
const isGitTracked = async (fileName) => !!await (0, exports.getGitFolder)(fileName);
exports.isGitTracked = isGitTracked;
const blameProcess = (realpathFileName) => {
    const args = ["blame", "-C", "--incremental", "--", realpathFileName];
    if ((0, property_1.getProperty)("ignoreWhitespace")) {
        args.splice(1, 0, "-w");
    }
    logger_1.Logger.info(`${(0, exports.getGitCommand)()} ${args.join(" ")}`);
    return (0, child_process_1.spawn)((0, exports.getGitCommand)(), args, {
        cwd: (0, path_1.dirname)(realpathFileName),
    });
};
exports.blameProcess = blameProcess;
const getRelativePathOfActiveFile = async () => {
    const activeEditor = (0, get_active_1.getActiveTextEditor)();
    if (!(0, editorvalidator_1.validEditor)(activeEditor)) {
        return "";
    }
    const { fileName } = activeEditor.document;
    return runGit(fileName, "ls-files", "--full-name", "--", fileName);
};
exports.getRelativePathOfActiveFile = getRelativePathOfActiveFile;
const getDefaultBranch = async (remote) => {
    const activeEditor = (0, get_active_1.getActiveTextEditor)();
    if (!(0, editorvalidator_1.validEditor)(activeEditor)) {
        return "";
    }
    const rawRemoteDefaultBranch = await runGit(activeEditor.document.fileName, "rev-parse", "--abbrev-ref", `${remote}/HEAD`);
    return (0, split_1.split)(rawRemoteDefaultBranch, "/")[1];
};
exports.getDefaultBranch = getDefaultBranch;
//# sourceMappingURL=gitcommand.js.map