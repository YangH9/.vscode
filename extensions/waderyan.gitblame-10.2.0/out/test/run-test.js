"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const test_electron_1 = require("@vscode/test-electron");
async function main() {
    try {
        // Download VS Code, unzip it and run the integration test
        const exitCode = await (0, test_electron_1.runTests)({
            extensionDevelopmentPath: (0, path_1.resolve)(__dirname, ".."),
            extensionTestsPath: (0, path_1.resolve)(__dirname, "suite", "index"),
            launchArgs: [
                "--disable-extensions",
            ],
        });
        if (exitCode !== 0) {
            process.exit(1);
        }
    }
    catch (err) {
        process.exit(1);
    }
    process.exit(0);
}
main();
//# sourceMappingURL=run-test.js.map