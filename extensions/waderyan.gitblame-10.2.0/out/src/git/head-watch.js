"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadWatch = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const gitcommand_1 = require("./util/gitcommand");
class HeadWatch {
    constructor() {
        this.heads = new Map;
        this.filesWithFoundHeads = new Set;
        this.callback = () => undefined;
    }
    onChange(callback) {
        this.callback = callback;
    }
    async addFile(filePath) {
        if (this.filesWithFoundHeads.has(filePath)) {
            return;
        }
        this.filesWithFoundHeads.add(filePath);
        const relativeGitRoot = await (0, gitcommand_1.getGitFolder)(filePath);
        const gitRoot = this.normalizeWindowsDriveLetter((0, path_1.resolve)((0, path_1.dirname)(filePath), relativeGitRoot));
        const watched = this.heads.has(gitRoot);
        if (watched === true || relativeGitRoot === "") {
            return;
        }
        const repositoryRoot = (0, path_1.resolve)(gitRoot, "..");
        this.heads.set(gitRoot, (0, fs_1.watch)((0, path_1.join)(gitRoot, "HEAD"), {
            persistent: false,
        }, () => this.callback({ gitRoot, repositoryRoot })));
    }
    dispose() {
        for (const [, headWatcher] of this.heads) {
            headWatcher.close();
        }
        this.callback = () => undefined;
    }
    normalizeWindowsDriveLetter(path) {
        return path[0].toLowerCase() + path.substr(1);
    }
}
exports.HeadWatch = HeadWatch;
//# sourceMappingURL=head-watch.js.map