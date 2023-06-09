"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const Mocha = require("mocha");
async function run() {
    const mocha = new Mocha({
        ui: "tdd",
        color: true,
    });
    const files = await fs_1.promises.opendir(__dirname);
    for await (const dirent of files) {
        if (dirent.isFile() && dirent.name.endsWith(".test.js")) {
            mocha.addFile((0, path_1.resolve)(__dirname, dirent.name));
        }
    }
    return new Promise((resolvePromise, reject) => {
        mocha.run((failures) => {
            if (failures > 0) {
                reject(new Error(`${failures} tests failed.`));
            }
            else {
                resolvePromise();
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map