"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePosition = exports.NO_FILE_OR_PLACE = exports.getActiveTextEditor = void 0;
const vscode_1 = require("vscode");
const getActiveTextEditor = () => vscode_1.window.activeTextEditor;
exports.getActiveTextEditor = getActiveTextEditor;
exports.NO_FILE_OR_PLACE = "N:-1";
const getFilePosition = ({ document, selection }) => document.uri.scheme !== "file" ? exports.NO_FILE_OR_PLACE : `${document.fileName}:${selection.active.line}`;
exports.getFilePosition = getFilePosition;
//# sourceMappingURL=get-active.js.map