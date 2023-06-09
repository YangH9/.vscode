"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const is_url_1 = require("../../src/util/is-url");
suite("Is URL", () => {
    test("Valid", () => {
        assert.strictEqual((0, is_url_1.isUrl)("http://github.com/"), true);
        assert.strictEqual((0, is_url_1.isUrl)("https://microsoft.com/"), true);
        assert.strictEqual((0, is_url_1.isUrl)("https://vscode.co.uk/"), true);
        assert.strictEqual((0, is_url_1.isUrl)("https://example.com/some-path"), true);
        assert.strictEqual((0, is_url_1.isUrl)("https://example.com/some-path.ext"), true);
        assert.strictEqual((0, is_url_1.isUrl)("https://host:8080/some-path.ext"), true);
        assert.strictEqual((0, is_url_1.isUrl)("https://user:pass@host:8080/path.ext"), true);
    });
    test("Invalid", () => {
        assert.strictEqual((0, is_url_1.isUrl)("ftp://github.com/"), false);
        assert.strictEqual((0, is_url_1.isUrl)("http:github.com"), false);
        assert.strictEqual((0, is_url_1.isUrl)("http:github.com/some-path"), false);
        assert.strictEqual((0, is_url_1.isUrl)("%"), false);
        assert.strictEqual((0, is_url_1.isUrl)("/file.ext"), false);
        assert.strictEqual((0, is_url_1.isUrl)("protocol:user@/file.ext"), false);
        assert.strictEqual((0, is_url_1.isUrl)("http://"), false);
        assert.strictEqual((0, is_url_1.isUrl)("This is not an URL"), false);
        assert.strictEqual((0, is_url_1.isUrl)("http://🐆.com/"), false);
    });
});
//# sourceMappingURL=is-url.test.js.map