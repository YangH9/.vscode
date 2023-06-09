"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const sinon_1 = require("sinon");
const ago_1 = require("../../src/util/ago");
const textdecorator_1 = require("../../src/util/textdecorator");
suite("Date Calculations", () => {
    test("Time ago in years", () => {
        assert.strictEqual((0, ago_1.between)(new Date(2015, 2), new Date(2014, 1)), "1 year ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1), new Date(2005, 1)), "10 years ago");
    });
    test("Time ago in months", () => {
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1), new Date(2015, 0)), "1 month ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 11, 10), new Date(2015, 0)), "11 months ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1), new Date(2014, 1)), "12 months ago");
    });
    test("Time ago in days", () => {
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 2, 8), new Date(2015, 1, 1, 0)), "1 day ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 31), new Date(2015, 1, 1)), "30 days ago");
    });
    test("Time ago in hours", () => {
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 1, 1, 5, 0), new Date(2015, 1, 1, 0, 0, 0)), "1 hour ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 1, 23, 29, 0), new Date(2015, 1, 1, 0, 0, 0)), "23 hours ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 2), new Date(2015, 1, 1)), "24 hours ago");
    });
    test("Time ago in minutes", () => {
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 1, 1, 5, 0), new Date(2015, 1, 1, 1, 0, 0)), "5 minutes ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 1, 1, 59, 29), new Date(2015, 1, 1, 1, 0, 0)), "59 minutes ago");
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 1, 1, 0, 0), new Date(2015, 1, 1, 0, 0, 0)), "60 minutes ago");
    });
    test("Right now", () => {
        assert.strictEqual((0, ago_1.between)(new Date(2015, 1, 1, 1, 0, 1), new Date(2015, 1, 1, 1, 0, 0)), "right now");
    });
});
suite("Token Parser", () => {
    const normalizedInfo = {
        "example.token": () => "example-token",
        "value": (value) => {
            if (value) {
                return `${value}-example`;
            }
            else {
                return "-example";
            }
        },
        "mixed.token": () => "mIxeD-ToKeN",
    };
    test("No token", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("No token", normalizedInfo), "No token");
    });
    test("Invalid token", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Invalid ${token}", normalizedInfo), "Invalid token");
    });
    test("Simple replace", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Simple ${example.token}", normalizedInfo), "Simple example-token");
    });
    test("Simple replace at the start of string", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("${example.token} simple", normalizedInfo), "example-token simple");
    });
    test("Simple replace only token", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("${example.token}", normalizedInfo), "example-token");
    });
    test("Value replace", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${value,some-value}", normalizedInfo), "Value some-value-example");
    });
    test("Function without parameter", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${value}", normalizedInfo), "Value -example");
    });
    test("Modifier replace", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${mixed.token|u}", normalizedInfo), "Value MIXED-TOKEN");
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${mixed.token|l}", normalizedInfo), "Value mixed-token");
    });
    test("Modifier replace with value", () => {
        test("Modifier replace", () => {
            assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${value,mIxEd-ToKeN|u}", normalizedInfo), "Value MIXED-TOKEN-EXAMPLE");
            assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${value,mIxEd-ToKeN|l}", normalizedInfo), "Value mixed-token-example");
        });
    });
    test("Invalid modifier", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${example.token|invalidModifier}", normalizedInfo), "Value example-token|invalidModifier");
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${example.token|invalidModifier}", normalizedInfo), "Value example-token|invalidModifier");
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${example.token|q}", normalizedInfo), "Value example-token|q");
    });
    test("Modifier without token", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Value ${|mod}", normalizedInfo), "Value |mod");
    });
    test("Token in the middle of string", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Simple ${example.token} in a longer text", normalizedInfo), "Simple example-token in a longer text");
    });
    test("Multiple tokens", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("Multiple ${example.token} in a ${length,longer} text", normalizedInfo), "Multiple example-token in a length text");
    });
    test("Dangling token", () => {
        assert.strictEqual((0, textdecorator_1.parseTokens)("This token ${is.not.closed", normalizedInfo), "This token ${is.not.closed");
        assert.strictEqual((0, textdecorator_1.parseTokens)("This token ${is.not.closed with spaces", normalizedInfo), "This token ${is.not.closed with spaces");
        assert.strictEqual((0, textdecorator_1.parseTokens)("This token ${is.not.closed,with_params", normalizedInfo), "This token ${is.not.closed,with_params");
        assert.strictEqual((0, textdecorator_1.parseTokens)("This token ${is.not.closed|with_modifier", normalizedInfo), "This token ${is.not.closed|with_modifier");
        assert.strictEqual((0, textdecorator_1.parseTokens)("This token ${is.not.closed,with_params|and_modifier", normalizedInfo), "This token ${is.not.closed,with_params|and_modifier");
    });
});
suite("Text Decorator with CommitInfoToken", () => {
    let faketimer;
    let normalizedCommitInfoTokens;
    suiteSetup(() => {
        faketimer = (0, sinon_1.useFakeTimers)({
            now: 1621014626000,
            toFake: ["Date"],
            shouldAdvanceTime: false,
        });
        normalizedCommitInfoTokens = (0, textdecorator_1.normalizeCommitInfoTokens)(exampleCommit);
    });
    suiteTeardown(() => {
        faketimer?.restore();
    });
    const exampleCommit = {
        "author": {
            "mail": "<vdavydov.dev@gmail.com>",
            "name": "Vladimir Davydov",
            "timestamp": "1423781950",
            "date": new Date(1423781950000),
            "tz": "-0800",
        },
        "committer": {
            "mail": "<torvalds@linux-foundation.org>",
            "name": "Linus Torvalds",
            "timestamp": "1423796049",
            "date": new Date(1423796049000),
            "tz": "-0800",
        },
        "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
        "summary": "list_lru: introduce per-memcg lists",
    };
    const check = (token, expect) => {
        test(`Parse "\${${token}}"`, () => assert.strictEqual((0, textdecorator_1.parseTokens)(`\${${token}}`, normalizedCommitInfoTokens ?? {}), expect));
    };
    check("author.mail", "<vdavydov.dev@gmail.com>");
    check("author.name", "Vladimir Davydov");
    check("author.name|u", "VLADIMIR DAVYDOV");
    check("author.name|l", "vladimir davydov");
    check("author.tz", "-0800");
    check("author.date", "2015-02-12");
    check("committer.mail", "<torvalds@linux-foundation.org>");
    check("committer.name", "Linus Torvalds");
    check("committer.tz", "-0800");
    check("committer.date", "2015-02-13");
    check("commit.summary", "list_lru: introduce per-memcg lists");
    check("commit.hash", "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce");
    check("commit.hash_short", "60d3fd3");
    check("time.ago", "6 years ago");
    check("time.c_ago", "6 years ago");
    check("commit.summary,0", "");
    check("commit.summary,5", "list_");
    check("commit.summary,5|u", "LIST_");
    check("commit.hash_short,0", "");
    check("commit.hash_short,2", "60");
    check("commit.hash_short,39", "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65c");
    check("commit.hash_short,100|u", "60D3FD32A7A9DA4C8C93A9F89CFDA22A0B4C65CE");
});
suite("issue #119 regressions", () => {
    let faketimer;
    suiteSetup(() => {
        faketimer = (0, sinon_1.useFakeTimers)({
            now: 1621014626000,
            toFake: ["Date"],
            shouldAdvanceTime: false,
        });
    });
    suiteTeardown(() => {
        faketimer?.restore();
    });
    test("commit.summary before commit.hash_short", () => {
        const exampleCommit = {
            "author": {
                "mail": "<vdavydov.dev@gmail.com>",
                "name": "Vladimir Davydov",
                "timestamp": "1423781950",
                "date": new Date(1423781950000),
                "tz": "-0800",
            },
            "committer": {
                "mail": "<torvalds@linux-foundation.org>",
                "name": "Linus Torvalds",
                "timestamp": "1423796049",
                "date": new Date(1423796049000),
                "tz": "-0800",
            },
            "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
            "summary": "list_lru: introduce per-memcg lists",
        };
        const normalizedCommitInfoTokens = (0, textdecorator_1.normalizeCommitInfoTokens)(exampleCommit);
        assert.strictEqual((0, textdecorator_1.parseTokens)("${commit.summary} ${commit.hash_short}", normalizedCommitInfoTokens), "list_lru: introduce per-memcg lists 60d3fd3");
    });
    test("commit.summary before shortened commit.hash_short", () => {
        const exampleCommit = {
            "author": {
                "mail": "<vdavydov.dev@gmail.com>",
                "name": "Vladimir Davydov",
                "timestamp": "1423781950",
                "date": new Date(1423781950000),
                "tz": "-0800",
            },
            "committer": {
                "mail": "<torvalds@linux-foundation.org>",
                "name": "Linus Torvalds",
                "timestamp": "1423796049",
                "date": new Date(1423796049000),
                "tz": "-0800",
            },
            "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
            "summary": "list_lru: introduce per-memcg lists",
        };
        const normalizedCommitInfoTokens = (0, textdecorator_1.normalizeCommitInfoTokens)(exampleCommit);
        assert.strictEqual((0, textdecorator_1.parseTokens)("${commit.summary} ${commit.hash_short,7}", normalizedCommitInfoTokens), "list_lru: introduce per-memcg lists 60d3fd3");
    });
    test("commit.summary before shortened commit.hash", () => {
        const exampleCommit = {
            "author": {
                "mail": "<vdavydov.dev@gmail.com>",
                "name": "Vladimir Davydov",
                "timestamp": "1423781950",
                "date": new Date(1423781950000),
                "tz": "-0800",
            },
            "committer": {
                "mail": "<torvalds@linux-foundation.org>",
                "name": "Linus Torvalds",
                "timestamp": "1423796049",
                "date": new Date(1423796049000),
                "tz": "-0800",
            },
            "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
            "summary": "list_lru: introduce per-memcg lists",
        };
        const normalizedCommitInfoTokens = (0, textdecorator_1.normalizeCommitInfoTokens)(exampleCommit);
        assert.strictEqual((0, textdecorator_1.parseTokens)("${commit.summary} ${commit.hash,7}", normalizedCommitInfoTokens), "list_lru: introduce per-memcg lists 60d3fd3");
    });
    test("commit.summary before shortened commit.summary", () => {
        const exampleCommit = {
            "author": {
                "mail": "<vdavydov.dev@gmail.com>",
                "name": "Vladimir Davydov",
                "timestamp": "1423781950",
                "date": new Date(1423781950000),
                "tz": "-0800",
            },
            "committer": {
                "mail": "<torvalds@linux-foundation.org>",
                "name": "Linus Torvalds",
                "timestamp": "1423796049",
                "date": new Date(1423796049000),
                "tz": "-0800",
            },
            "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
            "summary": "list_lru: introduce per-memcg lists",
        };
        const normalizedCommitInfoTokens = (0, textdecorator_1.normalizeCommitInfoTokens)(exampleCommit);
        assert.strictEqual((0, textdecorator_1.parseTokens)("${commit.summary} ${commit.summary,7}", normalizedCommitInfoTokens), "list_lru: introduce per-memcg lists list_lr");
    });
});
suite("Text Sanitizing", () => {
    test("removes right-to-left override characters from text", () => {
        const exampleCommit = {
            "author": {
                "mail": "<vdavydov.dev@gmail.com>",
                "name": "Vladimir Davydov\u202e",
                "timestamp": "1423781950",
                "date": new Date(1423781950000),
                "tz": "-0800",
            },
            "committer": {
                "mail": "<torvalds@linux-foundation.org>",
                "name": "Linus Torvalds",
                "timestamp": "1423796049",
                "date": new Date(1423796049000),
                "tz": "-0800",
            },
            "hash": "60d3fd32a7a9da4c8c93a9f89cfda22a0b4c65ce",
            "summary": "list_lru: \u202eintroduce per-memcg lists",
        };
        const normalizedCommitInfoTokens = (0, textdecorator_1.normalizeCommitInfoTokens)(exampleCommit);
        assert.strictEqual((0, textdecorator_1.parseTokens)("Blame ${author.name} (${commit.summary})", normalizedCommitInfoTokens), "Blame Vladimir Davydov (list_lru: introduce per-memcg lists)");
    });
});
//# sourceMappingURL=textdecorator.test.js.map