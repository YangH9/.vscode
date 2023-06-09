"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = void 0;
const vscode_1 = require("vscode");
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365.25 * DAY;
const MONTH = YEAR / 12;
const timeUnits = [
    ["year", YEAR],
    ["month", MONTH],
    ["day", DAY],
    ["hour", HOUR],
    ["minute", MINUTE],
];
const between = (now, compare) => {
    const diffMilliseconds = now.valueOf() - compare.valueOf();
    for (const [currentUnit, scale] of timeUnits) {
        if (diffMilliseconds > scale) {
            return (new Intl.RelativeTimeFormat(vscode_1.env.language))
                .format(-1 * Math.round(diffMilliseconds / scale), currentUnit);
        }
    }
    return "right now";
};
exports.between = between;
//# sourceMappingURL=ago.js.map