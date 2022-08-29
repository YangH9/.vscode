"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWatcher = void 0;
const chikdar = require("chokidar");
const __1 = require("..");
function generateWatcher(path) {
    const watcher = chikdar.watch(path, {
        ignored: ['**/node_modules/**'],
    });
    let ready = false;
    watcher
        .on('ready', function () {
        ready = true;
    })
        .on('add', function (path) {
        if (ready) {
            __1.eventBus.emit('file-change', path);
        }
    })
        .on('unlink', function (path) {
        __1.eventBus.emit('file-change', path);
    });
    return watcher;
}
exports.generateWatcher = generateWatcher;
//# sourceMappingURL=watcher.js.map