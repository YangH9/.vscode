"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const child_process_1 = require("child_process");
const logger_1 = require("./logger");
const execute = async (command, args, options = {}) => {
    logger_1.Logger.info(`${command} ${args.join(" ")}`);
    let execution;
    try {
        execution = (0, child_process_1.execFile)(command, args, { ...options, encoding: "utf8" });
    }
    catch (err) {
        logger_1.Logger.error(err);
        return "";
    }
    let data = "";
    for await (const chunk of execution?.stdout ?? []) {
        data += chunk;
    }
    return data.trim();
};
exports.execute = execute;
//# sourceMappingURL=execcommand.js.map