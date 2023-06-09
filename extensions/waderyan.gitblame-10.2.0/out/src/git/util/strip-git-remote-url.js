"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripGitRemoteUrl = exports.stripGitSuffix = void 0;
const stripGitSuffix = (rawUrl) => rawUrl
    .replace(/\.git$/i, "");
exports.stripGitSuffix = stripGitSuffix;
const stripGitRemoteUrl = (rawUrl) => 
// Remove .git-suffix
(0, exports.stripGitSuffix)(rawUrl)
    // Remove protocol, username and/or password
    .replace(/^([a-z-]+:\/\/)?([\w%:\\]+?@)?/i, "")
    // Convert hostname:path to hostname/path
    .replace(/:([a-z_.~+%-][a-z0-9_.~+%-]+)\/?/i, "/$1/");
exports.stripGitRemoteUrl = stripGitRemoteUrl;
//# sourceMappingURL=strip-git-remote-url.js.map