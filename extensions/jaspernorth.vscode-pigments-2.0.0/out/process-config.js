"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_MARKER_TYPE = "background";
var DEFAULT_DISABLED_EXTS = [];
var DEFAULT_ENABLED_EXTS = [
    "css",
    "sass",
    "scss",
    "less",
    "vue",
    "pcss",
    "styl",
    "stylus",
    "js",
    "jsx",
    "ts",
    "tsx",
    "es6",
    "jsm",
    "mjs",
    "ml",
    "re",
    "coffee",
    "vue",
    "rs",
    "html",
    "htm",
    "jade",
    "pug",
    "svg",
    "glsl",
    "vert",
    "frag"
];
function stringToArray(s) {
    if (typeof s === 'string') {
        return s.split(",").map(function (st) { return st.trim(); }).filter(function (st) { return !!st; });
    }
}
function processConfig(config) {
    return {
        enabledExtensions: stringToArray(config.enabledExtensions) || DEFAULT_ENABLED_EXTS,
        disabledExtensions: stringToArray(config.disabledExtensions) || DEFAULT_DISABLED_EXTS,
        markerType: config.markerType || DEFAULT_MARKER_TYPE
    };
}
exports.default = processConfig;
//# sourceMappingURL=process-config.js.map