"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var ColorLibrary = require("tinycolor2");
function contrastColor(color) {
    var _a = ColorLibrary(color).toRgb(), r = _a.r, g = _a.g, b = _a.b;
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
}
function normaliseColor(color) {
    var _a = ColorLibrary(color).toRgb(), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
var markerRenderers = {
    background: function (props) {
        return {
            backgroundColor: props.color,
            color: props.negativeColor
        };
    },
    outline: function (props) {
        return {
            border: "1px solid " + props.color
        };
    }
};
var Color = /** @class */ (function () {
    function Color(color, markerType) {
        this.decorationOptions = [];
        this.color = normaliseColor(color.toLowerCase());
        this.negativeColor = contrastColor(this.color);
        this.decorationType = vscode_1.window.createTextEditorDecorationType(__assign({}, markerRenderers[markerType]({
            color: this.color,
            negativeColor: this.negativeColor
        }), { rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed }));
    }
    Color.prototype.addOption = function (range) {
        this.decorationOptions.push({
            range: range
        });
    };
    return Color;
}());
exports.default = Color;
//# sourceMappingURL=Color.js.map