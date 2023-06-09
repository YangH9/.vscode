"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const get_tool_url_1 = require("../../src/git/util/get-tool-url");
suite("Get tool URL: gitRemotePath", () => {
    const call = (func, arg) => typeof func === "string" ? func : func(arg);
    test("http://", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("http://example.com/path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("https://", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("https://example.com/path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("ssh://", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("ssh://example.com/path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("git@", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("git@example.com:path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("http:// with port", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("http://example.com:8080/path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("https:// with port", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("https://example.com:8080/path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("ssh:// with port", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("ssh://example.com:8080/path/to/something/");
        assert.strictEqual(call(func), "/path/to/something/");
        assert.strictEqual(call(func, "0"), "path");
        assert.strictEqual(call(func, "1"), "to");
        assert.strictEqual(call(func, "2"), "something");
    });
    test("Empty input", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("");
        assert.strictEqual(call(func), "no-remote-url");
        assert.strictEqual(call(func), "no-remote-url");
    });
    test("Weird input", () => {
        const func = (0, get_tool_url_1.gitRemotePath)("weird input");
        assert.strictEqual(call(func), "no-remote-url");
        assert.strictEqual(call(func), "no-remote-url");
    });
});
//# sourceMappingURL=get-tool-url.test.js.map