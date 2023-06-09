"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const sinon_1 = require("sinon");
const origin_url_to_tool_url_1 = require("../../src/git/util/origin-url-to-tool-url");
const prop = require("../../src/util/property");
suite("Web URL formatting", () => {
    test("https://", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/user/repo")?.toString(), "https://example.com/user/repo");
    });
    test("git@", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("git@example.com:user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("git@example.com:user/repo")?.toString(), "https://example.com/user/repo");
    });
    test("username@", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("username@example.com:user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("username@example.com:user/repo")?.toString(), "https://example.com/user/repo");
    });
    test("username:password@", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("username:password@example.com:user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("username@example.com:user/repo")?.toString(), "https://example.com/user/repo");
    });
    test("https:// with port", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com:8080/user/repo.git")?.toString(), "https://example.com:8080/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com:8080/user/repo")?.toString(), "https://example.com:8080/user/repo");
    });
    test("http:// with port", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("http://example.com:8080/user/repo.git")?.toString(), "http://example.com:8080/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("http://example.com:8080/user/repo")?.toString(), "http://example.com:8080/user/repo");
    });
    test("git@ with port", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("git@example.com:8080/user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("git@example.com:8080/user/repo")?.toString(), "https://example.com/user/repo");
    });
    test("git@ with port and password", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("git:pass@example.com:8080/user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("git@example.com:8080/user/repo")?.toString(), "https://example.com/user/repo");
    });
    test("https:// with port, username and password", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://user:pass@example.com:8080/user/repo.git")?.toString(), "https://example.com:8080/user/repo");
    });
    test("https:// with username and password", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://user:pass@example.com/user/repo.git")?.toString(), "https://example.com/user/repo");
    });
    test("https:// plural", () => {
        const propertyStub = (0, sinon_1.stub)(prop, "getProperty");
        propertyStub.withArgs("pluralWebPathSubstrings").returns(["example.com"]);
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/user/repo.git")?.toString(), "https://example.com/user/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/user/repo")?.toString(), "https://example.com/user/repo");
        propertyStub.restore();
    });
    test("ssh:// short host no user", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("ssh://user@host:8080/SomeProject.git")?.toString(), "https://host/SomeProject");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("ssh://user@host:8080/SomeProject")?.toString(), "https://host/SomeProject");
    });
    test("non-alphanumeric in path", () => {
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/us.er/repo.git")?.toString(), "https://example.com/us.er/repo");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/user/re-po.git")?.toString(), "https://example.com/user/re-po");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("https://example.com/user/re%20po.git")?.toString(), "https://example.com/user/re%20po");
        assert.strictEqual((0, origin_url_to_tool_url_1.originUrlToToolUrl)("ssh://user@example.com:us.er/repo.git")?.toString(), "https://example.com/us.er/repo");
    });
});
//# sourceMappingURL=origin-url-to-tool-url.test.js.map