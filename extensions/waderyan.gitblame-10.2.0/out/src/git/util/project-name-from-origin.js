"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectNameFromOrigin = void 0;
const projectNameFromOrigin = (origin) => /([a-zA-Z0-9_~%+.-]*?)(\.git)?$/.exec(origin)?.[1] ?? "";
exports.projectNameFromOrigin = projectNameFromOrigin;
//# sourceMappingURL=project-name-from-origin.js.map