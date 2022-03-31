"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const background_1 = require("./background");
const vsHelp_1 = require("./vsHelp");
if (background_1.background.hasInstalled) {
    background_1.background.uninstall();
    vsHelp_1.vsHelp.showInfoRestart('Background has been uninstalled! Please restart.');
}
//# sourceMappingURL=uninstall.js.map