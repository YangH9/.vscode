"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COLOR_REGEX = /(( |:|'|"|`)+)((#[A-Fa-f0-9]{2,8})|((rgb|RGB)(a|A)?\(( *(\d|\.)+ *,?){3,4}\))|(hsl|HSL)(a|A)?\(( *(\d|\.)+%? *,*){3,4}\))( |;|,|'|"|`)+/g;
function extractColors(text) {
    var match;
    var matches = [];
    while ((match = COLOR_REGEX.exec(text))) {
        matches.push({
            index: match.index + match[1].length,
            value: match[3]
        });
    }
    return matches;
}
exports.default = extractColors;
//# sourceMappingURL=extract-colors.js.map