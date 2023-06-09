"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const stream_parsing_1 = require("./util/stream-parsing");
const logger_1 = require("../util/logger");
const gitcommand_1 = require("./util/gitcommand");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class File {
    constructor(fileName) {
        this.killed = false;
        this.store = this.blame(fileName);
    }
    dispose() {
        this.process?.kill();
        this.killed = true;
    }
    async *run(realFileName) {
        this.process = (0, gitcommand_1.blameProcess)(realFileName);
        yield* (0, stream_parsing_1.processStdout)(this.process?.stdout);
        await (0, stream_parsing_1.processStderr)(this.process?.stderr);
    }
    async blame(fileName) {
        const blameInfo = new Map;
        const realpathFileName = await (0, promises_1.realpath)(fileName);
        try {
            for await (const lineAttatchedCommit of this.run(realpathFileName)) {
                blameInfo.set(lineAttatchedCommit.line.result, lineAttatchedCommit);
            }
        }
        catch (err) {
            logger_1.Logger.error(err);
            this.dispose();
        }
        // Don't return partial git blame info when terminating a blame
        if (!this.killed) {
            if ((0, path_1.relative)(fileName, realpathFileName)) {
                logger_1.Logger.info(`Blamed "${realpathFileName}" (resolved via symlink from "${fileName}")`);
            }
            else {
                logger_1.Logger.info(`Blamed "${realpathFileName}"`);
            }
            return blameInfo;
        }
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map