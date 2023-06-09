"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originUrlToToolUrl = void 0;
const url_1 = require("url");
const strip_git_remote_url_1 = require("./strip-git-remote-url");
const originUrlToToolUrl = (url) => {
    const httpProtocol = /^(https?):/.exec(url)?.[1];
    let uri;
    try {
        uri = new url_1.URL(`${httpProtocol ?? "https"}://${(0, strip_git_remote_url_1.stripGitRemoteUrl)(url)}`);
    }
    catch (err) {
        return;
    }
    uri.port = httpProtocol ? uri.port : "";
    return uri;
};
exports.originUrlToToolUrl = originUrlToToolUrl;
//# sourceMappingURL=origin-url-to-tool-url.js.map