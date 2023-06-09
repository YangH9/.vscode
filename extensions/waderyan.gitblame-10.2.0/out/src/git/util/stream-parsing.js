"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processStderr = exports.processStdout = exports.processChunk = void 0;
const split_1 = require("../../util/split");
const newCommitInfo = (hash) => ({
    author: {
        mail: "",
        name: "",
        timestamp: "",
        date: new Date,
        tz: "",
    },
    committer: {
        mail: "",
        name: "",
        timestamp: "",
        date: new Date,
        tz: "",
    },
    hash: hash,
    summary: "",
});
const newLocationAttatchedCommit = (commitInfo) => ({
    commit: commitInfo,
    filename: "",
});
function* splitChunk(chunk) {
    let lastIndex = 0;
    while (lastIndex < chunk.length) {
        const nextIndex = chunk.indexOf("\n", lastIndex);
        yield (0, split_1.split)(chunk.toString("utf8", lastIndex, nextIndex));
        lastIndex = nextIndex + 1;
    }
}
const fillOwner = (owner, dataPoint, value) => {
    if (dataPoint === "time") {
        owner.timestamp = value;
        owner.date = new Date(parseInt(value, 10) * 1000);
    }
    else if (dataPoint === "tz" || dataPoint === "mail") {
        owner[dataPoint] = value;
    }
    else if (dataPoint === "") {
        owner.name = value;
    }
};
const processAuthorLine = (key, value, commitInfo) => {
    const [author, dataPoint] = (0, split_1.split)(key, "-");
    if (author === "author" || author === "committer") {
        fillOwner(commitInfo[author], dataPoint, value);
    }
};
const isHash = (hash) => /^\w{40}$/.test(hash);
const isCoverageLine = (hash, coverage) => isHash(hash) && /^\d+ \d+ \d+$/.test(coverage);
const processLine = (key, value, commitInfo) => {
    if (key === "summary") {
        commitInfo.summary = value;
    }
    else if (isHash(key)) {
        commitInfo.hash = key;
    }
    else {
        processAuthorLine(key, value, commitInfo);
    }
};
function* processCoverage(coverage) {
    const [source, result, lines] = coverage.split(" ").map(Number);
    for (let i = 0; i < lines; i++) {
        yield {
            source: source + i,
            result: result + i,
        };
    }
}
function* commitFilter(fileAttatched, lines, registry) {
    if (fileAttatched === undefined || lines === undefined) {
        return;
    }
    registry.set(fileAttatched.commit.hash, fileAttatched.commit);
    for (const line of lines) {
        yield {
            ...fileAttatched,
            line,
        };
    }
}
/**
 * Here we process incremental git blame output. Two things are important to understand:
 *   - Commit info blocks always start with hash/line-info and end with filename
 *   - What it contains can change with future git versions
 *
 * @see https://github.com/git/git/blob/9d530dc/Documentation/git-blame.txt#L198
 *
 * @param dataChunk Chunk of `--incremental` git blame output
 * @param commitRegistry Keeping track of previously encountered commit information
 */
function* processChunk(dataChunk, commitRegistry) {
    let commitLocation;
    let coverageGenerator;
    for (const [key, value] of splitChunk(dataChunk)) {
        if (isCoverageLine(key, value)) {
            commitLocation = newLocationAttatchedCommit(commitRegistry.get(key) ?? newCommitInfo(key));
            coverageGenerator = processCoverage(value);
        }
        if (commitLocation) {
            if (key === "filename") {
                commitLocation.filename = value;
                yield* commitFilter(commitLocation, coverageGenerator, commitRegistry);
            }
            else {
                processLine(key, value, commitLocation.commit);
            }
        }
    }
    yield* commitFilter(commitLocation, coverageGenerator, commitRegistry);
}
exports.processChunk = processChunk;
async function* processStdout(data) {
    const commitRegistry = new Map;
    for await (const chunk of data ?? []) {
        yield* processChunk(chunk, commitRegistry);
    }
}
exports.processStdout = processStdout;
async function processStderr(data) {
    for await (const error of data ?? []) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
}
exports.processStderr = processStderr;
//# sourceMappingURL=stream-parsing.js.map