"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = void 0;
const url_1 = require("url");
const isUrl = (check) => {
    let url;
    try {
        url = new url_1.URL(check);
    }
    catch (err) {
        return false;
    }
    if (url.href !== check || (url.protocol !== "http:" && url.protocol !== "https:")) {
        return false;
    }
    return !!(url.hostname && url.pathname);
};
exports.isUrl = isUrl;
//# sourceMappingURL=is-url.js.map