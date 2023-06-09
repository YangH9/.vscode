"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const project_name_from_origin_1 = require("../../src/git/util/project-name-from-origin");
suite("Origin to project name", () => {
    test("https://", () => {
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("https://example.com/user/repo.git"), "repo");
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("https://example.com/user/repo"), "repo");
    });
    test("git@", () => {
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("git@example.com/user/repo.git"), "repo");
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("git@example.com/user/repo"), "repo");
    });
    test("longer than normal path", () => {
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("git@example.com/company/group/user/repo.git"), "repo");
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("git@example.com/company/group/user/repo"), "repo");
    });
    test("non-alphanumeric in path", () => {
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("https://example.com/user/re-po.git"), "re-po");
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("https://example.com/us.er/repo.git"), "repo");
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("https://example.com/user/re.po.git"), "re.po");
        assert.strictEqual((0, project_name_from_origin_1.projectNameFromOrigin)("https://example.com/user/re.po"), "re.po");
    });
});
//# sourceMappingURL=project-name-from-origin.test.js.map