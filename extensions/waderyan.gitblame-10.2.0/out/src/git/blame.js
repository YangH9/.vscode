"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blamer = void 0;
const fs_1 = require("fs");
const file_1 = require("./file");
const logger_1 = require("../util/logger");
const gitcommand_1 = require("./util/gitcommand");
class Blamer {
    constructor() {
        this.files = new Map();
        this.fsWatchers = new Map();
    }
    async file(fileName) {
        return this.get(fileName);
    }
    async getLine(fileName, lineNumber) {
        const commitLineNumber = lineNumber + 1;
        const blameInfo = await this.get(fileName);
        return blameInfo?.get(commitLineNumber);
    }
    removeFromRepository(gitRepositoryPath) {
        for (const [fileName] of this.files) {
            if (fileName.startsWith(gitRepositoryPath)) {
                this.remove(fileName);
            }
        }
    }
    async remove(fileName) {
        (await this.files.get(fileName))?.dispose();
        this.fsWatchers.get(fileName)?.close();
        this.files.delete(fileName);
        this.fsWatchers.delete(fileName);
    }
    dispose() {
        for (const [fileName] of this.files) {
            this.remove(fileName);
        }
    }
    async get(fileName) {
        if (!this.files.has(fileName)) {
            const file = this.create(fileName);
            file.then((createdFile) => {
                if (createdFile) {
                    this.fsWatchers.set(fileName, (0, fs_1.watch)(fileName, () => {
                        this.remove(fileName);
                    }));
                }
            });
            this.files.set(fileName, file);
        }
        return (await this.files.get(fileName))?.store;
    }
    async create(fileName) {
        try {
            await fs_1.promises.access(fileName);
            if (await (0, gitcommand_1.isGitTracked)(fileName)) {
                return new file_1.File(fileName);
            }
        }
        catch {
            // NOOP
        }
        logger_1.Logger.info(`Will not blame '${fileName}'. Outside the current workspace.`);
    }
}
exports.Blamer = Blamer;
//# sourceMappingURL=blame.js.map