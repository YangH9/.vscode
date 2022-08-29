"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRU = void 0;
class LRU {
    constructor(list, maxLength = 10) {
        this._list = [];
        this._maxLength = maxLength;
        if (list) {
            if (list.length > maxLength) {
                console.warn(`maxLength is ${maxLength}, your list length is ${list.length}`);
                list = list.slice(0, maxLength);
            }
            this._list.push(...list);
        }
    }
    get(name) {
        let index = this._list.findIndex(item => item.id === name);
        if (index !== -1) {
            const item = this._list.splice(index, 1)[0];
            this._list.push(item);
            return item;
        }
        return null;
    }
    push(item) {
        while (this._list.length >= this._maxLength) {
            this._list.shift();
        }
        this._list.push(item);
    }
}
exports.LRU = LRU;
//# sourceMappingURL=LRU.js.map