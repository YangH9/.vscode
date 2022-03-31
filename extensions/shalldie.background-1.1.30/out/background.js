"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.background = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode_1 = __importDefault(require("vscode"));
const vsHelp_1 = require("./vsHelp");
const vscodePath_1 = require("./vscodePath");
const getCss_1 = require("./getCss");
const defBase64_1 = require("./defBase64");
const constants_1 = require("./constants");
/**
 * css文件修改状态类型
 *
 * @enum {number}
 */
var ECSSEditType;
(function (ECSSEditType) {
    /**
     * 未修改的css文件
     */
    ECSSEditType[ECSSEditType["noModified"] = 0] = "noModified";
    /**
     * hack 过的旧版本css文件
     */
    ECSSEditType[ECSSEditType["isOld"] = 1] = "isOld";
    /**
     * hack 过的新版本的css文件
     */
    ECSSEditType[ECSSEditType["isNew"] = 2] = "isNew";
})(ECSSEditType || (ECSSEditType = {}));
/**
 * 插件逻辑类
 *
 * @export
 * @class Background
 */
class Background {
    constructor() {
        //#region private fields 私有字段
        /**
         * 当前用户配置
         *
         * @private
         * @type {vscode.WorkspaceConfiguration}
         * @memberof Background
         */
        this.config = vscode_1.default.workspace.getConfiguration('background');
        //#endregion
    }
    //#endregion
    //#region public fields public字段
    /**
     * 是否已经安装过
     *
     * @readonly
     * @type {boolean}
     * @memberof Background
     */
    get hasInstalled() {
        const content = this.getCssContent() || '';
        return !!~content.indexOf(constants_1.BACKGROUND_VER);
    }
    /**
     * 当前css文件的修改类型
     *
     * @readonly
     * @type {ECSSEditType}
     * @memberof Background
     */
    get fileType() {
        if (!this.hasInstalled) {
            return ECSSEditType.noModified;
        }
        const cssContent = this.getCssContent();
        // hack 过的旧版本，即不包含当前版本
        const ifVerOld = !~cssContent.indexOf(`/*${constants_1.BACKGROUND_VER}.${constants_1.version}*/`);
        if (ifVerOld) {
            return ECSSEditType.isOld;
        }
        // hack 过的新版本
        return ECSSEditType.isNew;
    }
    //#endregion
    //#region private methods 私有方法
    /**
     * 获取 css 文件内容
     *
     * @private
     * @returns {string}
     * @memberof Background
     */
    getCssContent() {
        return fs_1.default.readFileSync(vscodePath_1.vscodePath.cssPath, constants_1.ENCODE);
    }
    /**
     * 设置 css 文件内容
     *
     * @private
     * @param {string} content
     * @memberof Background
     */
    saveCssContent(content) {
        if (content && content.length) {
            fs_1.default.writeFileSync(vscodePath_1.vscodePath.cssPath, content, constants_1.ENCODE);
        }
    }
    /**
     * 初始化
     *
     * @private
     * @memberof Background
     */
    initialize() {
        const firstload = this.checkFirstload(); // 是否初次加载插件
        const fileType = this.fileType; // css 文件目前状态
        // 如果是第一次加载插件，或者旧版本
        if (firstload || fileType == ECSSEditType.isOld || fileType == ECSSEditType.noModified) {
            this.install(true);
        }
    }
    /**
     * 检测是否初次加载，并在初次加载的时候提示用户
     *
     * @private
     * @returns {boolean} 是否初次加载
     * @memberof Background
     */
    checkFirstload() {
        const configPath = path_1.default.join(__dirname, '../assets/config.json');
        const info = JSON.parse(fs_1.default.readFileSync(configPath, constants_1.ENCODE));
        if (info.firstload) {
            // 提示
            vsHelp_1.vsHelp.showInfo('Welcome to use background! U can config it in settings.json.');
            // 标识插件已启动过
            info.firstload = false;
            fs_1.default.writeFileSync(configPath, JSON.stringify(info, null, '    '), constants_1.ENCODE);
            return true;
        }
        return false;
    }
    /**
     * 安装插件，hack css
     *
     * @private
     * @param {boolean} [refresh] 需要强制更新
     * @returns {void}
     * @memberof Background
     */
    install(refresh) {
        const lastConfig = this.config; // 之前的配置
        const config = vscode_1.default.workspace.getConfiguration('background'); // 当前用户配置
        // 1.如果配置文件改变的时候，当前插件配置没有改变，则返回
        if (!refresh && JSON.stringify(lastConfig) == JSON.stringify(config)) {
            // console.log('配置文件未改变.')
            return;
        }
        // 之后操作有两种：1.初次加载  2.配置文件改变
        // 2.两次配置均为，未启动插件
        if (!lastConfig.enabled && !config.enabled) {
            // console.log('两次配置均为，未启动插件');
            return;
        }
        // 3.保存当前配置
        this.config = config; // 更新配置
        // 4.如果关闭插件
        if (!config.enabled) {
            this.uninstall();
            vsHelp_1.vsHelp.showInfoRestart('Background has been uninstalled! Please restart.');
            return;
        }
        // 5.hack 样式
        let arr = defBase64_1.defBase64; // 默认图片
        if (!config.useDefault) {
            // 自定义图片
            arr = config.customImages;
        }
        // 自定义的样式内容
        const content = (0, getCss_1.getCss)(arr, config.style, config.styles, config.useFront, config.loop).replace(/\s*$/, ''); // 去除末尾空白
        // 添加到原有样式(尝试删除旧样式)中
        let cssContent = this.getCssContent();
        cssContent = this.clearCssContent(cssContent);
        cssContent += content;
        this.saveCssContent(cssContent);
        vsHelp_1.vsHelp.showInfoRestart('Background has been changed! Please restart.');
    }
    /**
     * 清理css中的添加项
     *
     * @private
     * @param {string} content
     * @returns {string}
     * @memberof Background
     */
    clearCssContent(content) {
        content = content.replace(/\/\*css-background-start\*\/[\s\S]*?\/\*css-background-end\*\//g, '');
        content = content.replace(/\s*$/, '');
        return content;
    }
    //#endregion
    //#region public methods
    /**
     * 卸载
     *
     * @returns {boolean}
     * @memberof Background
     */
    uninstall() {
        try {
            let content = this.getCssContent();
            content = this.clearCssContent(content);
            this.saveCssContent(content);
            return true;
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    }
    /**
     * 初始化，并开始监听配置文件改变
     *
     * @returns {vscode.Disposable}
     * @memberof Background
     */
    watch() {
        this.initialize();
        return vscode_1.default.workspace.onDidChangeConfiguration(() => this.install());
    }
}
exports.background = new Background();
//# sourceMappingURL=background.js.map