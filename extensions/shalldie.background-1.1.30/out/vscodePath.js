"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode_1 = __importDefault(require("vscode"));
// 基础目录
const base = path_1.default.dirname(require.main.filename);
// css文件路径
const cssName = parseFloat(vscode_1.default.version) >= 1.38 ? 'workbench.desktop.main.css' : 'workbench.main.css';
const webCssName = 'workbench.web.api.css';
const cssPath = (() => {
    const getCssPath = (cssFileName) => path_1.default.join(base, 'vs', 'workbench', cssFileName);
    const defPath = getCssPath(cssName);
    const webPath = getCssPath(webCssName);
    /**
     * 暂时没想到怎么判断在 web 中使用，比如 code-server。暂时这么处理吧
     * 之后需要加上鉴权处理
     */
    if (!fs_1.default.existsSync(defPath) && fs_1.default.existsSync(webPath)) {
        return webPath;
    }
    return defPath;
})();
// electron 入口文件所在文件夹
const indexDir = path_1.default.join(base, 'vs', 'workbench', 'electron-browser', 'bootstrap');
exports.vscodePath = {
    /**
     * 基础目录
     */
    base,
    /**
     * css文件路径
     */
    cssPath,
    /**
     * electron 入口文件所在文件夹
     */
    indexDir
};
//# sourceMappingURL=vscodePath.js.map