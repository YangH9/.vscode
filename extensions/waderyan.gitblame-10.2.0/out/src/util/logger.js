"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const vscode_1 = require("vscode");
class Logger {
    static getInstance() {
        return Logger.instance ?? (Logger.instance = new Logger());
    }
    constructor() {
        this.out = vscode_1.window.createOutputChannel("Git Blame", {
            log: true,
        });
    }
    static error(error) {
        if (error instanceof Error) {
            Logger.getInstance().out.error(error);
        }
    }
    static info(info) {
        Logger.getInstance().out.info(info);
    }
    dispose() {
        Logger.instance = undefined;
        this.out.dispose();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map