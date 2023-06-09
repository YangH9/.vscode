"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const execcommand_1 = require("../../src/util/execcommand");
const gitcommand_1 = require("../../src/git/util/gitcommand");
suite("Execute Command", () => {
    test("Simple command", async () => {
        const gitCommand = (0, gitcommand_1.getGitCommand)();
        const commandResult = await (0, execcommand_1.execute)(gitCommand, ["--version"]);
        assert.ok(commandResult);
    });
    test("Unavalible command", async () => {
        const commandResult = await (0, execcommand_1.execute)("not-a-real-command", []);
        assert.strictEqual(commandResult, "");
    });
});
//# sourceMappingURL=execcommand.test.js.map