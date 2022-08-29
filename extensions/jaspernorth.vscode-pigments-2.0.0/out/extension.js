"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var Color_1 = require("./Color");
var process_config_1 = require("./process-config");
var extract_colors_1 = require("./extract-colors");
function getConfigValueIfHas(key, config) {
    if (config.has(key)) {
        return config.get(key);
    }
    return null;
}
function readConfig() {
    var config = vscode.workspace.getConfiguration("pigments");
    return {
        enabledExtensions: getConfigValueIfHas("enabledExtensions", config),
        disabledExtensions: getConfigValueIfHas("disabledExtensions", config),
        markerType: getConfigValueIfHas("markerType", config)
    };
}
function getExtension(filename) {
    return filename.substring(filename.lastIndexOf(".") + 1);
}
// Update the actual decorators
function updateDecorations(decorations, config) {
    var activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor || !activeEditor.document) {
        return;
    }
    // Dispose decorations
    if (decorations) {
        Object.keys(decorations).forEach(function (key) {
            var color = decorations[key];
            color.decorationType.dispose();
            delete decorations[key];
        });
    }
    var extension = getExtension(activeEditor.document.fileName);
    if (config.disabledExtensions.indexOf(extension) > -1)
        return;
    if (config.enabledExtensions.indexOf(extension) > -1) {
        var text = activeEditor.document.getText();
        var colorMatches = extract_colors_1.default(text);
        for (var _i = 0, colorMatches_1 = colorMatches; _i < colorMatches_1.length; _i++) {
            var match = colorMatches_1[_i];
            var startPos = activeEditor.document.positionAt(match.index);
            var endPos = activeEditor.document.positionAt(match.index + match.value.length);
            if (!decorations[match.value]) {
                decorations[match.value] = new Color_1.default(match.value, config.markerType);
            }
            decorations[match.value].addOption(new vscode.Range(startPos, endPos));
        }
        Object.keys(decorations).forEach(function (key) {
            var color = decorations[key];
            activeEditor.setDecorations(color.decorationType, color.decorationOptions);
        });
    }
}
// this method is called when vs code is activated
function activate(context) {
    console.log("vscode pigments is activated");
    var activeEditor = vscode.window.activeTextEditor;
    // Global State
    var config = process_config_1.default(readConfig());
    var decorations = {};
    // Debouncing stuff
    var timeout;
    var updateStaged = false;
    var triggerUpdateDecorations = function (force) {
        if (force === void 0) { force = false; }
        updateStaged = true;
        var runStaged = function () {
            if (updateStaged) {
                updateDecorations(decorations, config);
                updateStaged = false;
            }
        };
        if (!timeout || force) {
            runStaged();
        }
        else {
            clearTimeout(timeout);
        }
        timeout = setTimeout(runStaged, 500);
    };
    // Register events
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        activeEditor = editor;
        if (activeEditor) {
            triggerUpdateDecorations(true);
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(function (event) {
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeConfiguration(function () {
        config = process_config_1.default(readConfig());
    });
    // Trigger initial update
    if (activeEditor) {
        triggerUpdateDecorations();
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map