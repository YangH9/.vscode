"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs_1 = require("fs");
const path_1 = require("path");
const stream_parsing_1 = require("../../src/git/util/stream-parsing");
function load(fileName, buffer) {
    return (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "..", "..", "..", "test", "fixture", fileName), {
        encoding: buffer ? null : "utf-8",
    });
}
function datesToString(convert) {
    const converted = [];
    for (const element of convert) {
        converted.push({
            ...element,
            commit: {
                ...element.commit,
                author: {
                    ...element.commit.author,
                    date: element.commit.author.date.toJSON(),
                },
                committer: {
                    ...element.commit.committer,
                    date: element.commit.committer.date.toJSON(),
                },
            },
        });
    }
    return converted;
}
suite("Chunk Processing", () => {
    test("Process normal chunk", () => {
        const chunk = load("git-stream-blame-incremental.chunks", true);
        const result = JSON.parse(load("git-stream-blame-incremental-result.json", false));
        const registry = new Map;
        const chunks = Array.from((0, stream_parsing_1.processChunk)(chunk, registry));
        assert.strictEqual(JSON.stringify(datesToString(chunks)), JSON.stringify(result));
    });
});
suite("Processing Errors", () => {
    test("Git chunk not starting with commit information", () => {
        const chunks = JSON.parse(load("git-stream-blame-incremental-multi-chunk.json", false));
        const result = JSON.parse(load("git-stream-blame-incremental-multi-chunk-result.json", false));
        const registry = new Map;
        const foundChunks = [];
        for (const chunk of chunks) {
            foundChunks.push(...(0, stream_parsing_1.processChunk)(Buffer.from(chunk, "utf-8"), registry));
        }
        assert.strictEqual(JSON.stringify(datesToString(foundChunks)), JSON.stringify(result));
    });
});
//# sourceMappingURL=git-processing.test.js.map