"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAliasConfig = exports.getConfigFromPackageJson = exports.getConfigFromPathaliasrc = void 0;
/**
 * 包含从文件中提取pathalias的相关函数
 */
const path = require("path");
const fs = require("fs");
function getConfigFromPathaliasrc(file, rootPath) {
    let config = {};
    try {
        const configJson = JSON.parse(file);
        Object.keys(configJson).reduce((pre, cur) => {
            pre[cur] = configJson[cur].replace('${cwd}', rootPath);
            return pre;
        }, config);
    }
    catch (error) {
        config = {};
        console.log(error);
    }
    return config;
}
exports.getConfigFromPathaliasrc = getConfigFromPathaliasrc;
function getConfigFromPackageJson(file, rootPath) {
    let config = {};
    try {
        const packageJson = JSON.parse(file);
        const initConfig = packageJson['pathalias'];
        if (initConfig) {
            Object.keys(initConfig).reduce((pre, cur) => {
                pre[cur] = initConfig[cur].replace('${cwd}', rootPath);
                return pre;
            }, config);
        }
    }
    catch (error) {
        config = {};
        console.log(error);
    }
    return config;
}
exports.getConfigFromPackageJson = getConfigFromPackageJson;
function getAliasConfig(rootPath) {
    let config = {};
    const packageJsonPath = path.resolve(rootPath, 'package.json');
    const pathaliasrc = path.resolve(rootPath, '.pathaliasrc');
    let fileContent = '';
    if (fs.existsSync(packageJsonPath)) {
        fileContent = fs.readFileSync(packageJsonPath).toString();
        config = getConfigFromPackageJson(fileContent, rootPath);
    }
    if (fs.existsSync(pathaliasrc)) {
        fileContent = fs.readFileSync(pathaliasrc).toString();
        config = Object.assign(Object.assign({}, config), getConfigFromPathaliasrc(fileContent, rootPath));
    }
    return config;
}
exports.getAliasConfig = getAliasConfig;
//# sourceMappingURL=config.js.map