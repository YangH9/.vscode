"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
const vscode_1 = require("vscode");
// getConfiguration has an unfortunate typing that does not
// take any possible default values into consideration.
const getProperty = (name) => vscode_1.workspace.getConfiguration("gitblame").get(name);
exports.getProperty = getProperty;
//# sourceMappingURL=property.js.map