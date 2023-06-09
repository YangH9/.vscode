"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToolUrl = exports.generateUrlTokens = exports.gitRemotePath = void 0;
const vscode_1 = require("vscode");
const url_1 = require("url");
const is_url_1 = require("../../util/is-url");
const split_1 = require("../../util/split");
const origin_url_to_tool_url_1 = require("./origin-url-to-tool-url");
const property_1 = require("../../util/property");
const gitcommand_1 = require("./gitcommand");
const project_name_from_origin_1 = require("./project-name-from-origin");
const strip_git_remote_url_1 = require("./strip-git-remote-url");
const textdecorator_1 = require("../../util/textdecorator");
const uncommitted_1 = require("./uncommitted");
const message_1 = require("../../util/message");
const getPathIndex = (path, index, splitOn = "/") => {
    const parts = path.split(splitOn).filter(a => !!a);
    return parts[Number(index)] || "invalid-index";
};
const gitOriginHostname = ({ hostname }) => {
    return (index) => {
        if (index === "") {
            return hostname;
        }
        return getPathIndex(hostname, index, ".");
    };
};
const gitRemotePath = (remote) => {
    if (/^[a-z]+?@/.test(remote)) {
        const [, path] = (0, split_1.split)(remote, ":");
        return (index = "") => {
            if (index === "") {
                return "/" + path;
            }
            return getPathIndex(path, index);
        };
    }
    try {
        const { pathname } = new url_1.URL(remote);
        return (index = "") => {
            if (index === "") {
                return pathname;
            }
            return getPathIndex(pathname, index);
        };
    }
    catch {
        return () => "no-remote-url";
    }
};
exports.gitRemotePath = gitRemotePath;
const isToolUrlPlural = (origin) => ((0, property_1.getProperty)("pluralWebPathSubstrings") ?? []).some((substring) => origin.includes(substring));
const generateUrlTokens = async (lineAware) => {
    const remoteName = (0, property_1.getProperty)("remoteName");
    const origin = await (0, gitcommand_1.getActiveFileOrigin)(remoteName);
    if (origin === remoteName) {
        return;
    }
    const remoteUrl = (0, strip_git_remote_url_1.stripGitRemoteUrl)(await (0, gitcommand_1.getRemoteUrl)(remoteName));
    const tool = (0, origin_url_to_tool_url_1.originUrlToToolUrl)(remoteUrl);
    const filePath = await (0, gitcommand_1.getRelativePathOfActiveFile)();
    const defaultbranch = await (0, gitcommand_1.getDefaultBranch)(remoteName);
    return {
        "hash": lineAware.commit.hash,
        "tool.protocol": tool?.protocol ?? "https:",
        "tool.commitpath": `/commit${isToolUrlPlural(remoteUrl) ? "s" : ""}/`,
        "project.name": (0, project_name_from_origin_1.projectNameFromOrigin)(origin),
        "project.remote": remoteUrl,
        "project.defaultbranch": defaultbranch,
        "gitorigin.hostname": tool ? gitOriginHostname(tool) : "no-origin-url",
        "gitorigin.path": (0, exports.gitRemotePath)((0, strip_git_remote_url_1.stripGitSuffix)(origin)),
        "gitorigin.port": tool?.port ? `:${tool.port}` : "",
        "file.path": filePath,
        "file.path.result": filePath,
        "file.path.source": lineAware.filename,
        "file.line": lineAware.line.result.toString(),
        "file.line.result": lineAware.line.result.toString(),
        "file.line.source": lineAware.line.source.toString(),
    };
};
exports.generateUrlTokens = generateUrlTokens;
const getToolUrl = async (commit) => {
    if (!commit || (0, uncommitted_1.isUncomitted)(commit.commit)) {
        return;
    }
    const tokens = await (0, exports.generateUrlTokens)(commit);
    if (tokens === undefined) {
        return;
    }
    const parsedUrl = (0, textdecorator_1.parseTokens)((0, property_1.getProperty)("commitUrl"), tokens);
    if ((0, is_url_1.isUrl)(parsedUrl)) {
        return vscode_1.Uri.parse(parsedUrl, true);
    }
    else {
        (0, message_1.errorMessage)(`Malformed gitblame.commitUrl: '${parsedUrl}' from '${(0, property_1.getProperty)("commitUrl")}'`);
    }
};
exports.getToolUrl = getToolUrl;
//# sourceMappingURL=get-tool-url.js.map