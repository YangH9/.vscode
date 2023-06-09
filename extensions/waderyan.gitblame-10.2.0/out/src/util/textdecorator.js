"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInlineTextView = exports.toStatusBarTextView = exports.parseTokens = exports.normalizeCommitInfoTokens = void 0;
const property_1 = require("./property");
const ago_1 = require("./ago");
const normalizeCommitInfoTokens = ({ author, committer, hash, summary }) => {
    const now = new Date();
    const toIso = ({ date }) => date.toISOString().slice(0, 10);
    const ago = (0, ago_1.between)(now, author.date);
    const cAgo = (0, ago_1.between)(now, committer.date);
    const shortness = (target, fallbackLength) => (length = "") => {
        return target.substr(0, parseInt(length || fallbackLength, 10));
    };
    return {
        "author.mail": author.mail,
        "author.name": author.name,
        "author.timestamp": author.timestamp,
        "author.tz": author.tz,
        "author.date": toIso(author),
        "committer.mail": committer.mail,
        "committer.name": committer.name,
        "committer.timestamp": committer.timestamp,
        "committer.tz": committer.tz,
        "committer.date": toIso(committer),
        "commit.hash": shortness(hash, "40"),
        "commit.hash_short": shortness(hash, "7"),
        "commit.summary": shortness(summary, "65536"),
        "time.ago": ago,
        "time.c_ago": cAgo,
    };
};
exports.normalizeCommitInfoTokens = normalizeCommitInfoTokens;
const createIndexOrEnd = (target, index, endIndex) => (char) => {
    const indexOfChar = target.indexOf(char, index);
    if (indexOfChar === -1 || indexOfChar > endIndex) {
        return endIndex;
    }
    return indexOfChar;
};
const createSubSectionOrEmpty = (target, endIndex) => (startIndex, lastIndex) => {
    if (lastIndex === startIndex || endIndex === startIndex) {
        return "";
    }
    return target.substring(startIndex + 1, lastIndex);
};
function createTokenReplaceGroup(infoTokens, target, index) {
    const endIndex = target.indexOf("}", index);
    const indexOrEnd = createIndexOrEnd(target, index, endIndex);
    const subSectionOrEmpty = createSubSectionOrEmpty(target, endIndex);
    const parameterIndex = indexOrEnd(",");
    const modifierIndex = indexOrEnd("|");
    const functionName = target.substring(index, Math.min(parameterIndex, modifierIndex));
    return [
        infoTokens[functionName] ?? functionName,
        subSectionOrEmpty(modifierIndex, endIndex),
        subSectionOrEmpty(parameterIndex, modifierIndex),
    ];
}
function* parse(target, infoTokens) {
    let lastSplit = 0;
    let startIndex = 0;
    let mode = 0 /* MODE.OUT */;
    for (let index = 0; index < target.length; index++) {
        if (mode === 0 /* MODE.OUT */ && target[index] === "$") {
            mode = 2 /* MODE.START */;
        }
        else if (mode === 2 /* MODE.START */ && target[index] === "{") {
            mode = 1 /* MODE.IN */;
            startIndex = index - 1;
            yield [target.slice(lastSplit, startIndex)];
            lastSplit = startIndex;
        }
        else if (mode === 2 /* MODE.START */) {
            mode = 0 /* MODE.OUT */;
        }
        else if (mode === 1 /* MODE.IN */) {
            mode = 0 /* MODE.OUT */;
            const endIndex = target.indexOf("}", index);
            if (endIndex === -1) {
                break;
            }
            yield createTokenReplaceGroup(infoTokens, target, index);
            lastSplit = endIndex + 1;
        }
    }
    yield [target.slice(lastSplit)];
}
const modify = (value, modifier = "") => {
    if (modifier === "u") {
        return value.toUpperCase();
    }
    if (modifier === "l") {
        return value.toLowerCase();
    }
    if (modifier) {
        return `${value}|${modifier}`;
    }
    return value;
};
const sanitizeToken = (token) => {
    return token.replace(/\u202e/g, "");
};
const parseTokens = (target, infoTokens) => {
    let out = "";
    for (const [funcStr, mod, param] of parse(target, infoTokens)) {
        if (typeof funcStr === "string") {
            out += modify(funcStr, mod);
        }
        else {
            out += modify(funcStr(param), mod);
        }
    }
    return sanitizeToken(out);
};
exports.parseTokens = parseTokens;
const toStatusBarTextView = (commit) => (0, exports.parseTokens)((0, property_1.getProperty)("statusBarMessageFormat"), (0, exports.normalizeCommitInfoTokens)(commit));
exports.toStatusBarTextView = toStatusBarTextView;
const toInlineTextView = (commit) => (0, exports.parseTokens)((0, property_1.getProperty)("inlineMessageFormat"), (0, exports.normalizeCommitInfoTokens)(commit));
exports.toInlineTextView = toInlineTextView;
//# sourceMappingURL=textdecorator.js.map