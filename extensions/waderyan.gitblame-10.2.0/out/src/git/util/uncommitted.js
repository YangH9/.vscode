"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUncomitted = void 0;
function isUncomitted(commit) {
    return /^0{40}$/.test(commit.hash);
}
exports.isUncomitted = isUncomitted;
//# sourceMappingURL=uncommitted.js.map