"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const split_1 = require("../../src/util/split");
suite("Split", () => {
    test("Single Space", () => {
        assert.deepStrictEqual((0, split_1.split)("single space"), ["single", "space"]);
    });
    test("Multiple Spaces", () => {
        assert.deepStrictEqual((0, split_1.split)("multiple spaces in this test right here"), ["multiple", "spaces in this test right here"]);
    });
    test("No Spaces", () => {
        assert.deepStrictEqual((0, split_1.split)("oneword"), ["oneword", ""]);
    });
    test("Trim results", () => {
        assert.deepStrictEqual((0, split_1.split)("trim    result   "), ["trim", "result"]);
    });
    test("Single Amperstand", () => {
        assert.deepStrictEqual((0, split_1.split)("single&amperstand", "&"), ["single", "amperstand"]);
    });
    test("Short second parameter", () => {
        assert.deepStrictEqual((0, split_1.split)("bad second argument", ""), ["bad second argument", ""]);
    });
    test("Long second parameter", () => {
        assert.deepStrictEqual((0, split_1.split)("bad second argument long", "long"), ["bad second argument ", "ong"]);
    });
});
//# sourceMappingURL=split.test.js.map