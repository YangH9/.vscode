"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validEditor = void 0;
const validEditor = (editor) => editor?.document.uri.scheme === "file";
exports.validEditor = validEditor;
//# sourceMappingURL=editorvalidator.js.map