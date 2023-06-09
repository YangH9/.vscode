"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const split = (target, char = " ") => {
    const index = target.indexOf(char[0]);
    if (index === -1) {
        return [target, ""];
    }
    return [target.substr(0, index), target.substr(index + 1).trim()];
};
exports.split = split;
//# sourceMappingURL=split.js.map