/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4651:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DebugSession = exports.ErrorDestination = exports.MemoryEvent = exports.InvalidatedEvent = exports.ProgressEndEvent = exports.ProgressUpdateEvent = exports.ProgressStartEvent = exports.CapabilitiesEvent = exports.LoadedSourceEvent = exports.ModuleEvent = exports.BreakpointEvent = exports.ThreadEvent = exports.OutputEvent = exports.ExitedEvent = exports.TerminatedEvent = exports.InitializedEvent = exports.ContinuedEvent = exports.StoppedEvent = exports.CompletionItem = exports.Module = exports.Breakpoint = exports.Variable = exports.Thread = exports.StackFrame = exports.Scope = exports.Source = void 0;
const protocol_1 = __webpack_require__(1839);
const messages_1 = __webpack_require__(601);
const runDebugAdapter_1 = __webpack_require__(8153);
const url_1 = __webpack_require__(7310);
class Source {
    constructor(name, path, id = 0, origin, data) {
        this.name = name;
        this.path = path;
        this.sourceReference = id;
        if (origin) {
            this.origin = origin;
        }
        if (data) {
            this.adapterData = data;
        }
    }
}
exports.Source = Source;
class Scope {
    constructor(name, reference, expensive = false) {
        this.name = name;
        this.variablesReference = reference;
        this.expensive = expensive;
    }
}
exports.Scope = Scope;
class StackFrame {
    constructor(i, nm, src, ln = 0, col = 0) {
        this.id = i;
        this.source = src;
        this.line = ln;
        this.column = col;
        this.name = nm;
    }
}
exports.StackFrame = StackFrame;
class Thread {
    constructor(id, name) {
        this.id = id;
        if (name) {
            this.name = name;
        }
        else {
            this.name = 'Thread #' + id;
        }
    }
}
exports.Thread = Thread;
class Variable {
    constructor(name, value, ref = 0, indexedVariables, namedVariables) {
        this.name = name;
        this.value = value;
        this.variablesReference = ref;
        if (typeof namedVariables === 'number') {
            this.namedVariables = namedVariables;
        }
        if (typeof indexedVariables === 'number') {
            this.indexedVariables = indexedVariables;
        }
    }
}
exports.Variable = Variable;
class Breakpoint {
    constructor(verified, line, column, source) {
        this.verified = verified;
        const e = this;
        if (typeof line === 'number') {
            e.line = line;
        }
        if (typeof column === 'number') {
            e.column = column;
        }
        if (source) {
            e.source = source;
        }
    }
    setId(id) {
        this.id = id;
    }
}
exports.Breakpoint = Breakpoint;
class Module {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.Module = Module;
class CompletionItem {
    constructor(label, start, length = 0) {
        this.label = label;
        this.start = start;
        this.length = length;
    }
}
exports.CompletionItem = CompletionItem;
class StoppedEvent extends messages_1.Event {
    constructor(reason, threadId, exceptionText) {
        super('stopped');
        this.body = {
            reason: reason
        };
        if (typeof threadId === 'number') {
            this.body.threadId = threadId;
        }
        if (typeof exceptionText === 'string') {
            this.body.text = exceptionText;
        }
    }
}
exports.StoppedEvent = StoppedEvent;
class ContinuedEvent extends messages_1.Event {
    constructor(threadId, allThreadsContinued) {
        super('continued');
        this.body = {
            threadId: threadId
        };
        if (typeof allThreadsContinued === 'boolean') {
            this.body.allThreadsContinued = allThreadsContinued;
        }
    }
}
exports.ContinuedEvent = ContinuedEvent;
class InitializedEvent extends messages_1.Event {
    constructor() {
        super('initialized');
    }
}
exports.InitializedEvent = InitializedEvent;
class TerminatedEvent extends messages_1.Event {
    constructor(restart) {
        super('terminated');
        if (typeof restart === 'boolean' || restart) {
            const e = this;
            e.body = {
                restart: restart
            };
        }
    }
}
exports.TerminatedEvent = TerminatedEvent;
class ExitedEvent extends messages_1.Event {
    constructor(exitCode) {
        super('exited');
        this.body = {
            exitCode: exitCode
        };
    }
}
exports.ExitedEvent = ExitedEvent;
class OutputEvent extends messages_1.Event {
    constructor(output, category = 'console', data) {
        super('output');
        this.body = {
            category: category,
            output: output
        };
        if (data !== undefined) {
            this.body.data = data;
        }
    }
}
exports.OutputEvent = OutputEvent;
class ThreadEvent extends messages_1.Event {
    constructor(reason, threadId) {
        super('thread');
        this.body = {
            reason: reason,
            threadId: threadId
        };
    }
}
exports.ThreadEvent = ThreadEvent;
class BreakpointEvent extends messages_1.Event {
    constructor(reason, breakpoint) {
        super('breakpoint');
        this.body = {
            reason: reason,
            breakpoint: breakpoint
        };
    }
}
exports.BreakpointEvent = BreakpointEvent;
class ModuleEvent extends messages_1.Event {
    constructor(reason, module) {
        super('module');
        this.body = {
            reason: reason,
            module: module
        };
    }
}
exports.ModuleEvent = ModuleEvent;
class LoadedSourceEvent extends messages_1.Event {
    constructor(reason, source) {
        super('loadedSource');
        this.body = {
            reason: reason,
            source: source
        };
    }
}
exports.LoadedSourceEvent = LoadedSourceEvent;
class CapabilitiesEvent extends messages_1.Event {
    constructor(capabilities) {
        super('capabilities');
        this.body = {
            capabilities: capabilities
        };
    }
}
exports.CapabilitiesEvent = CapabilitiesEvent;
class ProgressStartEvent extends messages_1.Event {
    constructor(progressId, title, message) {
        super('progressStart');
        this.body = {
            progressId: progressId,
            title: title
        };
        if (typeof message === 'string') {
            this.body.message = message;
        }
    }
}
exports.ProgressStartEvent = ProgressStartEvent;
class ProgressUpdateEvent extends messages_1.Event {
    constructor(progressId, message) {
        super('progressUpdate');
        this.body = {
            progressId: progressId
        };
        if (typeof message === 'string') {
            this.body.message = message;
        }
    }
}
exports.ProgressUpdateEvent = ProgressUpdateEvent;
class ProgressEndEvent extends messages_1.Event {
    constructor(progressId, message) {
        super('progressEnd');
        this.body = {
            progressId: progressId
        };
        if (typeof message === 'string') {
            this.body.message = message;
        }
    }
}
exports.ProgressEndEvent = ProgressEndEvent;
class InvalidatedEvent extends messages_1.Event {
    constructor(areas, threadId, stackFrameId) {
        super('invalidated');
        this.body = {};
        if (areas) {
            this.body.areas = areas;
        }
        if (threadId) {
            this.body.threadId = threadId;
        }
        if (stackFrameId) {
            this.body.stackFrameId = stackFrameId;
        }
    }
}
exports.InvalidatedEvent = InvalidatedEvent;
class MemoryEvent extends messages_1.Event {
    constructor(memoryReference, offset, count) {
        super('memory');
        this.body = { memoryReference, offset, count };
    }
}
exports.MemoryEvent = MemoryEvent;
var ErrorDestination;
(function (ErrorDestination) {
    ErrorDestination[ErrorDestination["User"] = 1] = "User";
    ErrorDestination[ErrorDestination["Telemetry"] = 2] = "Telemetry";
})(ErrorDestination = exports.ErrorDestination || (exports.ErrorDestination = {}));
;
class DebugSession extends protocol_1.ProtocolServer {
    constructor(obsolete_debuggerLinesAndColumnsStartAt1, obsolete_isServer) {
        super();
        const linesAndColumnsStartAt1 = typeof obsolete_debuggerLinesAndColumnsStartAt1 === 'boolean' ? obsolete_debuggerLinesAndColumnsStartAt1 : false;
        this._debuggerLinesStartAt1 = linesAndColumnsStartAt1;
        this._debuggerColumnsStartAt1 = linesAndColumnsStartAt1;
        this._debuggerPathsAreURIs = false;
        this._clientLinesStartAt1 = true;
        this._clientColumnsStartAt1 = true;
        this._clientPathsAreURIs = false;
        this._isServer = typeof obsolete_isServer === 'boolean' ? obsolete_isServer : false;
        this.on('close', () => {
            this.shutdown();
        });
        this.on('error', (error) => {
            this.shutdown();
        });
    }
    setDebuggerPathFormat(format) {
        this._debuggerPathsAreURIs = format !== 'path';
    }
    setDebuggerLinesStartAt1(enable) {
        this._debuggerLinesStartAt1 = enable;
    }
    setDebuggerColumnsStartAt1(enable) {
        this._debuggerColumnsStartAt1 = enable;
    }
    setRunAsServer(enable) {
        this._isServer = enable;
    }
    /**
     * A virtual constructor...
     */
    static run(debugSession) {
        (0, runDebugAdapter_1.runDebugAdapter)(debugSession);
    }
    shutdown() {
        if (this._isServer || this._isRunningInline()) {
            // shutdown ignored in server mode
        }
        else {
            // wait a bit before shutting down
            setTimeout(() => {
                process.exit(0);
            }, 100);
        }
    }
    sendErrorResponse(response, codeOrMessage, format, variables, dest = ErrorDestination.User) {
        let msg;
        if (typeof codeOrMessage === 'number') {
            msg = {
                id: codeOrMessage,
                format: format
            };
            if (variables) {
                msg.variables = variables;
            }
            if (dest & ErrorDestination.User) {
                msg.showUser = true;
            }
            if (dest & ErrorDestination.Telemetry) {
                msg.sendTelemetry = true;
            }
        }
        else {
            msg = codeOrMessage;
        }
        response.success = false;
        response.message = DebugSession.formatPII(msg.format, true, msg.variables);
        if (!response.body) {
            response.body = {};
        }
        response.body.error = msg;
        this.sendResponse(response);
    }
    runInTerminalRequest(args, timeout, cb) {
        this.sendRequest('runInTerminal', args, timeout, cb);
    }
    dispatchRequest(request) {
        const response = new messages_1.Response(request);
        try {
            if (request.command === 'initialize') {
                var args = request.arguments;
                if (typeof args.linesStartAt1 === 'boolean') {
                    this._clientLinesStartAt1 = args.linesStartAt1;
                }
                if (typeof args.columnsStartAt1 === 'boolean') {
                    this._clientColumnsStartAt1 = args.columnsStartAt1;
                }
                if (args.pathFormat !== 'path') {
                    this.sendErrorResponse(response, 2018, 'debug adapter only supports native paths', null, ErrorDestination.Telemetry);
                }
                else {
                    const initializeResponse = response;
                    initializeResponse.body = {};
                    this.initializeRequest(initializeResponse, args);
                }
            }
            else if (request.command === 'launch') {
                this.launchRequest(response, request.arguments, request);
            }
            else if (request.command === 'attach') {
                this.attachRequest(response, request.arguments, request);
            }
            else if (request.command === 'disconnect') {
                this.disconnectRequest(response, request.arguments, request);
            }
            else if (request.command === 'terminate') {
                this.terminateRequest(response, request.arguments, request);
            }
            else if (request.command === 'restart') {
                this.restartRequest(response, request.arguments, request);
            }
            else if (request.command === 'setBreakpoints') {
                this.setBreakPointsRequest(response, request.arguments, request);
            }
            else if (request.command === 'setFunctionBreakpoints') {
                this.setFunctionBreakPointsRequest(response, request.arguments, request);
            }
            else if (request.command === 'setExceptionBreakpoints') {
                this.setExceptionBreakPointsRequest(response, request.arguments, request);
            }
            else if (request.command === 'configurationDone') {
                this.configurationDoneRequest(response, request.arguments, request);
            }
            else if (request.command === 'continue') {
                this.continueRequest(response, request.arguments, request);
            }
            else if (request.command === 'next') {
                this.nextRequest(response, request.arguments, request);
            }
            else if (request.command === 'stepIn') {
                this.stepInRequest(response, request.arguments, request);
            }
            else if (request.command === 'stepOut') {
                this.stepOutRequest(response, request.arguments, request);
            }
            else if (request.command === 'stepBack') {
                this.stepBackRequest(response, request.arguments, request);
            }
            else if (request.command === 'reverseContinue') {
                this.reverseContinueRequest(response, request.arguments, request);
            }
            else if (request.command === 'restartFrame') {
                this.restartFrameRequest(response, request.arguments, request);
            }
            else if (request.command === 'goto') {
                this.gotoRequest(response, request.arguments, request);
            }
            else if (request.command === 'pause') {
                this.pauseRequest(response, request.arguments, request);
            }
            else if (request.command === 'stackTrace') {
                this.stackTraceRequest(response, request.arguments, request);
            }
            else if (request.command === 'scopes') {
                this.scopesRequest(response, request.arguments, request);
            }
            else if (request.command === 'variables') {
                this.variablesRequest(response, request.arguments, request);
            }
            else if (request.command === 'setVariable') {
                this.setVariableRequest(response, request.arguments, request);
            }
            else if (request.command === 'setExpression') {
                this.setExpressionRequest(response, request.arguments, request);
            }
            else if (request.command === 'source') {
                this.sourceRequest(response, request.arguments, request);
            }
            else if (request.command === 'threads') {
                this.threadsRequest(response, request);
            }
            else if (request.command === 'terminateThreads') {
                this.terminateThreadsRequest(response, request.arguments, request);
            }
            else if (request.command === 'evaluate') {
                this.evaluateRequest(response, request.arguments, request);
            }
            else if (request.command === 'stepInTargets') {
                this.stepInTargetsRequest(response, request.arguments, request);
            }
            else if (request.command === 'gotoTargets') {
                this.gotoTargetsRequest(response, request.arguments, request);
            }
            else if (request.command === 'completions') {
                this.completionsRequest(response, request.arguments, request);
            }
            else if (request.command === 'exceptionInfo') {
                this.exceptionInfoRequest(response, request.arguments, request);
            }
            else if (request.command === 'loadedSources') {
                this.loadedSourcesRequest(response, request.arguments, request);
            }
            else if (request.command === 'dataBreakpointInfo') {
                this.dataBreakpointInfoRequest(response, request.arguments, request);
            }
            else if (request.command === 'setDataBreakpoints') {
                this.setDataBreakpointsRequest(response, request.arguments, request);
            }
            else if (request.command === 'readMemory') {
                this.readMemoryRequest(response, request.arguments, request);
            }
            else if (request.command === 'writeMemory') {
                this.writeMemoryRequest(response, request.arguments, request);
            }
            else if (request.command === 'disassemble') {
                this.disassembleRequest(response, request.arguments, request);
            }
            else if (request.command === 'cancel') {
                this.cancelRequest(response, request.arguments, request);
            }
            else if (request.command === 'breakpointLocations') {
                this.breakpointLocationsRequest(response, request.arguments, request);
            }
            else if (request.command === 'setInstructionBreakpoints') {
                this.setInstructionBreakpointsRequest(response, request.arguments, request);
            }
            else {
                this.customRequest(request.command, response, request.arguments, request);
            }
        }
        catch (e) {
            this.sendErrorResponse(response, 1104, '{_stack}', { _exception: e.message, _stack: e.stack }, ErrorDestination.Telemetry);
        }
    }
    initializeRequest(response, args) {
        // This default debug adapter does not support conditional breakpoints.
        response.body.supportsConditionalBreakpoints = false;
        // This default debug adapter does not support hit conditional breakpoints.
        response.body.supportsHitConditionalBreakpoints = false;
        // This default debug adapter does not support function breakpoints.
        response.body.supportsFunctionBreakpoints = false;
        // This default debug adapter implements the 'configurationDone' request.
        response.body.supportsConfigurationDoneRequest = true;
        // This default debug adapter does not support hovers based on the 'evaluate' request.
        response.body.supportsEvaluateForHovers = false;
        // This default debug adapter does not support the 'stepBack' request.
        response.body.supportsStepBack = false;
        // This default debug adapter does not support the 'setVariable' request.
        response.body.supportsSetVariable = false;
        // This default debug adapter does not support the 'restartFrame' request.
        response.body.supportsRestartFrame = false;
        // This default debug adapter does not support the 'stepInTargets' request.
        response.body.supportsStepInTargetsRequest = false;
        // This default debug adapter does not support the 'gotoTargets' request.
        response.body.supportsGotoTargetsRequest = false;
        // This default debug adapter does not support the 'completions' request.
        response.body.supportsCompletionsRequest = false;
        // This default debug adapter does not support the 'restart' request.
        response.body.supportsRestartRequest = false;
        // This default debug adapter does not support the 'exceptionOptions' attribute on the 'setExceptionBreakpoints' request.
        response.body.supportsExceptionOptions = false;
        // This default debug adapter does not support the 'format' attribute on the 'variables', 'evaluate', and 'stackTrace' request.
        response.body.supportsValueFormattingOptions = false;
        // This debug adapter does not support the 'exceptionInfo' request.
        response.body.supportsExceptionInfoRequest = false;
        // This debug adapter does not support the 'TerminateDebuggee' attribute on the 'disconnect' request.
        response.body.supportTerminateDebuggee = false;
        // This debug adapter does not support delayed loading of stack frames.
        response.body.supportsDelayedStackTraceLoading = false;
        // This debug adapter does not support the 'loadedSources' request.
        response.body.supportsLoadedSourcesRequest = false;
        // This debug adapter does not support the 'logMessage' attribute of the SourceBreakpoint.
        response.body.supportsLogPoints = false;
        // This debug adapter does not support the 'terminateThreads' request.
        response.body.supportsTerminateThreadsRequest = false;
        // This debug adapter does not support the 'setExpression' request.
        response.body.supportsSetExpression = false;
        // This debug adapter does not support the 'terminate' request.
        response.body.supportsTerminateRequest = false;
        // This debug adapter does not support data breakpoints.
        response.body.supportsDataBreakpoints = false;
        /** This debug adapter does not support the 'readMemory' request. */
        response.body.supportsReadMemoryRequest = false;
        /** The debug adapter does not support the 'disassemble' request. */
        response.body.supportsDisassembleRequest = false;
        /** The debug adapter does not support the 'cancel' request. */
        response.body.supportsCancelRequest = false;
        /** The debug adapter does not support the 'breakpointLocations' request. */
        response.body.supportsBreakpointLocationsRequest = false;
        /** The debug adapter does not support the 'clipboard' context value in the 'evaluate' request. */
        response.body.supportsClipboardContext = false;
        /** The debug adapter does not support stepping granularities for the stepping requests. */
        response.body.supportsSteppingGranularity = false;
        /** The debug adapter does not support the 'setInstructionBreakpoints' request. */
        response.body.supportsInstructionBreakpoints = false;
        /** The debug adapter does not support 'filterOptions' on the 'setExceptionBreakpoints' request. */
        response.body.supportsExceptionFilterOptions = false;
        this.sendResponse(response);
    }
    disconnectRequest(response, args, request) {
        this.sendResponse(response);
        this.shutdown();
    }
    launchRequest(response, args, request) {
        this.sendResponse(response);
    }
    attachRequest(response, args, request) {
        this.sendResponse(response);
    }
    terminateRequest(response, args, request) {
        this.sendResponse(response);
    }
    restartRequest(response, args, request) {
        this.sendResponse(response);
    }
    setBreakPointsRequest(response, args, request) {
        this.sendResponse(response);
    }
    setFunctionBreakPointsRequest(response, args, request) {
        this.sendResponse(response);
    }
    setExceptionBreakPointsRequest(response, args, request) {
        this.sendResponse(response);
    }
    configurationDoneRequest(response, args, request) {
        this.sendResponse(response);
    }
    continueRequest(response, args, request) {
        this.sendResponse(response);
    }
    nextRequest(response, args, request) {
        this.sendResponse(response);
    }
    stepInRequest(response, args, request) {
        this.sendResponse(response);
    }
    stepOutRequest(response, args, request) {
        this.sendResponse(response);
    }
    stepBackRequest(response, args, request) {
        this.sendResponse(response);
    }
    reverseContinueRequest(response, args, request) {
        this.sendResponse(response);
    }
    restartFrameRequest(response, args, request) {
        this.sendResponse(response);
    }
    gotoRequest(response, args, request) {
        this.sendResponse(response);
    }
    pauseRequest(response, args, request) {
        this.sendResponse(response);
    }
    sourceRequest(response, args, request) {
        this.sendResponse(response);
    }
    threadsRequest(response, request) {
        this.sendResponse(response);
    }
    terminateThreadsRequest(response, args, request) {
        this.sendResponse(response);
    }
    stackTraceRequest(response, args, request) {
        this.sendResponse(response);
    }
    scopesRequest(response, args, request) {
        this.sendResponse(response);
    }
    variablesRequest(response, args, request) {
        this.sendResponse(response);
    }
    setVariableRequest(response, args, request) {
        this.sendResponse(response);
    }
    setExpressionRequest(response, args, request) {
        this.sendResponse(response);
    }
    evaluateRequest(response, args, request) {
        this.sendResponse(response);
    }
    stepInTargetsRequest(response, args, request) {
        this.sendResponse(response);
    }
    gotoTargetsRequest(response, args, request) {
        this.sendResponse(response);
    }
    completionsRequest(response, args, request) {
        this.sendResponse(response);
    }
    exceptionInfoRequest(response, args, request) {
        this.sendResponse(response);
    }
    loadedSourcesRequest(response, args, request) {
        this.sendResponse(response);
    }
    dataBreakpointInfoRequest(response, args, request) {
        this.sendResponse(response);
    }
    setDataBreakpointsRequest(response, args, request) {
        this.sendResponse(response);
    }
    readMemoryRequest(response, args, request) {
        this.sendResponse(response);
    }
    writeMemoryRequest(response, args, request) {
        this.sendResponse(response);
    }
    disassembleRequest(response, args, request) {
        this.sendResponse(response);
    }
    cancelRequest(response, args, request) {
        this.sendResponse(response);
    }
    breakpointLocationsRequest(response, args, request) {
        this.sendResponse(response);
    }
    setInstructionBreakpointsRequest(response, args, request) {
        this.sendResponse(response);
    }
    /**
     * Override this hook to implement custom requests.
     */
    customRequest(command, response, args, request) {
        this.sendErrorResponse(response, 1014, 'unrecognized request', null, ErrorDestination.Telemetry);
    }
    //---- protected -------------------------------------------------------------------------------------------------
    convertClientLineToDebugger(line) {
        if (this._debuggerLinesStartAt1) {
            return this._clientLinesStartAt1 ? line : line + 1;
        }
        return this._clientLinesStartAt1 ? line - 1 : line;
    }
    convertDebuggerLineToClient(line) {
        if (this._debuggerLinesStartAt1) {
            return this._clientLinesStartAt1 ? line : line - 1;
        }
        return this._clientLinesStartAt1 ? line + 1 : line;
    }
    convertClientColumnToDebugger(column) {
        if (this._debuggerColumnsStartAt1) {
            return this._clientColumnsStartAt1 ? column : column + 1;
        }
        return this._clientColumnsStartAt1 ? column - 1 : column;
    }
    convertDebuggerColumnToClient(column) {
        if (this._debuggerColumnsStartAt1) {
            return this._clientColumnsStartAt1 ? column : column - 1;
        }
        return this._clientColumnsStartAt1 ? column + 1 : column;
    }
    convertClientPathToDebugger(clientPath) {
        if (this._clientPathsAreURIs !== this._debuggerPathsAreURIs) {
            if (this._clientPathsAreURIs) {
                return DebugSession.uri2path(clientPath);
            }
            else {
                return DebugSession.path2uri(clientPath);
            }
        }
        return clientPath;
    }
    convertDebuggerPathToClient(debuggerPath) {
        if (this._debuggerPathsAreURIs !== this._clientPathsAreURIs) {
            if (this._debuggerPathsAreURIs) {
                return DebugSession.uri2path(debuggerPath);
            }
            else {
                return DebugSession.path2uri(debuggerPath);
            }
        }
        return debuggerPath;
    }
    //---- private -------------------------------------------------------------------------------
    static path2uri(path) {
        if (process.platform === 'win32') {
            if (/^[A-Z]:/.test(path)) {
                path = path[0].toLowerCase() + path.substr(1);
            }
            path = path.replace(/\\/g, '/');
        }
        path = encodeURI(path);
        let uri = new url_1.URL(`file:`); // ignore 'path' for now
        uri.pathname = path; // now use 'path' to get the correct percent encoding (see https://url.spec.whatwg.org)
        return uri.toString();
    }
    static uri2path(sourceUri) {
        let uri = new url_1.URL(sourceUri);
        let s = decodeURIComponent(uri.pathname);
        if (process.platform === 'win32') {
            if (/^\/[a-zA-Z]:/.test(s)) {
                s = s[1].toLowerCase() + s.substr(2);
            }
            s = s.replace(/\//g, '\\');
        }
        return s;
    }
    /*
    * If argument starts with '_' it is OK to send its value to telemetry.
    */
    static formatPII(format, excludePII, args) {
        return format.replace(DebugSession._formatPIIRegexp, function (match, paramName) {
            if (excludePII && paramName.length > 0 && paramName[0] !== '_') {
                return match;
            }
            return args[paramName] && args.hasOwnProperty(paramName) ?
                args[paramName] :
                match;
        });
    }
}
exports.DebugSession = DebugSession;
DebugSession._formatPIIRegexp = /{([^}]+)}/g;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdTZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlYnVnU2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztnR0FHZ0c7OztBQUdoRyx5Q0FBNEM7QUFDNUMseUNBQTZDO0FBQzdDLHVEQUFvRDtBQUNwRCw2QkFBMEI7QUFHMUIsTUFBYSxNQUFNO0lBS2xCLFlBQW1CLElBQVksRUFBRSxJQUFhLEVBQUUsS0FBYSxDQUFDLEVBQUUsTUFBZSxFQUFFLElBQVU7UUFDMUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEVBQUU7WUFDTCxJQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUM1QjtRQUNELElBQUksSUFBSSxFQUFFO1lBQ0gsSUFBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDL0I7SUFDRixDQUFDO0NBQ0Q7QUFoQkQsd0JBZ0JDO0FBRUQsTUFBYSxLQUFLO0lBS2pCLFlBQW1CLElBQVksRUFBRSxTQUFpQixFQUFFLFlBQXFCLEtBQUs7UUFDN0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0NBQ0Q7QUFWRCxzQkFVQztBQUVELE1BQWEsVUFBVTtJQWF0QixZQUFtQixDQUFTLEVBQUUsRUFBVSxFQUFFLEdBQVksRUFBRSxLQUFhLENBQUMsRUFBRSxNQUFjLENBQUM7UUFDdEYsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUs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LEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDVixDQUFDO0lBSUQ7O01BRUU7SUFDTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWEsRUFBRSxVQUFtQixFQUFFLElBQTZCO1FBQ3pGLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxLQUFLLEVBQUUsU0FBUztZQUM3RSxJQUFJLFVBQVUsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUMvRCxPQUFPLEtBQUssQ0FBQzthQUNiO1lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDOztBQXhtQkYsb0NBeW1CQztBQWZlLDZCQUFnQixHQUFHLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBEZWJ1Z1Byb3RvY29sIH0gZnJvbSAnQHZzY29kZS9kZWJ1Z3Byb3RvY29sJztcbmltcG9ydCB7IFByb3RvY29sU2VydmVyIH0gZnJvbSAnLi9wcm90b2NvbCc7XG5pbXBvcnQgeyBSZXNwb25zZSwgRXZlbnQgfSBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCB7IHJ1bkRlYnVnQWRhcHRlciB9IGZyb20gJy4vcnVuRGVidWdBZGFwdGVyJztcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG5cblxuZXhwb3J0IGNsYXNzIFNvdXJjZSBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuU291cmNlIHtcblx0bmFtZTogc3RyaW5nO1xuXHRwYXRoOiBzdHJpbmc7XG5cdHNvdXJjZVJlZmVyZW5jZTogbnVtYmVyO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIGlkOiBudW1iZXIgPSAwLCBvcmlnaW4/OiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMucGF0aCA9IHBhdGg7XG5cdFx0dGhpcy5zb3VyY2VSZWZlcmVuY2UgPSBpZDtcblx0XHRpZiAob3JpZ2luKSB7XG5cdFx0XHQoPGFueT50aGlzKS5vcmlnaW4gPSBvcmlnaW47XG5cdFx0fVxuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHQoPGFueT50aGlzKS5hZGFwdGVyRGF0YSA9IGRhdGE7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBTY29wZSBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuU2NvcGUge1xuXHRuYW1lOiBzdHJpbmc7XG5cdHZhcmlhYmxlc1JlZmVyZW5jZTogbnVtYmVyO1xuXHRleHBlbnNpdmU6IGJvb2xlYW47XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBudW1iZXIsIGV4cGVuc2l2ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLnZhcmlhYmxlc1JlZmVyZW5jZSA9IHJlZmVyZW5jZTtcblx0XHR0aGlzLmV4cGVuc2l2ZSA9IGV4cGVuc2l2ZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU3RhY2tGcmFtZSBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuU3RhY2tGcmFtZSB7XG5cdGlkOiBudW1iZXI7XG5cdG5hbWU6IHN0cmluZztcblx0c291cmNlPzogRGVidWdQcm90b2NvbC5Tb3VyY2U7XG5cdGxpbmU6IG51bWJlcjtcblx0Y29sdW1uOiBudW1iZXI7XG5cdGVuZExpbmU/OiBudW1iZXI7XG5cdGVuZENvbHVtbj86IG51bWJlcjtcblx0Y2FuUmVzdGFydD86IGJvb2xlYW47XG5cdGluc3RydWN0aW9uUG9pbnRlclJlZmVyZW5jZT86IHN0cmluZztcblx0bW9kdWxlSWQ/OiBudW1iZXIgfCBzdHJpbmc7XG5cdHByZXNlbnRhdGlvbkhpbnQ/OiAnbm9ybWFsJyB8ICdsYWJlbCcgfCAnc3VidGxlJztcblxuXHRwdWJsaWMgY29uc3RydWN0b3IoaTogbnVtYmVyLCBubTogc3RyaW5nLCBzcmM/OiBTb3VyY2UsIGxuOiBudW1iZXIgPSAwLCBjb2w6IG51bWJlciA9IDApIHtcblx0XHR0aGlzLmlkID0gaTtcblx0XHR0aGlzLnNvdXJjZSA9IHNyYztcblx0XHR0aGlzLmxpbmUgPSBsbjtcblx0XHR0aGlzLmNvbHVtbiA9IGNvbDtcblx0XHR0aGlzLm5hbWUgPSBubTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgVGhyZWFkIGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5UaHJlYWQge1xuXHRpZDogbnVtYmVyO1xuXHRuYW1lOiBzdHJpbmc7XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xuXHRcdHRoaXMuaWQgPSBpZDtcblx0XHRpZiAobmFtZSkge1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5uYW1lID0gJ1RocmVhZCAjJyArIGlkO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgY2xhc3MgVmFyaWFibGUgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLlZhcmlhYmxlIHtcblx0bmFtZTogc3RyaW5nO1xuXHR2YWx1ZTogc3RyaW5nO1xuXHR2YXJpYWJsZXNSZWZlcmVuY2U6IG51bWJlcjtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCByZWY6IG51bWJlciA9IDAsIGluZGV4ZWRWYXJpYWJsZXM/OiBudW1iZXIsIG5hbWVkVmFyaWFibGVzPzogbnVtYmVyKSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0dGhpcy52YXJpYWJsZXNSZWZlcmVuY2UgPSByZWY7XG5cdFx0aWYgKHR5cGVvZiBuYW1lZFZhcmlhYmxlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdCg8RGVidWdQcm90b2NvbC5WYXJpYWJsZT50aGlzKS5uYW1lZFZhcmlhYmxlcyA9IG5hbWVkVmFyaWFibGVzO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGluZGV4ZWRWYXJpYWJsZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHQoPERlYnVnUHJvdG9jb2wuVmFyaWFibGU+dGhpcykuaW5kZXhlZFZhcmlhYmxlcyA9IGluZGV4ZWRWYXJpYWJsZXM7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBCcmVha3BvaW50IGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5CcmVha3BvaW50IHtcblx0dmVyaWZpZWQ6IGJvb2xlYW47XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKHZlcmlmaWVkOiBib29sZWFuLCBsaW5lPzogbnVtYmVyLCBjb2x1bW4/OiBudW1iZXIsIHNvdXJjZT86IFNvdXJjZSkge1xuXHRcdHRoaXMudmVyaWZpZWQgPSB2ZXJpZmllZDtcblx0XHRjb25zdCBlOiBEZWJ1Z1Byb3RvY29sLkJyZWFrcG9pbnQgPSB0aGlzO1xuXHRcdGlmICh0eXBlb2YgbGluZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdGUubGluZSA9IGxpbmU7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgY29sdW1uID09PSAnbnVtYmVyJykge1xuXHRcdFx0ZS5jb2x1bW4gPSBjb2x1bW47XG5cdFx0fVxuXHRcdGlmIChzb3VyY2UpIHtcblx0XHRcdGUuc291cmNlID0gc291cmNlO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBzZXRJZChpZDogbnVtYmVyKSB7XG5cdFx0KHRoaXMgYXMgRGVidWdQcm90b2NvbC5CcmVha3BvaW50KS5pZCA9IGlkO1xuIFx0fVxufVxuXG5leHBvcnQgY2xhc3MgTW9kdWxlIGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5Nb2R1bGUge1xuXHRpZDogbnVtYmVyIHwgc3RyaW5nO1xuXHRuYW1lOiBzdHJpbmc7XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIgfCBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuXHRcdHRoaXMuaWQgPSBpZDtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wbGV0aW9uSXRlbSBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuQ29tcGxldGlvbkl0ZW0ge1xuXHRsYWJlbDogc3RyaW5nO1xuXHRzdGFydDogbnVtYmVyO1xuXHRsZW5ndGg6IG51bWJlcjtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIgPSAwKSB7XG5cdFx0dGhpcy5sYWJlbCA9IGxhYmVsO1xuXHRcdHRoaXMuc3RhcnQgPSBzdGFydDtcblx0XHR0aGlzLmxlbmd0aCA9IGxlbmd0aDtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU3RvcHBlZEV2ZW50IGV4dGVuZHMgRXZlbnQgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLlN0b3BwZWRFdmVudCB7XG5cdGJvZHk6IHtcblx0XHRyZWFzb246IHN0cmluZztcblx0fTtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IocmVhc29uOiBzdHJpbmcsIHRocmVhZElkPzogbnVtYmVyLCBleGNlcHRpb25UZXh0Pzogc3RyaW5nKSB7XG5cdFx0c3VwZXIoJ3N0b3BwZWQnKTtcblx0XHR0aGlzLmJvZHkgPSB7XG5cdFx0XHRyZWFzb246IHJlYXNvblxuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiB0aHJlYWRJZCA9PT0gJ251bWJlcicpIHtcblx0XHRcdCh0aGlzIGFzIERlYnVnUHJvdG9jb2wuU3RvcHBlZEV2ZW50KS5ib2R5LnRocmVhZElkID0gdGhyZWFkSWQ7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgZXhjZXB0aW9uVGV4dCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdCh0aGlzIGFzIERlYnVnUHJvdG9jb2wuU3RvcHBlZEV2ZW50KS5ib2R5LnRleHQgPSBleGNlcHRpb25UZXh0O1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29udGludWVkRXZlbnQgZXh0ZW5kcyBFdmVudCBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuQ29udGludWVkRXZlbnQge1xuXHRib2R5OiB7XG5cdFx0dGhyZWFkSWQ6IG51bWJlcjtcblx0fTtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IodGhyZWFkSWQ6IG51bWJlciwgYWxsVGhyZWFkc0NvbnRpbnVlZD86IGJvb2xlYW4pIHtcblx0XHRzdXBlcignY29udGludWVkJyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0dGhyZWFkSWQ6IHRocmVhZElkXG5cdFx0fTtcblxuXHRcdGlmICh0eXBlb2YgYWxsVGhyZWFkc0NvbnRpbnVlZCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHQoPERlYnVnUHJvdG9jb2wuQ29udGludWVkRXZlbnQ+dGhpcykuYm9keS5hbGxUaHJlYWRzQ29udGludWVkID0gYWxsVGhyZWFkc0NvbnRpbnVlZDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEluaXRpYWxpemVkRXZlbnQgZXh0ZW5kcyBFdmVudCBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuSW5pdGlhbGl6ZWRFdmVudCB7XG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcignaW5pdGlhbGl6ZWQnKTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgVGVybWluYXRlZEV2ZW50IGV4dGVuZHMgRXZlbnQgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLlRlcm1pbmF0ZWRFdmVudCB7XG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihyZXN0YXJ0PzogYW55KSB7XG5cdFx0c3VwZXIoJ3Rlcm1pbmF0ZWQnKTtcblx0XHRpZiAodHlwZW9mIHJlc3RhcnQgPT09ICdib29sZWFuJyB8fCByZXN0YXJ0KSB7XG5cdFx0XHRjb25zdCBlOiBEZWJ1Z1Byb3RvY29sLlRlcm1pbmF0ZWRFdmVudCA9IHRoaXM7XG5cdFx0XHRlLmJvZHkgPSB7XG5cdFx0XHRcdHJlc3RhcnQ6IHJlc3RhcnRcblx0XHRcdH07XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBFeGl0ZWRFdmVudCBleHRlbmRzIEV2ZW50IGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5FeGl0ZWRFdmVudCB7XG5cdGJvZHk6IHtcblx0XHRleGl0Q29kZTogbnVtYmVyXG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKGV4aXRDb2RlOiBudW1iZXIpIHtcblx0XHRzdXBlcignZXhpdGVkJyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0ZXhpdENvZGU6IGV4aXRDb2RlXG5cdFx0fTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0RXZlbnQgZXh0ZW5kcyBFdmVudCBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuT3V0cHV0RXZlbnQge1xuXHRib2R5OiB7XG5cdFx0Y2F0ZWdvcnk6IHN0cmluZyxcblx0XHRvdXRwdXQ6IHN0cmluZyxcblx0XHRkYXRhPzogYW55XG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKG91dHB1dDogc3RyaW5nLCBjYXRlZ29yeTogc3RyaW5nID0gJ2NvbnNvbGUnLCBkYXRhPzogYW55KSB7XG5cdFx0c3VwZXIoJ291dHB1dCcpO1xuXHRcdHRoaXMuYm9keSA9IHtcblx0XHRcdGNhdGVnb3J5OiBjYXRlZ29yeSxcblx0XHRcdG91dHB1dDogb3V0cHV0XG5cdFx0fTtcblx0XHRpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmJvZHkuZGF0YSA9IGRhdGE7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBUaHJlYWRFdmVudCBleHRlbmRzIEV2ZW50IGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5UaHJlYWRFdmVudCB7XG5cdGJvZHk6IHtcblx0XHRyZWFzb246IHN0cmluZyxcblx0XHR0aHJlYWRJZDogbnVtYmVyXG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKHJlYXNvbjogc3RyaW5nLCB0aHJlYWRJZDogbnVtYmVyKSB7XG5cdFx0c3VwZXIoJ3RocmVhZCcpO1xuXHRcdHRoaXMuYm9keSA9IHtcblx0XHRcdHJlYXNvbjogcmVhc29uLFxuXHRcdFx0dGhyZWFkSWQ6IHRocmVhZElkXG5cdFx0fTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQnJlYWtwb2ludEV2ZW50IGV4dGVuZHMgRXZlbnQgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLkJyZWFrcG9pbnRFdmVudCB7XG5cdGJvZHk6IHtcblx0XHRyZWFzb246IHN0cmluZyxcblx0XHRicmVha3BvaW50OiBEZWJ1Z1Byb3RvY29sLkJyZWFrcG9pbnRcblx0fTtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IocmVhc29uOiBzdHJpbmcsIGJyZWFrcG9pbnQ6IERlYnVnUHJvdG9jb2wuQnJlYWtwb2ludCkge1xuXHRcdHN1cGVyKCdicmVha3BvaW50Jyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0cmVhc29uOiByZWFzb24sXG5cdFx0XHRicmVha3BvaW50OiBicmVha3BvaW50XG5cdFx0fTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTW9kdWxlRXZlbnQgZXh0ZW5kcyBFdmVudCBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuTW9kdWxlRXZlbnQge1xuXHRib2R5OiB7XG5cdFx0cmVhc29uOiAnbmV3JyB8ICdjaGFuZ2VkJyB8ICdyZW1vdmVkJyxcblx0XHRtb2R1bGU6IERlYnVnUHJvdG9jb2wuTW9kdWxlXG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKHJlYXNvbjogJ25ldycgfCAnY2hhbmdlZCcgfCAncmVtb3ZlZCcsIG1vZHVsZTogRGVidWdQcm90b2NvbC5Nb2R1bGUpIHtcblx0XHRzdXBlcignbW9kdWxlJyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0cmVhc29uOiByZWFzb24sXG5cdFx0XHRtb2R1bGU6IG1vZHVsZVxuXHRcdH07XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRlZFNvdXJjZUV2ZW50IGV4dGVuZHMgRXZlbnQgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLkxvYWRlZFNvdXJjZUV2ZW50IHtcblx0Ym9keToge1xuXHRcdHJlYXNvbjogJ25ldycgfCAnY2hhbmdlZCcgfCAncmVtb3ZlZCcsXG5cdFx0c291cmNlOiBEZWJ1Z1Byb3RvY29sLlNvdXJjZVxuXHR9O1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihyZWFzb246ICduZXcnIHwgJ2NoYW5nZWQnIHwgJ3JlbW92ZWQnLCBzb3VyY2U6IERlYnVnUHJvdG9jb2wuU291cmNlKSB7XG5cdFx0c3VwZXIoJ2xvYWRlZFNvdXJjZScpO1xuXHRcdHRoaXMuYm9keSA9IHtcblx0XHRcdHJlYXNvbjogcmVhc29uLFxuXHRcdFx0c291cmNlOiBzb3VyY2Vcblx0XHR9O1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXBhYmlsaXRpZXNFdmVudCBleHRlbmRzIEV2ZW50IGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5DYXBhYmlsaXRpZXNFdmVudCB7XG5cdGJvZHk6IHtcblx0XHRjYXBhYmlsaXRpZXM6IERlYnVnUHJvdG9jb2wuQ2FwYWJpbGl0aWVzXG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKGNhcGFiaWxpdGllczogRGVidWdQcm90b2NvbC5DYXBhYmlsaXRpZXMpIHtcblx0XHRzdXBlcignY2FwYWJpbGl0aWVzJyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0Y2FwYWJpbGl0aWVzOiBjYXBhYmlsaXRpZXNcblx0XHR9O1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1N0YXJ0RXZlbnQgZXh0ZW5kcyBFdmVudCBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuUHJvZ3Jlc3NTdGFydEV2ZW50IHtcblx0Ym9keToge1xuXHRcdHByb2dyZXNzSWQ6IHN0cmluZyxcblx0XHR0aXRsZTogc3RyaW5nXG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKHByb2dyZXNzSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZywgbWVzc2FnZT86IHN0cmluZykge1xuXHRcdHN1cGVyKCdwcm9ncmVzc1N0YXJ0Jyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0cHJvZ3Jlc3NJZDogcHJvZ3Jlc3NJZCxcblx0XHRcdHRpdGxlOiB0aXRsZVxuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuXHRcdFx0KHRoaXMgYXMgRGVidWdQcm90b2NvbC5Qcm9ncmVzc1N0YXJ0RXZlbnQpLmJvZHkubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1VwZGF0ZUV2ZW50IGV4dGVuZHMgRXZlbnQgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLlByb2dyZXNzVXBkYXRlRXZlbnQge1xuXHRib2R5OiB7XG5cdFx0cHJvZ3Jlc3NJZDogc3RyaW5nXG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKHByb2dyZXNzSWQ6IHN0cmluZywgbWVzc2FnZT86IHN0cmluZykge1xuXHRcdHN1cGVyKCdwcm9ncmVzc1VwZGF0ZScpO1xuXHRcdHRoaXMuYm9keSA9IHtcblx0XHRcdHByb2dyZXNzSWQ6IHByb2dyZXNzSWRcblx0XHR9O1xuXHRcdGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdCh0aGlzIGFzIERlYnVnUHJvdG9jb2wuUHJvZ3Jlc3NVcGRhdGVFdmVudCkuYm9keS5tZXNzYWdlID0gbWVzc2FnZTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzRW5kRXZlbnQgZXh0ZW5kcyBFdmVudCBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuUHJvZ3Jlc3NFbmRFdmVudCB7XG5cdGJvZHk6IHtcblx0XHRwcm9ncmVzc0lkOiBzdHJpbmdcblx0fTtcblxuXHRwdWJsaWMgY29uc3RydWN0b3IocHJvZ3Jlc3NJZDogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nKSB7XG5cdFx0c3VwZXIoJ3Byb2dyZXNzRW5kJyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdFx0cHJvZ3Jlc3NJZDogcHJvZ3Jlc3NJZFxuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuXHRcdFx0KHRoaXMgYXMgRGVidWdQcm90b2NvbC5Qcm9ncmVzc0VuZEV2ZW50KS5ib2R5Lm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW52YWxpZGF0ZWRFdmVudCBleHRlbmRzIEV2ZW50IGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5JbnZhbGlkYXRlZEV2ZW50IHtcblx0Ym9keToge1xuXHRcdGFyZWFzPzogRGVidWdQcm90b2NvbC5JbnZhbGlkYXRlZEFyZWFzW107XG5cdFx0dGhyZWFkSWQ/OiBudW1iZXI7XG5cdFx0c3RhY2tGcmFtZUlkPzogbnVtYmVyO1xuXHR9O1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihhcmVhcz86IERlYnVnUHJvdG9jb2wuSW52YWxpZGF0ZWRBcmVhc1tdLCB0aHJlYWRJZD86IG51bWJlciwgc3RhY2tGcmFtZUlkPzogbnVtYmVyKSB7XG5cdFx0c3VwZXIoJ2ludmFsaWRhdGVkJyk7XG5cdFx0dGhpcy5ib2R5ID0ge1xuXHRcdH07XG5cdFx0aWYgKGFyZWFzKSB7XG5cdFx0XHR0aGlzLmJvZHkuYXJlYXMgPSBhcmVhcztcblx0XHR9XG5cdFx0aWYgKHRocmVhZElkKSB7XG5cdFx0XHR0aGlzLmJvZHkudGhyZWFkSWQgPSB0aHJlYWRJZDtcblx0XHR9XG5cdFx0aWYgKHN0YWNrRnJhbWVJZCkge1xuXHRcdFx0dGhpcy5ib2R5LnN0YWNrRnJhbWVJZCA9IHN0YWNrRnJhbWVJZDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lbW9yeUV2ZW50IGV4dGVuZHMgRXZlbnQgaW1wbGVtZW50cyBEZWJ1Z1Byb3RvY29sLk1lbW9yeUV2ZW50IHtcblx0Ym9keToge1xuXHRcdG1lbW9yeVJlZmVyZW5jZTogc3RyaW5nO1xuXHRcdG9mZnNldDogbnVtYmVyO1xuXHRcdGNvdW50OiBudW1iZXI7XG5cdH07XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKG1lbW9yeVJlZmVyZW5jZTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xuXHRcdHN1cGVyKCdtZW1vcnknKTtcblx0XHR0aGlzLmJvZHkgPSB7IG1lbW9yeVJlZmVyZW5jZSwgb2Zmc2V0LCBjb3VudCB9O1xuXHR9XG59XG5cbmV4cG9ydCBlbnVtIEVycm9yRGVzdGluYXRpb24ge1xuXHRVc2VyID0gMSxcblx0VGVsZW1ldHJ5ID0gMlxufTtcblxuZXhwb3J0IGNsYXNzIERlYnVnU2Vzc2lvbiBleHRlbmRzIFByb3RvY29sU2VydmVyIHtcblxuXHRwcml2YXRlIF9kZWJ1Z2dlckxpbmVzU3RhcnRBdDE6IGJvb2xlYW47XG5cdHByaXZhdGUgX2RlYnVnZ2VyQ29sdW1uc1N0YXJ0QXQxOiBib29sZWFuO1xuXHRwcml2YXRlIF9kZWJ1Z2dlclBhdGhzQXJlVVJJczogYm9vbGVhbjtcblxuXHRwcml2YXRlIF9jbGllbnRMaW5lc1N0YXJ0QXQxOiBib29sZWFuO1xuXHRwcml2YXRlIF9jbGllbnRDb2x1bW5zU3RhcnRBdDE6IGJvb2xlYW47XG5cdHByaXZhdGUgX2NsaWVudFBhdGhzQXJlVVJJczogYm9vbGVhbjtcblxuXHRwcm90ZWN0ZWQgX2lzU2VydmVyOiBib29sZWFuO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihvYnNvbGV0ZV9kZWJ1Z2dlckxpbmVzQW5kQ29sdW1uc1N0YXJ0QXQxPzogYm9vbGVhbiwgb2Jzb2xldGVfaXNTZXJ2ZXI/OiBib29sZWFuKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdGNvbnN0IGxpbmVzQW5kQ29sdW1uc1N0YXJ0QXQxID0gdHlwZW9mIG9ic29sZXRlX2RlYnVnZ2VyTGluZXNBbmRDb2x1bW5zU3RhcnRBdDEgPT09ICdib29sZWFuJyA/IG9ic29sZXRlX2RlYnVnZ2VyTGluZXNBbmRDb2x1bW5zU3RhcnRBdDEgOiBmYWxzZTtcblx0XHR0aGlzLl9kZWJ1Z2dlckxpbmVzU3RhcnRBdDEgPSBsaW5lc0FuZENvbHVtbnNTdGFydEF0MTtcblx0XHR0aGlzLl9kZWJ1Z2dlckNvbHVtbnNTdGFydEF0MSA9IGxpbmVzQW5kQ29sdW1uc1N0YXJ0QXQxO1xuXHRcdHRoaXMuX2RlYnVnZ2VyUGF0aHNBcmVVUklzID0gZmFsc2U7XG5cblx0XHR0aGlzLl9jbGllbnRMaW5lc1N0YXJ0QXQxID0gdHJ1ZTtcblx0XHR0aGlzLl9jbGllbnRDb2x1bW5zU3RhcnRBdDEgPSB0cnVlO1xuXHRcdHRoaXMuX2NsaWVudFBhdGhzQXJlVVJJcyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5faXNTZXJ2ZXIgPSB0eXBlb2Ygb2Jzb2xldGVfaXNTZXJ2ZXIgPT09ICdib29sZWFuJyA/IG9ic29sZXRlX2lzU2VydmVyIDogZmFsc2U7XG5cblx0XHR0aGlzLm9uKCdjbG9zZScsICgpID0+IHtcblx0XHRcdHRoaXMuc2h1dGRvd24oKTtcblx0XHR9KTtcblx0XHR0aGlzLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuXHRcdFx0dGhpcy5zaHV0ZG93bigpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIHNldERlYnVnZ2VyUGF0aEZvcm1hdChmb3JtYXQ6IHN0cmluZykge1xuXHRcdHRoaXMuX2RlYnVnZ2VyUGF0aHNBcmVVUklzID0gZm9ybWF0ICE9PSAncGF0aCc7XG5cdH1cblxuXHRwdWJsaWMgc2V0RGVidWdnZXJMaW5lc1N0YXJ0QXQxKGVuYWJsZTogYm9vbGVhbikge1xuXHRcdHRoaXMuX2RlYnVnZ2VyTGluZXNTdGFydEF0MSA9IGVuYWJsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXREZWJ1Z2dlckNvbHVtbnNTdGFydEF0MShlbmFibGU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9kZWJ1Z2dlckNvbHVtbnNTdGFydEF0MSA9IGVuYWJsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXRSdW5Bc1NlcnZlcihlbmFibGU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9pc1NlcnZlciA9IGVuYWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHZpcnR1YWwgY29uc3RydWN0b3IuLi5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcnVuKGRlYnVnU2Vzc2lvbjogdHlwZW9mIERlYnVnU2Vzc2lvbikge1xuXHRcdHJ1bkRlYnVnQWRhcHRlcihkZWJ1Z1Nlc3Npb24pO1xuXHR9XG5cblx0cHVibGljIHNodXRkb3duKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9pc1NlcnZlciB8fCB0aGlzLl9pc1J1bm5pbmdJbmxpbmUoKSkge1xuXHRcdFx0Ly8gc2h1dGRvd24gaWdub3JlZCBpbiBzZXJ2ZXIgbW9kZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB3YWl0IGEgYml0IGJlZm9yZSBzaHV0dGluZyBkb3duXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0cHJvY2Vzcy5leGl0KDApO1xuXHRcdFx0fSwgMTAwKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2VuZEVycm9yUmVzcG9uc2UocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUmVzcG9uc2UsIGNvZGVPck1lc3NhZ2U6IG51bWJlciB8IERlYnVnUHJvdG9jb2wuTWVzc2FnZSwgZm9ybWF0Pzogc3RyaW5nLCB2YXJpYWJsZXM/OiBhbnksIGRlc3Q6IEVycm9yRGVzdGluYXRpb24gPSBFcnJvckRlc3RpbmF0aW9uLlVzZXIpOiB2b2lkIHtcblxuXHRcdGxldCBtc2cgOiBEZWJ1Z1Byb3RvY29sLk1lc3NhZ2U7XG5cdFx0aWYgKHR5cGVvZiBjb2RlT3JNZXNzYWdlID09PSAnbnVtYmVyJykge1xuXHRcdFx0bXNnID0gPERlYnVnUHJvdG9jb2wuTWVzc2FnZT4ge1xuXHRcdFx0XHRpZDogPG51bWJlcj4gY29kZU9yTWVzc2FnZSxcblx0XHRcdFx0Zm9ybWF0OiBmb3JtYXRcblx0XHRcdH07XG5cdFx0XHRpZiAodmFyaWFibGVzKSB7XG5cdFx0XHRcdG1zZy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGVzdCAmIEVycm9yRGVzdGluYXRpb24uVXNlcikge1xuXHRcdFx0XHRtc2cuc2hvd1VzZXIgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRlc3QgJiBFcnJvckRlc3RpbmF0aW9uLlRlbGVtZXRyeSkge1xuXHRcdFx0XHRtc2cuc2VuZFRlbGVtZXRyeSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1zZyA9IGNvZGVPck1lc3NhZ2U7XG5cdFx0fVxuXG5cdFx0cmVzcG9uc2Uuc3VjY2VzcyA9IGZhbHNlO1xuXHRcdHJlc3BvbnNlLm1lc3NhZ2UgPSBEZWJ1Z1Nlc3Npb24uZm9ybWF0UElJKG1zZy5mb3JtYXQsIHRydWUsIG1zZy52YXJpYWJsZXMpO1xuXHRcdGlmICghcmVzcG9uc2UuYm9keSkge1xuXHRcdFx0cmVzcG9uc2UuYm9keSA9IHsgfTtcblx0XHR9XG5cdFx0cmVzcG9uc2UuYm9keS5lcnJvciA9IG1zZztcblxuXHRcdHRoaXMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0fVxuXG5cdHB1YmxpYyBydW5JblRlcm1pbmFsUmVxdWVzdChhcmdzOiBEZWJ1Z1Byb3RvY29sLlJ1bkluVGVybWluYWxSZXF1ZXN0QXJndW1lbnRzLCB0aW1lb3V0OiBudW1iZXIsIGNiOiAocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUnVuSW5UZXJtaW5hbFJlc3BvbnNlKSA9PiB2b2lkKSB7XG5cdFx0dGhpcy5zZW5kUmVxdWVzdCgncnVuSW5UZXJtaW5hbCcsIGFyZ3MsIHRpbWVvdXQsIGNiIGFzIChyOiBEZWJ1Z1Byb3RvY29sLlJlc3BvbnNlKSA9PiB2b2lkKTtcblx0fVxuXG5cdHByb3RlY3RlZCBkaXNwYXRjaFJlcXVlc3QocmVxdWVzdDogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZShyZXF1ZXN0KTtcblxuXHRcdHRyeSB7XG5cdFx0XHRpZiAocmVxdWVzdC5jb21tYW5kID09PSAnaW5pdGlhbGl6ZScpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSA8RGVidWdQcm90b2NvbC5Jbml0aWFsaXplUmVxdWVzdEFyZ3VtZW50cz4gcmVxdWVzdC5hcmd1bWVudHM7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLmxpbmVzU3RhcnRBdDEgPT09ICdib29sZWFuJykge1xuXHRcdFx0XHRcdHRoaXMuX2NsaWVudExpbmVzU3RhcnRBdDEgPSBhcmdzLmxpbmVzU3RhcnRBdDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLmNvbHVtbnNTdGFydEF0MSA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2xpZW50Q29sdW1uc1N0YXJ0QXQxID0gYXJncy5jb2x1bW5zU3RhcnRBdDE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXJncy5wYXRoRm9ybWF0ICE9PSAncGF0aCcpIHtcblx0XHRcdFx0XHR0aGlzLnNlbmRFcnJvclJlc3BvbnNlKHJlc3BvbnNlLCAyMDE4LCAnZGVidWcgYWRhcHRlciBvbmx5IHN1cHBvcnRzIG5hdGl2ZSBwYXRocycsIG51bGwsIEVycm9yRGVzdGluYXRpb24uVGVsZW1ldHJ5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBpbml0aWFsaXplUmVzcG9uc2UgPSA8RGVidWdQcm90b2NvbC5Jbml0aWFsaXplUmVzcG9uc2U+IHJlc3BvbnNlO1xuXHRcdFx0XHRcdGluaXRpYWxpemVSZXNwb25zZS5ib2R5ID0ge307XG5cdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplUmVxdWVzdChpbml0aWFsaXplUmVzcG9uc2UsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnbGF1bmNoJykge1xuXHRcdFx0XHR0aGlzLmxhdW5jaFJlcXVlc3QoPERlYnVnUHJvdG9jb2wuTGF1bmNoUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnYXR0YWNoJykge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFJlcXVlc3QoPERlYnVnUHJvdG9jb2wuQXR0YWNoUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnZGlzY29ubmVjdCcpIHtcblx0XHRcdFx0dGhpcy5kaXNjb25uZWN0UmVxdWVzdCg8RGVidWdQcm90b2NvbC5EaXNjb25uZWN0UmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAndGVybWluYXRlJykge1xuXHRcdFx0XHR0aGlzLnRlcm1pbmF0ZVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuVGVybWluYXRlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAncmVzdGFydCcpIHtcblx0XHRcdFx0dGhpcy5yZXN0YXJ0UmVxdWVzdCg8RGVidWdQcm90b2NvbC5SZXN0YXJ0UmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc2V0QnJlYWtwb2ludHMnKSB7XG5cdFx0XHRcdHRoaXMuc2V0QnJlYWtQb2ludHNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlNldEJyZWFrcG9pbnRzUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc2V0RnVuY3Rpb25CcmVha3BvaW50cycpIHtcblx0XHRcdFx0dGhpcy5zZXRGdW5jdGlvbkJyZWFrUG9pbnRzUmVxdWVzdCg8RGVidWdQcm90b2NvbC5TZXRGdW5jdGlvbkJyZWFrcG9pbnRzUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc2V0RXhjZXB0aW9uQnJlYWtwb2ludHMnKSB7XG5cdFx0XHRcdHRoaXMuc2V0RXhjZXB0aW9uQnJlYWtQb2ludHNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlNldEV4Y2VwdGlvbkJyZWFrcG9pbnRzUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnY29uZmlndXJhdGlvbkRvbmUnKSB7XG5cdFx0XHRcdHRoaXMuY29uZmlndXJhdGlvbkRvbmVSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLkNvbmZpZ3VyYXRpb25Eb25lUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnY29udGludWUnKSB7XG5cdFx0XHRcdHRoaXMuY29udGludWVSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLkNvbnRpbnVlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnbmV4dCcpIHtcblx0XHRcdFx0dGhpcy5uZXh0UmVxdWVzdCg8RGVidWdQcm90b2NvbC5OZXh0UmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc3RlcEluJykge1xuXHRcdFx0XHR0aGlzLnN0ZXBJblJlcXVlc3QoPERlYnVnUHJvdG9jb2wuU3RlcEluUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc3RlcE91dCcpIHtcblx0XHRcdFx0dGhpcy5zdGVwT3V0UmVxdWVzdCg8RGVidWdQcm90b2NvbC5TdGVwT3V0UmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc3RlcEJhY2snKSB7XG5cdFx0XHRcdHRoaXMuc3RlcEJhY2tSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlN0ZXBCYWNrUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAncmV2ZXJzZUNvbnRpbnVlJykge1xuXHRcdFx0XHR0aGlzLnJldmVyc2VDb250aW51ZVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuUmV2ZXJzZUNvbnRpbnVlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAncmVzdGFydEZyYW1lJykge1xuXHRcdFx0XHR0aGlzLnJlc3RhcnRGcmFtZVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuUmVzdGFydEZyYW1lUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnZ290bycpIHtcblx0XHRcdFx0dGhpcy5nb3RvUmVxdWVzdCg8RGVidWdQcm90b2NvbC5Hb3RvUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAncGF1c2UnKSB7XG5cdFx0XHRcdHRoaXMucGF1c2VSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlBhdXNlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc3RhY2tUcmFjZScpIHtcblx0XHRcdFx0dGhpcy5zdGFja1RyYWNlUmVxdWVzdCg8RGVidWdQcm90b2NvbC5TdGFja1RyYWNlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc2NvcGVzJykge1xuXHRcdFx0XHR0aGlzLnNjb3Blc1JlcXVlc3QoPERlYnVnUHJvdG9jb2wuU2NvcGVzUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAndmFyaWFibGVzJykge1xuXHRcdFx0XHR0aGlzLnZhcmlhYmxlc1JlcXVlc3QoPERlYnVnUHJvdG9jb2wuVmFyaWFibGVzUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc2V0VmFyaWFibGUnKSB7XG5cdFx0XHRcdHRoaXMuc2V0VmFyaWFibGVSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlNldFZhcmlhYmxlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc2V0RXhwcmVzc2lvbicpIHtcblx0XHRcdFx0dGhpcy5zZXRFeHByZXNzaW9uUmVxdWVzdCg8RGVidWdQcm90b2NvbC5TZXRFeHByZXNzaW9uUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAnc291cmNlJykge1xuXHRcdFx0XHR0aGlzLnNvdXJjZVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuU291cmNlUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5jb21tYW5kID09PSAndGhyZWFkcycpIHtcblx0XHRcdFx0dGhpcy50aHJlYWRzUmVxdWVzdCg8RGVidWdQcm90b2NvbC5UaHJlYWRzUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICd0ZXJtaW5hdGVUaHJlYWRzJykge1xuXHRcdFx0XHR0aGlzLnRlcm1pbmF0ZVRocmVhZHNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlRlcm1pbmF0ZVRocmVhZHNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdldmFsdWF0ZScpIHtcblx0XHRcdFx0dGhpcy5ldmFsdWF0ZVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuRXZhbHVhdGVSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdzdGVwSW5UYXJnZXRzJykge1xuXHRcdFx0XHR0aGlzLnN0ZXBJblRhcmdldHNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlN0ZXBJblRhcmdldHNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdnb3RvVGFyZ2V0cycpIHtcblx0XHRcdFx0dGhpcy5nb3RvVGFyZ2V0c1JlcXVlc3QoPERlYnVnUHJvdG9jb2wuR290b1RhcmdldHNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdjb21wbGV0aW9ucycpIHtcblx0XHRcdFx0dGhpcy5jb21wbGV0aW9uc1JlcXVlc3QoPERlYnVnUHJvdG9jb2wuQ29tcGxldGlvbnNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdleGNlcHRpb25JbmZvJykge1xuXHRcdFx0XHR0aGlzLmV4Y2VwdGlvbkluZm9SZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLkV4Y2VwdGlvbkluZm9SZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdsb2FkZWRTb3VyY2VzJykge1xuXHRcdFx0XHR0aGlzLmxvYWRlZFNvdXJjZXNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLkxvYWRlZFNvdXJjZXNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdkYXRhQnJlYWtwb2ludEluZm8nKSB7XG5cdFx0XHRcdHRoaXMuZGF0YUJyZWFrcG9pbnRJbmZvUmVxdWVzdCg8RGVidWdQcm90b2NvbC5EYXRhQnJlYWtwb2ludEluZm9SZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdzZXREYXRhQnJlYWtwb2ludHMnKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0YUJyZWFrcG9pbnRzUmVxdWVzdCg8RGVidWdQcm90b2NvbC5TZXREYXRhQnJlYWtwb2ludHNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdyZWFkTWVtb3J5Jykge1xuXHRcdFx0XHR0aGlzLnJlYWRNZW1vcnlSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlJlYWRNZW1vcnlSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICd3cml0ZU1lbW9yeScpIHtcblx0XHRcdFx0dGhpcy53cml0ZU1lbW9yeVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuV3JpdGVNZW1vcnlSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdkaXNhc3NlbWJsZScpIHtcblx0XHRcdFx0dGhpcy5kaXNhc3NlbWJsZVJlcXVlc3QoPERlYnVnUHJvdG9jb2wuRGlzYXNzZW1ibGVSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdjYW5jZWwnKSB7XG5cdFx0XHRcdHRoaXMuY2FuY2VsUmVxdWVzdCg8RGVidWdQcm90b2NvbC5DYW5jZWxSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdicmVha3BvaW50TG9jYXRpb25zJykge1xuXHRcdFx0XHR0aGlzLmJyZWFrcG9pbnRMb2NhdGlvbnNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLkJyZWFrcG9pbnRMb2NhdGlvbnNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdzZXRJbnN0cnVjdGlvbkJyZWFrcG9pbnRzJykge1xuXHRcdFx0XHR0aGlzLnNldEluc3RydWN0aW9uQnJlYWtwb2ludHNSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlNldEluc3RydWN0aW9uQnJlYWtwb2ludHNSZXNwb25zZT4gcmVzcG9uc2UsIHJlcXVlc3QuYXJndW1lbnRzLCByZXF1ZXN0KTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jdXN0b21SZXF1ZXN0KHJlcXVlc3QuY29tbWFuZCwgPERlYnVnUHJvdG9jb2wuUmVzcG9uc2U+IHJlc3BvbnNlLCByZXF1ZXN0LmFyZ3VtZW50cywgcmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhpcy5zZW5kRXJyb3JSZXNwb25zZShyZXNwb25zZSwgMTEwNCwgJ3tfc3RhY2t9JywgeyBfZXhjZXB0aW9uOiBlLm1lc3NhZ2UsIF9zdGFjazogZS5zdGFjayB9LCBFcnJvckRlc3RpbmF0aW9uLlRlbGVtZXRyeSk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIGluaXRpYWxpemVSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkluaXRpYWxpemVSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5Jbml0aWFsaXplUmVxdWVzdEFyZ3VtZW50cyk6IHZvaWQge1xuXG5cdFx0Ly8gVGhpcyBkZWZhdWx0IGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCBjb25kaXRpb25hbCBicmVha3BvaW50cy5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzQ29uZGl0aW9uYWxCcmVha3BvaW50cyA9IGZhbHNlO1xuXG5cdFx0Ly8gVGhpcyBkZWZhdWx0IGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCBoaXQgY29uZGl0aW9uYWwgYnJlYWtwb2ludHMuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0hpdENvbmRpdGlvbmFsQnJlYWtwb2ludHMgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVmYXVsdCBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgZnVuY3Rpb24gYnJlYWtwb2ludHMuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0Z1bmN0aW9uQnJlYWtwb2ludHMgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVmYXVsdCBkZWJ1ZyBhZGFwdGVyIGltcGxlbWVudHMgdGhlICdjb25maWd1cmF0aW9uRG9uZScgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzQ29uZmlndXJhdGlvbkRvbmVSZXF1ZXN0ID0gdHJ1ZTtcblxuXHRcdC8vIFRoaXMgZGVmYXVsdCBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgaG92ZXJzIGJhc2VkIG9uIHRoZSAnZXZhbHVhdGUnIHJlcXVlc3QuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0V2YWx1YXRlRm9ySG92ZXJzID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlZmF1bHQgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnc3RlcEJhY2snIHJlcXVlc3QuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c1N0ZXBCYWNrID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlZmF1bHQgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnc2V0VmFyaWFibGUnIHJlcXVlc3QuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c1NldFZhcmlhYmxlID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlZmF1bHQgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAncmVzdGFydEZyYW1lJyByZXF1ZXN0LlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNSZXN0YXJ0RnJhbWUgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVmYXVsdCBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgdGhlICdzdGVwSW5UYXJnZXRzJyByZXF1ZXN0LlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNTdGVwSW5UYXJnZXRzUmVxdWVzdCA9IGZhbHNlO1xuXG5cdFx0Ly8gVGhpcyBkZWZhdWx0IGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgJ2dvdG9UYXJnZXRzJyByZXF1ZXN0LlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNHb3RvVGFyZ2V0c1JlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVmYXVsdCBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgdGhlICdjb21wbGV0aW9ucycgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzQ29tcGxldGlvbnNSZXF1ZXN0ID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlZmF1bHQgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAncmVzdGFydCcgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzUmVzdGFydFJlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVmYXVsdCBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgdGhlICdleGNlcHRpb25PcHRpb25zJyBhdHRyaWJ1dGUgb24gdGhlICdzZXRFeGNlcHRpb25CcmVha3BvaW50cycgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzRXhjZXB0aW9uT3B0aW9ucyA9IGZhbHNlO1xuXG5cdFx0Ly8gVGhpcyBkZWZhdWx0IGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgJ2Zvcm1hdCcgYXR0cmlidXRlIG9uIHRoZSAndmFyaWFibGVzJywgJ2V2YWx1YXRlJywgYW5kICdzdGFja1RyYWNlJyByZXF1ZXN0LlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNWYWx1ZUZvcm1hdHRpbmdPcHRpb25zID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgJ2V4Y2VwdGlvbkluZm8nIHJlcXVlc3QuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0V4Y2VwdGlvbkluZm9SZXF1ZXN0ID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgJ1Rlcm1pbmF0ZURlYnVnZ2VlJyBhdHRyaWJ1dGUgb24gdGhlICdkaXNjb25uZWN0JyByZXF1ZXN0LlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydFRlcm1pbmF0ZURlYnVnZ2VlID0gZmFsc2U7XG5cblx0XHQvLyBUaGlzIGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCBkZWxheWVkIGxvYWRpbmcgb2Ygc3RhY2sgZnJhbWVzLlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNEZWxheWVkU3RhY2tUcmFjZUxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnbG9hZGVkU291cmNlcycgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzTG9hZGVkU291cmNlc1JlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnbG9nTWVzc2FnZScgYXR0cmlidXRlIG9mIHRoZSBTb3VyY2VCcmVha3BvaW50LlxuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNMb2dQb2ludHMgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAndGVybWluYXRlVGhyZWFkcycgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzVGVybWluYXRlVGhyZWFkc1JlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnc2V0RXhwcmVzc2lvbicgcmVxdWVzdC5cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzU2V0RXhwcmVzc2lvbiA9IGZhbHNlO1xuXG5cdFx0Ly8gVGhpcyBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgdGhlICd0ZXJtaW5hdGUnIHJlcXVlc3QuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c1Rlcm1pbmF0ZVJlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8vIFRoaXMgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IGRhdGEgYnJlYWtwb2ludHMuXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0RhdGFCcmVha3BvaW50cyA9IGZhbHNlO1xuXG5cdFx0LyoqIFRoaXMgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAncmVhZE1lbW9yeScgcmVxdWVzdC4gKi9cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzUmVhZE1lbW9yeVJlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8qKiBUaGUgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnZGlzYXNzZW1ibGUnIHJlcXVlc3QuICovXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0Rpc2Fzc2VtYmxlUmVxdWVzdCA9IGZhbHNlO1xuXG5cdFx0LyoqIFRoZSBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgdGhlICdjYW5jZWwnIHJlcXVlc3QuICovXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0NhbmNlbFJlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8qKiBUaGUgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnYnJlYWtwb2ludExvY2F0aW9ucycgcmVxdWVzdC4gKi9cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzQnJlYWtwb2ludExvY2F0aW9uc1JlcXVlc3QgPSBmYWxzZTtcblxuXHRcdC8qKiBUaGUgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSAnY2xpcGJvYXJkJyBjb250ZXh0IHZhbHVlIGluIHRoZSAnZXZhbHVhdGUnIHJlcXVlc3QuICovXG5cdFx0cmVzcG9uc2UuYm9keS5zdXBwb3J0c0NsaXBib2FyZENvbnRleHQgPSBmYWxzZTtcblxuXHRcdC8qKiBUaGUgZGVidWcgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHN0ZXBwaW5nIGdyYW51bGFyaXRpZXMgZm9yIHRoZSBzdGVwcGluZyByZXF1ZXN0cy4gKi9cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzU3RlcHBpbmdHcmFudWxhcml0eSA9IGZhbHNlO1xuXG5cdFx0LyoqIFRoZSBkZWJ1ZyBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgdGhlICdzZXRJbnN0cnVjdGlvbkJyZWFrcG9pbnRzJyByZXF1ZXN0LiAqL1xuXHRcdHJlc3BvbnNlLmJvZHkuc3VwcG9ydHNJbnN0cnVjdGlvbkJyZWFrcG9pbnRzID0gZmFsc2U7XG5cblx0XHQvKiogVGhlIGRlYnVnIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCAnZmlsdGVyT3B0aW9ucycgb24gdGhlICdzZXRFeGNlcHRpb25CcmVha3BvaW50cycgcmVxdWVzdC4gKi9cblx0XHRyZXNwb25zZS5ib2R5LnN1cHBvcnRzRXhjZXB0aW9uRmlsdGVyT3B0aW9ucyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGRpc2Nvbm5lY3RSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkRpc2Nvbm5lY3RSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5EaXNjb25uZWN0QXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHRcdHRoaXMuc2h1dGRvd24oKTtcblx0fVxuXG5cdHByb3RlY3RlZCBsYXVuY2hSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkxhdW5jaFJlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLkxhdW5jaFJlcXVlc3RBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgYXR0YWNoUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5BdHRhY2hSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5BdHRhY2hSZXF1ZXN0QXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHRlcm1pbmF0ZVJlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuVGVybWluYXRlUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuVGVybWluYXRlQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlc3RhcnRSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlJlc3RhcnRSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5SZXN0YXJ0QXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHNldEJyZWFrUG9pbnRzUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5TZXRCcmVha3BvaW50c1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlNldEJyZWFrcG9pbnRzQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHNldEZ1bmN0aW9uQnJlYWtQb2ludHNSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlNldEZ1bmN0aW9uQnJlYWtwb2ludHNSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5TZXRGdW5jdGlvbkJyZWFrcG9pbnRzQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHNldEV4Y2VwdGlvbkJyZWFrUG9pbnRzUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5TZXRFeGNlcHRpb25CcmVha3BvaW50c1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlNldEV4Y2VwdGlvbkJyZWFrcG9pbnRzQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGNvbmZpZ3VyYXRpb25Eb25lUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5Db25maWd1cmF0aW9uRG9uZVJlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLkNvbmZpZ3VyYXRpb25Eb25lQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGNvbnRpbnVlUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5Db250aW51ZVJlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLkNvbnRpbnVlQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KSA6IHZvaWQge1xuXHRcdHRoaXMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0fVxuXG5cdHByb3RlY3RlZCBuZXh0UmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5OZXh0UmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuTmV4dEFyZ3VtZW50cywgcmVxdWVzdD86IERlYnVnUHJvdG9jb2wuUmVxdWVzdCkgOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc3RlcEluUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5TdGVwSW5SZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5TdGVwSW5Bcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpIDogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHN0ZXBPdXRSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlN0ZXBPdXRSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5TdGVwT3V0QXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KSA6IHZvaWQge1xuXHRcdHRoaXMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0fVxuXG5cdHByb3RlY3RlZCBzdGVwQmFja1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuU3RlcEJhY2tSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5TdGVwQmFja0FyZ3VtZW50cywgcmVxdWVzdD86IERlYnVnUHJvdG9jb2wuUmVxdWVzdCkgOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmV2ZXJzZUNvbnRpbnVlUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5SZXZlcnNlQ29udGludWVSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5SZXZlcnNlQ29udGludWVBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpIDogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlc3RhcnRGcmFtZVJlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUmVzdGFydEZyYW1lUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuUmVzdGFydEZyYW1lQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KSA6IHZvaWQge1xuXHRcdHRoaXMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0fVxuXG5cdHByb3RlY3RlZCBnb3RvUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5Hb3RvUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuR290b0FyZ3VtZW50cywgcmVxdWVzdD86IERlYnVnUHJvdG9jb2wuUmVxdWVzdCkgOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcGF1c2VSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlBhdXNlUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuUGF1c2VBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpIDogdm9pZCB7XG5cdFx0dGhpcy5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHNvdXJjZVJlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuU291cmNlUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuU291cmNlQXJndW1lbnRzLCByZXF1ZXN0PzogRGVidWdQcm90b2NvbC5SZXF1ZXN0KSA6IHZvaWQge1xuXHRcdHRoaXMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcblx0fVxuXG5cdHByb3RlY3RlZCB0aHJlYWRzUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5UaHJlYWRzUmVzcG9uc2UsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgdGVybWluYXRlVGhyZWFkc1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuVGVybWluYXRlVGhyZWFkc1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlRlcm1pbmF0ZVRocmVhZHNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc3RhY2tUcmFjZVJlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuU3RhY2tUcmFjZVJlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlN0YWNrVHJhY2VBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2NvcGVzUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5TY29wZXNSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5TY29wZXNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgdmFyaWFibGVzUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5WYXJpYWJsZXNSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5WYXJpYWJsZXNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0VmFyaWFibGVSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlNldFZhcmlhYmxlUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuU2V0VmFyaWFibGVBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0RXhwcmVzc2lvblJlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuU2V0RXhwcmVzc2lvblJlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlNldEV4cHJlc3Npb25Bcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZXZhbHVhdGVSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkV2YWx1YXRlUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuRXZhbHVhdGVBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc3RlcEluVGFyZ2V0c1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuU3RlcEluVGFyZ2V0c1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlN0ZXBJblRhcmdldHNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ290b1RhcmdldHNSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkdvdG9UYXJnZXRzUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuR290b1RhcmdldHNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgY29tcGxldGlvbnNSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkNvbXBsZXRpb25zUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuQ29tcGxldGlvbnNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZXhjZXB0aW9uSW5mb1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuRXhjZXB0aW9uSW5mb1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLkV4Y2VwdGlvbkluZm9Bcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgbG9hZGVkU291cmNlc1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuTG9hZGVkU291cmNlc1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLkxvYWRlZFNvdXJjZXNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZGF0YUJyZWFrcG9pbnRJbmZvUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5EYXRhQnJlYWtwb2ludEluZm9SZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5EYXRhQnJlYWtwb2ludEluZm9Bcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0RGF0YUJyZWFrcG9pbnRzUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5TZXREYXRhQnJlYWtwb2ludHNSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5TZXREYXRhQnJlYWtwb2ludHNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVhZE1lbW9yeVJlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUmVhZE1lbW9yeVJlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlJlYWRNZW1vcnlBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgd3JpdGVNZW1vcnlSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLldyaXRlTWVtb3J5UmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuV3JpdGVNZW1vcnlBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZGlzYXNzZW1ibGVSZXF1ZXN0KHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLkRpc2Fzc2VtYmxlUmVzcG9uc2UsIGFyZ3M6IERlYnVnUHJvdG9jb2wuRGlzYXNzZW1ibGVBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgY2FuY2VsUmVxdWVzdChyZXNwb25zZTogRGVidWdQcm90b2NvbC5DYW5jZWxSZXNwb25zZSwgYXJnczogRGVidWdQcm90b2NvbC5DYW5jZWxBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgYnJlYWtwb2ludExvY2F0aW9uc1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuQnJlYWtwb2ludExvY2F0aW9uc1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLkJyZWFrcG9pbnRMb2NhdGlvbnNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0SW5zdHJ1Y3Rpb25CcmVha3BvaW50c1JlcXVlc3QocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuU2V0SW5zdHJ1Y3Rpb25CcmVha3BvaW50c1Jlc3BvbnNlLCBhcmdzOiBEZWJ1Z1Byb3RvY29sLlNldEluc3RydWN0aW9uQnJlYWtwb2ludHNBcmd1bWVudHMsIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRSZXNwb25zZShyZXNwb25zZSk7XG5cdH1cblxuXHQvKipcblx0ICogT3ZlcnJpZGUgdGhpcyBob29rIHRvIGltcGxlbWVudCBjdXN0b20gcmVxdWVzdHMuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgY3VzdG9tUmVxdWVzdChjb21tYW5kOiBzdHJpbmcsIHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlJlc3BvbnNlLCBhcmdzOiBhbnksIHJlcXVlc3Q/OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHR0aGlzLnNlbmRFcnJvclJlc3BvbnNlKHJlc3BvbnNlLCAxMDE0LCAndW5yZWNvZ25pemVkIHJlcXVlc3QnLCBudWxsLCBFcnJvckRlc3RpbmF0aW9uLlRlbGVtZXRyeSk7XG5cdH1cblxuXHQvLy0tLS0gcHJvdGVjdGVkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRwcm90ZWN0ZWQgY29udmVydENsaWVudExpbmVUb0RlYnVnZ2VyKGxpbmU6IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKHRoaXMuX2RlYnVnZ2VyTGluZXNTdGFydEF0MSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NsaWVudExpbmVzU3RhcnRBdDEgPyBsaW5lIDogbGluZSArIDE7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9jbGllbnRMaW5lc1N0YXJ0QXQxID8gbGluZSAtIDEgOiBsaW5lO1xuXHR9XG5cblx0cHJvdGVjdGVkIGNvbnZlcnREZWJ1Z2dlckxpbmVUb0NsaWVudChsaW5lOiBudW1iZXIpOiBudW1iZXIge1xuXHRcdGlmICh0aGlzLl9kZWJ1Z2dlckxpbmVzU3RhcnRBdDEpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jbGllbnRMaW5lc1N0YXJ0QXQxID8gbGluZSA6IGxpbmUgLSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fY2xpZW50TGluZXNTdGFydEF0MSA/IGxpbmUgKyAxIDogbGluZTtcblx0fVxuXG5cdHByb3RlY3RlZCBjb252ZXJ0Q2xpZW50Q29sdW1uVG9EZWJ1Z2dlcihjb2x1bW46IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKHRoaXMuX2RlYnVnZ2VyQ29sdW1uc1N0YXJ0QXQxKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2xpZW50Q29sdW1uc1N0YXJ0QXQxID8gY29sdW1uIDogY29sdW1uICsgMTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2NsaWVudENvbHVtbnNTdGFydEF0MSA/IGNvbHVtbiAtIDEgOiBjb2x1bW47XG5cdH1cblxuXHRwcm90ZWN0ZWQgY29udmVydERlYnVnZ2VyQ29sdW1uVG9DbGllbnQoY29sdW1uOiBudW1iZXIpOiBudW1iZXIge1xuXHRcdGlmICh0aGlzLl9kZWJ1Z2dlckNvbHVtbnNTdGFydEF0MSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NsaWVudENvbHVtbnNTdGFydEF0MSA/IGNvbHVtbiA6IGNvbHVtbiAtIDE7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9jbGllbnRDb2x1bW5zU3RhcnRBdDEgPyBjb2x1bW4gKyAxIDogY29sdW1uO1xuXHR9XG5cblx0cHJvdGVjdGVkIGNvbnZlcnRDbGllbnRQYXRoVG9EZWJ1Z2dlcihjbGllbnRQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmICh0aGlzLl9jbGllbnRQYXRoc0FyZVVSSXMgIT09IHRoaXMuX2RlYnVnZ2VyUGF0aHNBcmVVUklzKSB7XG5cdFx0XHRpZiAodGhpcy5fY2xpZW50UGF0aHNBcmVVUklzKSB7XG5cdFx0XHRcdHJldHVybiBEZWJ1Z1Nlc3Npb24udXJpMnBhdGgoY2xpZW50UGF0aCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gRGVidWdTZXNzaW9uLnBhdGgydXJpKGNsaWVudFBhdGgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2xpZW50UGF0aDtcblx0fVxuXG5cdHByb3RlY3RlZCBjb252ZXJ0RGVidWdnZXJQYXRoVG9DbGllbnQoZGVidWdnZXJQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmICh0aGlzLl9kZWJ1Z2dlclBhdGhzQXJlVVJJcyAhPT0gdGhpcy5fY2xpZW50UGF0aHNBcmVVUklzKSB7XG5cdFx0XHRpZiAodGhpcy5fZGVidWdnZXJQYXRoc0FyZVVSSXMpIHtcblx0XHRcdFx0cmV0dXJuIERlYnVnU2Vzc2lvbi51cmkycGF0aChkZWJ1Z2dlclBhdGgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIERlYnVnU2Vzc2lvbi5wYXRoMnVyaShkZWJ1Z2dlclBhdGgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVidWdnZXJQYXRoO1xuXHR9XG5cblx0Ly8tLS0tIHByaXZhdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdHByaXZhdGUgc3RhdGljIHBhdGgydXJpKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG5cblx0XHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdFx0aWYgKC9eW0EtWl06Ly50ZXN0KHBhdGgpKSB7XG5cdFx0XHRcdHBhdGggPSBwYXRoWzBdLnRvTG93ZXJDYXNlKCkgKyBwYXRoLnN1YnN0cigxKTtcblx0XHRcdH1cblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcblx0XHR9XG5cdFx0cGF0aCA9IGVuY29kZVVSSShwYXRoKTtcblxuXHRcdGxldCB1cmkgPSBuZXcgVVJMKGBmaWxlOmApO1x0Ly8gaWdub3JlICdwYXRoJyBmb3Igbm93XG5cdFx0dXJpLnBhdGhuYW1lID0gcGF0aDtcdC8vIG5vdyB1c2UgJ3BhdGgnIHRvIGdldCB0aGUgY29ycmVjdCBwZXJjZW50IGVuY29kaW5nIChzZWUgaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnKVxuXHRcdHJldHVybiB1cmkudG9TdHJpbmcoKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIHVyaTJwYXRoKHNvdXJjZVVyaTogc3RyaW5nKTogc3RyaW5nIHtcblxuXHRcdGxldCB1cmkgPSBuZXcgVVJMKHNvdXJjZVVyaSk7XG5cdFx0bGV0IHMgPSBkZWNvZGVVUklDb21wb25lbnQodXJpLnBhdGhuYW1lKTtcblx0XHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdFx0aWYgKC9eXFwvW2EtekEtWl06Ly50ZXN0KHMpKSB7XG5cdFx0XHRcdHMgPSBzWzFdLnRvTG93ZXJDYXNlKCkgKyBzLnN1YnN0cigyKTtcblx0XHRcdH1cblx0XHRcdHMgPSBzLnJlcGxhY2UoL1xcLy9nLCAnXFxcXCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gcztcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIF9mb3JtYXRQSUlSZWdleHAgPSAveyhbXn1dKyl9L2c7XG5cblx0Lypcblx0KiBJZiBhcmd1bWVudCBzdGFydHMgd2l0aCAnXycgaXQgaXMgT0sgdG8gc2VuZCBpdHMgdmFsdWUgdG8gdGVsZW1ldHJ5LlxuXHQqL1xuXHRwcml2YXRlIHN0YXRpYyBmb3JtYXRQSUkoZm9ybWF0OnN0cmluZywgZXhjbHVkZVBJSTogYm9vbGVhbiwgYXJnczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBzdHJpbmcge1xuXHRcdHJldHVybiBmb3JtYXQucmVwbGFjZShEZWJ1Z1Nlc3Npb24uX2Zvcm1hdFBJSVJlZ2V4cCwgZnVuY3Rpb24obWF0Y2gsIHBhcmFtTmFtZSkge1xuXHRcdFx0aWYgKGV4Y2x1ZGVQSUkgJiYgcGFyYW1OYW1lLmxlbmd0aCA+IDAgJiYgcGFyYW1OYW1lWzBdICE9PSAnXycpIHtcblx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGFyZ3NbcGFyYW1OYW1lXSAmJiBhcmdzLmhhc093blByb3BlcnR5KHBhcmFtTmFtZSkgP1xuXHRcdFx0XHRhcmdzW3BhcmFtTmFtZV0gOlxuXHRcdFx0XHRtYXRjaDtcblx0XHR9KVxuXHR9XG59XG4iXX0=

/***/ }),

/***/ 527:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Handles = void 0;
class Handles {
    constructor(startHandle) {
        this.START_HANDLE = 1000;
        this._handleMap = new Map();
        this._nextHandle = typeof startHandle === 'number' ? startHandle : this.START_HANDLE;
    }
    reset() {
        this._nextHandle = this.START_HANDLE;
        this._handleMap = new Map();
    }
    create(value) {
        var handle = this._nextHandle++;
        this._handleMap.set(handle, value);
        return handle;
    }
    get(handle, dflt) {
        return this._handleMap.get(handle) || dflt;
    }
}
exports.Handles = Handles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oYW5kbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O2dHQUdnRzs7O0FBRWhHLE1BQWEsT0FBTztJQU9uQixZQUFtQixXQUFvQjtRQUwvQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUdwQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWEsQ0FBQztRQUd6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3RGLENBQUM7SUFFTSxLQUFLO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWEsQ0FBQztJQUN4QyxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQVE7UUFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFFTSxHQUFHLENBQUMsTUFBYyxFQUFFLElBQVE7UUFDbEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDNUMsQ0FBQztDQUNEO0FBekJELDBCQXlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5leHBvcnQgY2xhc3MgSGFuZGxlczxUPiB7XG5cblx0cHJpdmF0ZSBTVEFSVF9IQU5ETEUgPSAxMDAwO1xuXG5cdHByaXZhdGUgX25leHRIYW5kbGUgOiBudW1iZXI7XG5cdHByaXZhdGUgX2hhbmRsZU1hcCA9IG5ldyBNYXA8bnVtYmVyLCBUPigpO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihzdGFydEhhbmRsZT86IG51bWJlcikge1xuXHRcdHRoaXMuX25leHRIYW5kbGUgPSB0eXBlb2Ygc3RhcnRIYW5kbGUgPT09ICdudW1iZXInID8gc3RhcnRIYW5kbGUgOiB0aGlzLlNUQVJUX0hBTkRMRTtcblx0fVxuXG5cdHB1YmxpYyByZXNldCgpOiB2b2lkIHtcblx0XHR0aGlzLl9uZXh0SGFuZGxlID0gdGhpcy5TVEFSVF9IQU5ETEU7XG5cdFx0dGhpcy5faGFuZGxlTWFwID0gbmV3IE1hcDxudW1iZXIsIFQ+KCk7XG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlKHZhbHVlOiBUKTogbnVtYmVyIHtcblx0XHR2YXIgaGFuZGxlID0gdGhpcy5fbmV4dEhhbmRsZSsrO1xuXHRcdHRoaXMuX2hhbmRsZU1hcC5zZXQoaGFuZGxlLCB2YWx1ZSk7XG5cdFx0cmV0dXJuIGhhbmRsZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQoaGFuZGxlOiBudW1iZXIsIGRmbHQ/OiBUKTogVCB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbmRsZU1hcC5nZXQoaGFuZGxlKSB8fCBkZmx0O1xuXHR9XG59XG4iXX0=

/***/ }),

/***/ 7309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalLogger = void 0;
const fs = __webpack_require__(7147);
const path = __webpack_require__(1017);
const logger_1 = __webpack_require__(4100);
/**
 * Manages logging, whether to console.log, file, or VS Code console.
 * Encapsulates the state specific to each logging session
 */
class InternalLogger {
    constructor(logCallback, isServer) {
        /** Dispose and allow exit to continue normally */
        this.beforeExitCallback = () => this.dispose();
        this._logCallback = logCallback;
        this._logToConsole = isServer;
        this._minLogLevel = logger_1.LogLevel.Warn;
        this.disposeCallback = (signal, code) => {
            this.dispose();
            // Exit with 128 + value of the signal code.
            // https://nodejs.org/api/process.html#process_exit_codes
            code = code || 2; // SIGINT
            code += 128;
            process.exit(code);
        };
    }
    async setup(options) {
        this._minLogLevel = options.consoleMinLogLevel;
        this._prependTimestamp = options.prependTimestamp;
        // Open a log file in the specified location. Overwritten on each run.
        if (options.logFilePath) {
            if (!path.isAbsolute(options.logFilePath)) {
                this.log(`logFilePath must be an absolute path: ${options.logFilePath}`, logger_1.LogLevel.Error);
            }
            else {
                const handleError = (err) => this.sendLog(`Error creating log file at path: ${options.logFilePath}. Error: ${err.toString()}\n`, logger_1.LogLevel.Error);
                try {
                    await fs.promises.mkdir(path.dirname(options.logFilePath), { recursive: true });
                    this.log(`Verbose logs are written to:\n`, logger_1.LogLevel.Warn);
                    this.log(options.logFilePath + '\n', logger_1.LogLevel.Warn);
                    this._logFileStream = fs.createWriteStream(options.logFilePath);
                    this.logDateTime();
                    this.setupShutdownListeners();
                    this._logFileStream.on('error', err => {
                        handleError(err);
                    });
                }
                catch (err) {
                    handleError(err);
                }
            }
        }
    }
    logDateTime() {
        let d = new Date();
        let dateString = d.getUTCFullYear() + '-' + `${d.getUTCMonth() + 1}` + '-' + d.getUTCDate();
        const timeAndDateStamp = dateString + ', ' + getFormattedTimeString();
        this.log(timeAndDateStamp + '\n', logger_1.LogLevel.Verbose, false);
    }
    setupShutdownListeners() {
        process.on('beforeExit', this.beforeExitCallback);
        process.on('SIGTERM', this.disposeCallback);
        process.on('SIGINT', this.disposeCallback);
    }
    removeShutdownListeners() {
        process.removeListener('beforeExit', this.beforeExitCallback);
        process.removeListener('SIGTERM', this.disposeCallback);
        process.removeListener('SIGINT', this.disposeCallback);
    }
    dispose() {
        return new Promise(resolve => {
            this.removeShutdownListeners();
            if (this._logFileStream) {
                this._logFileStream.end(resolve);
                this._logFileStream = null;
            }
            else {
                resolve();
            }
        });
    }
    log(msg, level, prependTimestamp = true) {
        if (this._minLogLevel === logger_1.LogLevel.Stop) {
            return;
        }
        if (level >= this._minLogLevel) {
            this.sendLog(msg, level);
        }
        if (this._logToConsole) {
            const logFn = level === logger_1.LogLevel.Error ? console.error :
                level === logger_1.LogLevel.Warn ? console.warn :
                    null;
            if (logFn) {
                logFn((0, logger_1.trimLastNewline)(msg));
            }
        }
        // If an error, prepend with '[Error]'
        if (level === logger_1.LogLevel.Error) {
            msg = `[${logger_1.LogLevel[level]}] ${msg}`;
        }
        if (this._prependTimestamp && prependTimestamp) {
            msg = '[' + getFormattedTimeString() + '] ' + msg;
        }
        if (this._logFileStream) {
            this._logFileStream.write(msg);
        }
    }
    sendLog(msg, level) {
        // Truncate long messages, they can hang VS Code
        if (msg.length > 1500) {
            const endsInNewline = !!msg.match(/(\n|\r\n)$/);
            msg = msg.substr(0, 1500) + '[...]';
            if (endsInNewline) {
                msg = msg + '\n';
            }
        }
        if (this._logCallback) {
            const event = new logger_1.LogOutputEvent(msg, level);
            this._logCallback(event);
        }
    }
}
exports.InternalLogger = InternalLogger;
function getFormattedTimeString() {
    let d = new Date();
    let hourString = _padZeroes(2, String(d.getUTCHours()));
    let minuteString = _padZeroes(2, String(d.getUTCMinutes()));
    let secondString = _padZeroes(2, String(d.getUTCSeconds()));
    let millisecondString = _padZeroes(3, String(d.getUTCMilliseconds()));
    return hourString + ':' + minuteString + ':' + secondString + '.' + millisecondString + ' UTC';
}
function _padZeroes(minDesiredLength, numberToPad) {
    if (numberToPad.length >= minDesiredLength) {
        return numberToPad;
    }
    else {
        return String('0'.repeat(minDesiredLength) + numberToPad).slice(-minDesiredLength);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxMb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW50ZXJuYWxMb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOzs7QUFFaEcseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUU3QixxQ0FBNEg7QUFFNUg7OztHQUdHO0FBQ0gsTUFBYSxjQUFjO0lBbUIxQixZQUFZLFdBQXlCLEVBQUUsUUFBa0I7UUFUekQsa0RBQWtEO1FBQzFDLHVCQUFrQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQVNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFRLENBQUMsSUFBSSxDQUFDO1FBRWxDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWYsNENBQTRDO1lBQzVDLHlEQUF5RDtZQUN6RCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQztZQUVaLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBK0I7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUVsRCxzRUFBc0U7UUFDdEUsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMs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QUFDO0lBQ3RFLE9BQU8sVUFBVSxHQUFHLEdBQUcsR0FBRyxZQUFZLEdBQUcsR0FBRyxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUcsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQ2hHLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxnQkFBd0IsRUFBRSxXQUFtQjtJQUNoRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksZ0JBQWdCLEVBQUU7UUFDM0MsT0FBTyxXQUFXLENBQUM7S0FDbkI7U0FBTTtRQUNOLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ25GO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBMb2dMZXZlbCwgSUxvZ0NhbGxiYWNrLCB0cmltTGFzdE5ld2xpbmUsIExvZ091dHB1dEV2ZW50LCBJSW50ZXJuYWxMb2dnZXJPcHRpb25zLCBJSW50ZXJuYWxMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XG5cbi8qKlxuICogTWFuYWdlcyBsb2dnaW5nLCB3aGV0aGVyIHRvIGNvbnNvbGUubG9nLCBmaWxlLCBvciBWUyBDb2RlIGNvbnNvbGUuXG4gKiBFbmNhcHN1bGF0ZXMgdGhlIHN0YXRlIHNwZWNpZmljIHRvIGVhY2ggbG9nZ2luZyBzZXNzaW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbExvZ2dlciBpbXBsZW1lbnRzIElJbnRlcm5hbExvZ2dlciB7XG5cdHByaXZhdGUgX21pbkxvZ0xldmVsOiBMb2dMZXZlbDtcblx0cHJpdmF0ZSBfbG9nVG9Db25zb2xlOiBib29sZWFuO1xuXG5cdC8qKiBMb2cgaW5mbyB0aGF0IG1lZXRzIG1pbkxvZ0xldmVsIGlzIHNlbnQgdG8gdGhpcyBjYWxsYmFjay4gKi9cblx0cHJpdmF0ZSBfbG9nQ2FsbGJhY2s6IElMb2dDYWxsYmFjaztcblxuXHQvKiogV3JpdGUgc3RlYW0gZm9yIGxvZyBmaWxlICovXG5cdHByaXZhdGUgX2xvZ0ZpbGVTdHJlYW06IGZzLldyaXRlU3RyZWFtO1xuXG5cdC8qKiBEaXNwb3NlIGFuZCBhbGxvdyBleGl0IHRvIGNvbnRpbnVlIG5vcm1hbGx5ICovXG5cdHByaXZhdGUgYmVmb3JlRXhpdENhbGxiYWNrID0gKCkgPT4gdGhpcy5kaXNwb3NlKCk7XG5cblx0LyoqIERpc3Bvc2UgYW5kIGV4aXQgKi9cblx0cHJpdmF0ZSBkaXNwb3NlQ2FsbGJhY2s7XG5cblx0LyoqIFdoZXRoZXIgdG8gYWRkIGEgdGltZXN0YW1wIHRvIG1lc3NhZ2VzIGluIHRoZSBsb2dmaWxlICovXG5cdHByaXZhdGUgX3ByZXBlbmRUaW1lc3RhbXA6IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IobG9nQ2FsbGJhY2s6IElMb2dDYWxsYmFjaywgaXNTZXJ2ZXI/OiBib29sZWFuKSB7XG5cdFx0dGhpcy5fbG9nQ2FsbGJhY2sgPSBsb2dDYWxsYmFjaztcblx0XHR0aGlzLl9sb2dUb0NvbnNvbGUgPSBpc1NlcnZlcjtcblxuXHRcdHRoaXMuX21pbkxvZ0xldmVsID0gTG9nTGV2ZWwuV2FybjtcblxuXHRcdHRoaXMuZGlzcG9zZUNhbGxiYWNrID0gKHNpZ25hbDogc3RyaW5nLCBjb2RlOiBudW1iZXIpID0+IHtcblx0XHRcdHRoaXMuZGlzcG9zZSgpO1xuXG5cdFx0XHQvLyBFeGl0IHdpdGggMTI4ICsgdmFsdWUgb2YgdGhlIHNpZ25hbCBjb2RlLlxuXHRcdFx0Ly8gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9wcm9jZXNzLmh0bWwjcHJvY2Vzc19leGl0X2NvZGVzXG5cdFx0XHRjb2RlID0gY29kZSB8fCAyOyAvLyBTSUdJTlRcblx0XHRcdGNvZGUgKz0gMTI4O1xuXG5cdFx0XHRwcm9jZXNzLmV4aXQoY29kZSk7XG5cdFx0fTtcblx0fVxuXG5cdHB1YmxpYyBhc3luYyBzZXR1cChvcHRpb25zOiBJSW50ZXJuYWxMb2dnZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbWluTG9nTGV2ZWwgPSBvcHRpb25zLmNvbnNvbGVNaW5Mb2dMZXZlbDtcblx0XHR0aGlzLl9wcmVwZW5kVGltZXN0YW1wID0gb3B0aW9ucy5wcmVwZW5kVGltZXN0YW1wO1xuXG5cdFx0Ly8gT3BlbiBhIGxvZyBmaWxlIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24uIE92ZXJ3cml0dGVuIG9uIGVhY2ggcnVuLlxuXHRcdGlmIChvcHRpb25zLmxvZ0ZpbGVQYXRoKSB7XG5cdFx0XHRpZiAoIXBhdGguaXNBYnNvbHV0ZShvcHRpb25zLmxvZ0ZpbGVQYXRoKSkge1xuXHRcdFx0XHR0aGlzLmxvZyhgbG9nRmlsZVBhdGggbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoOiAke29wdGlvbnMubG9nRmlsZVBhdGh9YCwgTG9nTGV2ZWwuRXJyb3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaGFuZGxlRXJyb3IgPSAoZXJyOiBFcnJvcikgPT4gdGhpcy5zZW5kTG9nKGBFcnJvciBjcmVhdGluZyBsb2cgZmlsZSBhdCBwYXRoOiAke29wdGlvbnMubG9nRmlsZVBhdGh9LiBFcnJvcjogJHtlcnIudG9TdHJpbmcoKX1cXG5gLCBMb2dMZXZlbC5FcnJvcik7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihwYXRoLmRpcm5hbWUob3B0aW9ucy5sb2dGaWxlUGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXHRcdFx0XHRcdHRoaXMubG9nKGBWZXJib3NlIGxvZ3MgYXJlIHdyaXR0ZW4gdG86XFxuYCwgTG9nTGV2ZWwuV2Fybik7XG5cdFx0XHRcdFx0dGhpcy5sb2cob3B0aW9ucy5sb2dGaWxlUGF0aCArICdcXG4nLCBMb2dMZXZlbC5XYXJuKTtcblxuXHRcdFx0XHRcdHRoaXMuX2xvZ0ZpbGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShvcHRpb25zLmxvZ0ZpbGVQYXRoKTtcblx0XHRcdFx0XHR0aGlzLmxvZ0RhdGVUaW1lKCk7XG5cdFx0XHRcdFx0dGhpcy5zZXR1cFNodXRkb3duTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0dGhpcy5fbG9nRmlsZVN0cmVhbS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0XHRcdFx0aGFuZGxlRXJyb3IoZXJyKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0aGFuZGxlRXJyb3IoZXJyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgbG9nRGF0ZVRpbWUoKTogdm9pZCB7XG5cdFx0bGV0IGQgPSBuZXcgRGF0ZSgpO1xuXHRcdGxldCBkYXRlU3RyaW5nID0gZC5nZXRVVENGdWxsWWVhcigpICsgJy0nICsgYCR7ZC5nZXRVVENNb250aCgpICsgMX1gICsgJy0nICsgZC5nZXRVVENEYXRlKCk7XG5cdFx0Y29uc3QgdGltZUFuZERhdGVTdGFtcCA9IGRhdGVTdHJpbmcgKyAnLCAnICsgZ2V0Rm9ybWF0dGVkVGltZVN0cmluZygpO1xuXHRcdHRoaXMubG9nKHRpbWVBbmREYXRlU3RhbXAgKyAnXFxuJywgTG9nTGV2ZWwuVmVyYm9zZSwgZmFsc2UpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXR1cFNodXRkb3duTGlzdGVuZXJzKCk6IHZvaWQge1xuXHRcdHByb2Nlc3Mub24oJ2JlZm9yZUV4aXQnLCB0aGlzLmJlZm9yZUV4aXRDYWxsYmFjayk7XG5cdFx0cHJvY2Vzcy5vbignU0lHVEVSTScsIHRoaXMuZGlzcG9zZUNhbGxiYWNrKTtcblx0XHRwcm9jZXNzLm9uKCdTSUdJTlQnLCB0aGlzLmRpc3Bvc2VDYWxsYmFjayk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVNodXRkb3duTGlzdGVuZXJzKCk6IHZvaWQge1xuXHRcdHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoJ2JlZm9yZUV4aXQnLCB0aGlzLmJlZm9yZUV4aXRDYWxsYmFjayk7XG5cdFx0cHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcignU0lHVEVSTScsIHRoaXMuZGlzcG9zZUNhbGxiYWNrKTtcblx0XHRwcm9jZXNzLnJlbW92ZUxpc3RlbmVyKCdTSUdJTlQnLCB0aGlzLmRpc3Bvc2VDYWxsYmFjayk7XG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHR0aGlzLnJlbW92ZVNodXRkb3duTGlzdGVuZXJzKCk7XG5cdFx0XHRpZiAodGhpcy5fbG9nRmlsZVN0cmVhbSkge1xuXHRcdFx0XHR0aGlzLl9sb2dGaWxlU3RyZWFtLmVuZChyZXNvbHZlKTtcblx0XHRcdFx0dGhpcy5fbG9nRmlsZVN0cmVhbSA9IG51bGw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgbG9nKG1zZzogc3RyaW5nLCBsZXZlbDogTG9nTGV2ZWwsIHByZXBlbmRUaW1lc3RhbXAgPSB0cnVlKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX21pbkxvZ0xldmVsID09PSBMb2dMZXZlbC5TdG9wKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGxldmVsID49IHRoaXMuX21pbkxvZ0xldmVsKSB7XG5cdFx0XHR0aGlzLnNlbmRMb2cobXNnLCBsZXZlbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2xvZ1RvQ29uc29sZSkge1xuXHRcdFx0Y29uc3QgbG9nRm4gPVxuXHRcdFx0XHRsZXZlbCA9PT0gTG9nTGV2ZWwuRXJyb3IgPyBjb25zb2xlLmVycm9yIDpcblx0XHRcdFx0bGV2ZWwgPT09IExvZ0xldmVsLldhcm4gPyBjb25zb2xlLndhcm4gOlxuXHRcdFx0XHRudWxsO1xuXG5cdFx0XHRpZiAobG9nRm4pIHtcblx0XHRcdFx0bG9nRm4odHJpbUxhc3ROZXdsaW5lKG1zZykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElmIGFuIGVycm9yLCBwcmVwZW5kIHdpdGggJ1tFcnJvcl0nXG5cdFx0aWYgKGxldmVsID09PSBMb2dMZXZlbC5FcnJvcikge1xuXHRcdFx0bXNnID0gYFske0xvZ0xldmVsW2xldmVsXX1dICR7bXNnfWA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3ByZXBlbmRUaW1lc3RhbXAgJiYgcHJlcGVuZFRpbWVzdGFtcCkge1xuXHRcdFx0bXNnID0gJ1snICsgZ2V0Rm9ybWF0dGVkVGltZVN0cmluZygpICsgJ10gJyArIG1zZztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fbG9nRmlsZVN0cmVhbSkge1xuXHRcdFx0dGhpcy5fbG9nRmlsZVN0cmVhbS53cml0ZShtc2cpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc2VuZExvZyhtc2c6IHN0cmluZywgbGV2ZWw6IExvZ0xldmVsKTogdm9pZCB7XG5cdFx0Ly8gVHJ1bmNhdGUgbG9uZyBtZXNzYWdlcywgdGhleSBjYW4gaGFuZyBWUyBDb2RlXG5cdFx0aWYgKG1zZy5sZW5ndGggPiAxNTAwKSB7XG5cdFx0XHRjb25zdCBlbmRzSW5OZXdsaW5lID0gISFtc2cubWF0Y2goLyhcXG58XFxyXFxuKSQvKTtcblx0XHRcdG1zZyA9IG1zZy5zdWJzdHIoMCwgMTUwMCkgKyAnWy4uLl0nO1xuXHRcdFx0aWYgKGVuZHNJbk5ld2xpbmUpIHtcblx0XHRcdFx0bXNnID0gbXNnICsgJ1xcbic7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2xvZ0NhbGxiYWNrKSB7XG5cdFx0XHRjb25zdCBldmVudCA9IG5ldyBMb2dPdXRwdXRFdmVudChtc2csIGxldmVsKTtcblx0XHRcdHRoaXMuX2xvZ0NhbGxiYWNrKGV2ZW50KTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkVGltZVN0cmluZygpOiBzdHJpbmcge1xuXHRsZXQgZCA9IG5ldyBEYXRlKCk7XG5cdGxldCBob3VyU3RyaW5nID0gX3BhZFplcm9lcygyLCBTdHJpbmcoZC5nZXRVVENIb3VycygpKSk7XG5cdGxldCBtaW51dGVTdHJpbmcgPSBfcGFkWmVyb2VzKDIsIFN0cmluZyhkLmdldFVUQ01pbnV0ZXMoKSkpO1xuXHRsZXQgc2Vjb25kU3RyaW5nID0gX3BhZFplcm9lcygyLCBTdHJpbmcoZC5nZXRVVENTZWNvbmRzKCkpKTtcblx0bGV0IG1pbGxpc2Vjb25kU3RyaW5nID0gX3BhZFplcm9lcygzLCBTdHJpbmcoZC5nZXRVVENNaWxsaXNlY29uZHMoKSkpO1xuXHRyZXR1cm4gaG91clN0cmluZyArICc6JyArIG1pbnV0ZVN0cmluZyArICc6JyArIHNlY29uZFN0cmluZyArICcuJyArIG1pbGxpc2Vjb25kU3RyaW5nICsgJyBVVEMnO1xufVxuXG5mdW5jdGlvbiBfcGFkWmVyb2VzKG1pbkRlc2lyZWRMZW5ndGg6IG51bWJlciwgbnVtYmVyVG9QYWQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChudW1iZXJUb1BhZC5sZW5ndGggPj0gbWluRGVzaXJlZExlbmd0aCkge1xuXHRcdHJldHVybiBudW1iZXJUb1BhZDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gU3RyaW5nKCcwJy5yZXBlYXQobWluRGVzaXJlZExlbmd0aCkgKyBudW1iZXJUb1BhZCkuc2xpY2UoLW1pbkRlc2lyZWRMZW5ndGgpO1xuXHR9XG59XG4iXX0=

/***/ }),

/***/ 4100:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.trimLastNewline = exports.LogOutputEvent = exports.logger = exports.Logger = exports.LogLevel = void 0;
const internalLogger_1 = __webpack_require__(7309);
const debugSession_1 = __webpack_require__(4651);
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
    LogLevel[LogLevel["Log"] = 1] = "Log";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Stop"] = 4] = "Stop";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    constructor() {
        this._pendingLogQ = [];
    }
    log(msg, level = LogLevel.Log) {
        msg = msg + '\n';
        this._write(msg, level);
    }
    verbose(msg) {
        this.log(msg, LogLevel.Verbose);
    }
    warn(msg) {
        this.log(msg, LogLevel.Warn);
    }
    error(msg) {
        this.log(msg, LogLevel.Error);
    }
    dispose() {
        if (this._currentLogger) {
            const disposeP = this._currentLogger.dispose();
            this._currentLogger = null;
            return disposeP;
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * `log` adds a newline, `write` doesn't
     */
    _write(msg, level = LogLevel.Log) {
        // [null, undefined] => string
        msg = msg + '';
        if (this._pendingLogQ) {
            this._pendingLogQ.push({ msg, level });
        }
        else if (this._currentLogger) {
            this._currentLogger.log(msg, level);
        }
    }
    /**
     * Set the logger's minimum level to log in the console, and whether to log to the file. Log messages are queued before this is
     * called the first time, because minLogLevel defaults to Warn.
     */
    setup(consoleMinLogLevel, _logFilePath, prependTimestamp = true) {
        const logFilePath = typeof _logFilePath === 'string' ?
            _logFilePath :
            (_logFilePath && this._logFilePathFromInit);
        if (this._currentLogger) {
            const options = {
                consoleMinLogLevel,
                logFilePath,
                prependTimestamp
            };
            this._currentLogger.setup(options).then(() => {
                // Now that we have a minimum logLevel, we can clear out the queue of pending messages
                if (this._pendingLogQ) {
                    const logQ = this._pendingLogQ;
                    this._pendingLogQ = null;
                    logQ.forEach(item => this._write(item.msg, item.level));
                }
            });
        }
    }
    init(logCallback, logFilePath, logToConsole) {
        // Re-init, create new global Logger
        this._pendingLogQ = this._pendingLogQ || [];
        this._currentLogger = new internalLogger_1.InternalLogger(logCallback, logToConsole);
        this._logFilePathFromInit = logFilePath;
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
class LogOutputEvent extends debugSession_1.OutputEvent {
    constructor(msg, level) {
        const category = level === LogLevel.Error ? 'stderr' :
            level === LogLevel.Warn ? 'console' :
                'stdout';
        super(msg, category);
    }
}
exports.LogOutputEvent = LogOutputEvent;
function trimLastNewline(str) {
    return str.replace(/(\n|\r\n)$/, '');
}
exports.trimLastNewline = trimLastNewline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OzREQUU0RDs7O0FBRTVELHFEQUFrRDtBQUNsRCxpREFBNkM7QUFFN0MsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ25CLDZDQUFXLENBQUE7SUFDWCxxQ0FBTyxDQUFBO0lBQ1AsdUNBQVEsQ0FBQTtJQUNSLHlDQUFTLENBQUE7SUFDVCx1Q0FBUSxDQUFBO0FBQ1QsQ0FBQyxFQU5XLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBTW5CO0FBNEJELE1BQWEsTUFBTTtJQUFuQjtRQUlTLGlCQUFZLEdBQWUsRUFBRSxDQUFDO0lBMkV2QyxDQUFDO0lBekVBLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHO1FBQ3BDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVztRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFXO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBVztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU87UUFDTixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixPQUFPLFFBQVEsQ0FBQztTQUNoQjthQUFNO1lBQ04sT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekI7SUFDRixDQUFDO0lBRUQ7O09BRUc7SUFDSyxNQUFNLENBQUMsR0FBVyxFQUFFLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRztRQUMvQyw4QkFBOEI7UUFDOUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2QzthQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEM7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGtCQUE0QixFQUFFLFlBQTZCLEVBQUUsbUJBQTRCLElBQUk7UUFDbEcsTUFBTSxXQUFXLEdBQUcsT0FBTyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDckQsWUFBWSxDQUFDLENBQUM7WUFDZCxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU3QyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsTUFBTSxPQUFPLEdBQUc7Z0JBQ2Ysa0JBQWtCO2dCQUNsQixXQUFXO2dCQUNYLGdCQUFnQjthQUNoQixDQUFDO1lBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDNUMsc0ZBQXNGO2dCQUN0RixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUN4RDtZQUNGLENBQUMsQ0FBQyxDQUFDO1NBRUg7SUFDRixDQUFDO0lBRUQsSUFBSSxDQUFDLFdBQXlCLEVBQUUsV0FBb0IsRUFBRSxZQUFzQjtRQUMzRSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0NBQ0Q7QUEvRUQsd0JBK0VDO0FBRVksUUFBQSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUVuQyxNQUFhLGNBQWUsU0FBUSwwQkFBVztJQUM5QyxZQUFZLEdBQVcsRUFBRSxLQUFlO1FBQ3ZDLE1BQU0sUUFBUSxHQUNiLEtBQUssS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLFFBQVEsQ0FBQztRQUNWLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBUkQsd0NBUUM7QUFFRCxTQUFnQixlQUFlLENBQUMsR0FBVztJQUMxQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFGRCwwQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKEMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBJbnRlcm5hbExvZ2dlciB9IGZyb20gJy4vaW50ZXJuYWxMb2dnZXInO1xuaW1wb3J0IHsgT3V0cHV0RXZlbnQgfSBmcm9tICcuL2RlYnVnU2Vzc2lvbic7XG5cbmV4cG9ydCBlbnVtIExvZ0xldmVsIHtcblx0VmVyYm9zZSA9IDAsXG5cdExvZyA9IDEsXG5cdFdhcm4gPSAyLFxuXHRFcnJvciA9IDMsXG5cdFN0b3AgPSA0XG59XG5cbmV4cG9ydCB0eXBlIElMb2dDYWxsYmFjayA9IChvdXRwdXRFdmVudDogT3V0cHV0RXZlbnQpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBJTG9nSXRlbSB7XG5cdG1zZzogc3RyaW5nO1xuXHRsZXZlbDogTG9nTGV2ZWw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XG5cdGxvZyhtc2c6IHN0cmluZywgbGV2ZWw/OiBMb2dMZXZlbCk6IHZvaWQ7XG5cdHZlcmJvc2UobXNnOiBzdHJpbmcpOiB2b2lkO1xuXHR3YXJuKG1zZzogc3RyaW5nKTogdm9pZDtcblx0ZXJyb3IobXNnOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElJbnRlcm5hbExvZ2dlciB7XG5cdGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPjtcblx0bG9nKG1zZzogc3RyaW5nLCBsZXZlbDogTG9nTGV2ZWwsIHByZXBlbmRUaW1lc3RhbXA/OiBib29sZWFuKSA6IHZvaWQ7XG5cdHNldHVwKG9wdGlvbnM6IElJbnRlcm5hbExvZ2dlck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElJbnRlcm5hbExvZ2dlck9wdGlvbnMge1xuXHRjb25zb2xlTWluTG9nTGV2ZWw6IExvZ0xldmVsO1xuXHRsb2dGaWxlUGF0aD86IHN0cmluZztcblx0cHJlcGVuZFRpbWVzdGFtcD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuXHRwcml2YXRlIF9sb2dGaWxlUGF0aEZyb21Jbml0OiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfY3VycmVudExvZ2dlcjogSUludGVybmFsTG9nZ2VyO1xuXHRwcml2YXRlIF9wZW5kaW5nTG9nUTogSUxvZ0l0ZW1bXSA9IFtdO1xuXG5cdGxvZyhtc2c6IHN0cmluZywgbGV2ZWwgPSBMb2dMZXZlbC5Mb2cpOiB2b2lkIHtcblx0XHRtc2cgPSBtc2cgKyAnXFxuJztcblx0XHR0aGlzLl93cml0ZShtc2csIGxldmVsKTtcblx0fVxuXG5cdHZlcmJvc2UobXNnOiBzdHJpbmcpOiB2b2lkIHtcblx0XHR0aGlzLmxvZyhtc2csIExvZ0xldmVsLlZlcmJvc2UpO1xuXHR9XG5cblx0d2Fybihtc2c6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMubG9nKG1zZywgTG9nTGV2ZWwuV2Fybik7XG5cdH1cblxuXHRlcnJvcihtc2c6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMubG9nKG1zZywgTG9nTGV2ZWwuRXJyb3IpO1xuXHR9XG5cblx0ZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5fY3VycmVudExvZ2dlcikge1xuXHRcdFx0Y29uc3QgZGlzcG9zZVAgPSB0aGlzLl9jdXJyZW50TG9nZ2VyLmRpc3Bvc2UoKTtcblx0XHRcdHRoaXMuX2N1cnJlbnRMb2dnZXIgPSBudWxsO1xuXHRcdFx0cmV0dXJuIGRpc3Bvc2VQO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIGBsb2dgIGFkZHMgYSBuZXdsaW5lLCBgd3JpdGVgIGRvZXNuJ3Rcblx0ICovXG5cdHByaXZhdGUgX3dyaXRlKG1zZzogc3RyaW5nLCBsZXZlbCA9IExvZ0xldmVsLkxvZyk6IHZvaWQge1xuXHRcdC8vIFtudWxsLCB1bmRlZmluZWRdID0+IHN0cmluZ1xuXHRcdG1zZyA9IG1zZyArICcnO1xuXHRcdGlmICh0aGlzLl9wZW5kaW5nTG9nUSkge1xuXHRcdFx0dGhpcy5fcGVuZGluZ0xvZ1EucHVzaCh7IG1zZywgbGV2ZWwgfSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9jdXJyZW50TG9nZ2VyKSB7XG5cdFx0XHR0aGlzLl9jdXJyZW50TG9nZ2VyLmxvZyhtc2csIGxldmVsKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBsb2dnZXIncyBtaW5pbXVtIGxldmVsIHRvIGxvZyBpbiB0aGUgY29uc29sZSwgYW5kIHdoZXRoZXIgdG8gbG9nIHRvIHRoZSBmaWxlLiBMb2cgbWVzc2FnZXMgYXJlIHF1ZXVlZCBiZWZvcmUgdGhpcyBpc1xuXHQgKiBjYWxsZWQgdGhlIGZpcnN0IHRpbWUsIGJlY2F1c2UgbWluTG9nTGV2ZWwgZGVmYXVsdHMgdG8gV2Fybi5cblx0ICovXG5cdHNldHVwKGNvbnNvbGVNaW5Mb2dMZXZlbDogTG9nTGV2ZWwsIF9sb2dGaWxlUGF0aD86IHN0cmluZ3xib29sZWFuLCBwcmVwZW5kVGltZXN0YW1wOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuXHRcdGNvbnN0IGxvZ0ZpbGVQYXRoID0gdHlwZW9mIF9sb2dGaWxlUGF0aCA9PT0gJ3N0cmluZycgP1xuXHRcdFx0X2xvZ0ZpbGVQYXRoIDpcblx0XHRcdChfbG9nRmlsZVBhdGggJiYgdGhpcy5fbG9nRmlsZVBhdGhGcm9tSW5pdCk7XG5cblx0XHRpZiAodGhpcy5fY3VycmVudExvZ2dlcikge1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0Y29uc29sZU1pbkxvZ0xldmVsLFxuXHRcdFx0XHRsb2dGaWxlUGF0aCxcblx0XHRcdFx0cHJlcGVuZFRpbWVzdGFtcFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuX2N1cnJlbnRMb2dnZXIuc2V0dXAob3B0aW9ucykudGhlbigoKSA9PiB7XG5cdFx0XHRcdC8vIE5vdyB0aGF0IHdlIGhhdmUgYSBtaW5pbXVtIGxvZ0xldmVsLCB3ZSBjYW4gY2xlYXIgb3V0IHRoZSBxdWV1ZSBvZiBwZW5kaW5nIG1lc3NhZ2VzXG5cdFx0XHRcdGlmICh0aGlzLl9wZW5kaW5nTG9nUSkge1xuXHRcdFx0XHRcdGNvbnN0IGxvZ1EgPSB0aGlzLl9wZW5kaW5nTG9nUTtcblx0XHRcdFx0XHR0aGlzLl9wZW5kaW5nTG9nUSA9IG51bGw7XG5cdFx0XHRcdFx0bG9nUS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fd3JpdGUoaXRlbS5tc2csIGl0ZW0ubGV2ZWwpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHR9XG5cdH1cblxuXHRpbml0KGxvZ0NhbGxiYWNrOiBJTG9nQ2FsbGJhY2ssIGxvZ0ZpbGVQYXRoPzogc3RyaW5nLCBsb2dUb0NvbnNvbGU/OiBib29sZWFuKTogdm9pZCB7XG5cdFx0Ly8gUmUtaW5pdCwgY3JlYXRlIG5ldyBnbG9iYWwgTG9nZ2VyXG5cdFx0dGhpcy5fcGVuZGluZ0xvZ1EgPSB0aGlzLl9wZW5kaW5nTG9nUSB8fCBbXTtcblx0XHR0aGlzLl9jdXJyZW50TG9nZ2VyID0gbmV3IEludGVybmFsTG9nZ2VyKGxvZ0NhbGxiYWNrLCBsb2dUb0NvbnNvbGUpO1xuXHRcdHRoaXMuX2xvZ0ZpbGVQYXRoRnJvbUluaXQgPSBsb2dGaWxlUGF0aDtcblx0fVxufVxuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG5leHBvcnQgY2xhc3MgTG9nT3V0cHV0RXZlbnQgZXh0ZW5kcyBPdXRwdXRFdmVudCB7XG5cdGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nLCBsZXZlbDogTG9nTGV2ZWwpIHtcblx0XHRjb25zdCBjYXRlZ29yeSA9XG5cdFx0XHRsZXZlbCA9PT0gTG9nTGV2ZWwuRXJyb3IgPyAnc3RkZXJyJyA6XG5cdFx0XHRsZXZlbCA9PT0gTG9nTGV2ZWwuV2FybiA/ICdjb25zb2xlJyA6XG5cdFx0XHQnc3Rkb3V0Jztcblx0XHRzdXBlcihtc2csIGNhdGVnb3J5KTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJpbUxhc3ROZXdsaW5lKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oXFxufFxcclxcbikkLywgJycpO1xufVxuXG5cbiJdfQ==

/***/ }),

/***/ 1212:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingDebugSession = void 0;
const Logger = __webpack_require__(4100);
const logger = Logger.logger;
const debugSession_1 = __webpack_require__(4651);
class LoggingDebugSession extends debugSession_1.DebugSession {
    constructor(obsolete_logFilePath, obsolete_debuggerLinesAndColumnsStartAt1, obsolete_isServer) {
        super(obsolete_debuggerLinesAndColumnsStartAt1, obsolete_isServer);
        this.obsolete_logFilePath = obsolete_logFilePath;
        this.on('error', (event) => {
            logger.error(event.body);
        });
    }
    start(inStream, outStream) {
        super.start(inStream, outStream);
        logger.init(e => this.sendEvent(e), this.obsolete_logFilePath, this._isServer);
    }
    /**
     * Overload sendEvent to log
     */
    sendEvent(event) {
        if (!(event instanceof Logger.LogOutputEvent)) {
            // Don't create an infinite loop...
            let objectToLog = event;
            if (event instanceof debugSession_1.OutputEvent && event.body && event.body.data && event.body.data.doNotLogOutput) {
                delete event.body.data.doNotLogOutput;
                objectToLog = { ...event };
                objectToLog.body = { ...event.body, output: '<output not logged>' };
            }
            logger.verbose(`To client: ${JSON.stringify(objectToLog)}`);
        }
        super.sendEvent(event);
    }
    /**
     * Overload sendRequest to log
     */
    sendRequest(command, args, timeout, cb) {
        logger.verbose(`To client: ${JSON.stringify(command)}(${JSON.stringify(args)}), timeout: ${timeout}`);
        super.sendRequest(command, args, timeout, cb);
    }
    /**
     * Overload sendResponse to log
     */
    sendResponse(response) {
        logger.verbose(`To client: ${JSON.stringify(response)}`);
        super.sendResponse(response);
    }
    dispatchRequest(request) {
        logger.verbose(`From client: ${request.command}(${JSON.stringify(request.arguments)})`);
        super.dispatchRequest(request);
    }
}
exports.LoggingDebugSession = LoggingDebugSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZ0RlYnVnU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnaW5nRGVidWdTZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O2dHQUdnRzs7O0FBSWhHLG1DQUFtQztBQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzdCLGlEQUF5RDtBQUV6RCxNQUFhLG1CQUFvQixTQUFRLDJCQUFZO0lBQ3BELFlBQTJCLG9CQUE2QixFQUFFLHdDQUFrRCxFQUFFLGlCQUEyQjtRQUN4SSxLQUFLLENBQUMsd0NBQXdDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUR6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVM7UUFHdkQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUEwQixFQUFFLEVBQUU7WUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQStCLEVBQUUsU0FBZ0M7UUFDN0UsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTLENBQUMsS0FBMEI7UUFDMUMsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5QyxtQ0FBbUM7WUFFbkMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksS0FBSyxZQUFZLDBCQUFXLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3BHLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUN0QyxXQUFXLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO2dCQUMzQixXQUFXLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxDQUFBO2FBQ25FO1lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxXQUFXLENBQUMsT0FBZSxFQUFFLElBQVMsRUFBRSxPQUFlLEVBQUUsRUFBOEM7UUFDN0csTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksWUFBWSxDQUFDLFFBQWdDO1FBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUyxlQUFlLENBQUMsT0FBOEI7UUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFDLENBQUM7UUFDekYsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Q7QUF0REQsa0RBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7RGVidWdQcm90b2NvbH0gZnJvbSAnQHZzY29kZS9kZWJ1Z3Byb3RvY29sJztcblxuaW1wb3J0ICogYXMgTG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5sb2dnZXI7XG5pbXBvcnQge0RlYnVnU2Vzc2lvbiwgT3V0cHV0RXZlbnR9IGZyb20gJy4vZGVidWdTZXNzaW9uJztcblxuZXhwb3J0IGNsYXNzIExvZ2dpbmdEZWJ1Z1Nlc3Npb24gZXh0ZW5kcyBEZWJ1Z1Nlc3Npb24ge1xuXHRwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBvYnNvbGV0ZV9sb2dGaWxlUGF0aD86IHN0cmluZywgb2Jzb2xldGVfZGVidWdnZXJMaW5lc0FuZENvbHVtbnNTdGFydEF0MT86IGJvb2xlYW4sIG9ic29sZXRlX2lzU2VydmVyPzogYm9vbGVhbikge1xuXHRcdHN1cGVyKG9ic29sZXRlX2RlYnVnZ2VyTGluZXNBbmRDb2x1bW5zU3RhcnRBdDEsIG9ic29sZXRlX2lzU2VydmVyKTtcblxuXHRcdHRoaXMub24oJ2Vycm9yJywgKGV2ZW50OiBEZWJ1Z1Byb3RvY29sLkV2ZW50KSA9PiB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoZXZlbnQuYm9keSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgc3RhcnQoaW5TdHJlYW06IE5vZGVKUy5SZWFkYWJsZVN0cmVhbSwgb3V0U3RyZWFtOiBOb2RlSlMuV3JpdGFibGVTdHJlYW0pOiB2b2lkIHtcblx0XHRzdXBlci5zdGFydChpblN0cmVhbSwgb3V0U3RyZWFtKTtcblx0XHRsb2dnZXIuaW5pdChlID0+IHRoaXMuc2VuZEV2ZW50KGUpLCB0aGlzLm9ic29sZXRlX2xvZ0ZpbGVQYXRoLCB0aGlzLl9pc1NlcnZlcik7XG5cdH1cblxuXHQvKipcblx0ICogT3ZlcmxvYWQgc2VuZEV2ZW50IHRvIGxvZ1xuXHQgKi9cblx0cHVibGljIHNlbmRFdmVudChldmVudDogRGVidWdQcm90b2NvbC5FdmVudCk6IHZvaWQge1xuXHRcdGlmICghKGV2ZW50IGluc3RhbmNlb2YgTG9nZ2VyLkxvZ091dHB1dEV2ZW50KSkge1xuXHRcdFx0Ly8gRG9uJ3QgY3JlYXRlIGFuIGluZmluaXRlIGxvb3AuLi5cblxuXHRcdFx0bGV0IG9iamVjdFRvTG9nID0gZXZlbnQ7XG5cdFx0XHRpZiAoZXZlbnQgaW5zdGFuY2VvZiBPdXRwdXRFdmVudCAmJiBldmVudC5ib2R5ICYmIGV2ZW50LmJvZHkuZGF0YSAmJiBldmVudC5ib2R5LmRhdGEuZG9Ob3RMb2dPdXRwdXQpIHtcblx0XHRcdFx0ZGVsZXRlIGV2ZW50LmJvZHkuZGF0YS5kb05vdExvZ091dHB1dDtcblx0XHRcdFx0b2JqZWN0VG9Mb2cgPSB7IC4uLmV2ZW50IH07XG5cdFx0XHRcdG9iamVjdFRvTG9nLmJvZHkgPSB7IC4uLmV2ZW50LmJvZHksIG91dHB1dDogJzxvdXRwdXQgbm90IGxvZ2dlZD4nIH1cblx0XHRcdH1cblxuXHRcdFx0bG9nZ2VyLnZlcmJvc2UoYFRvIGNsaWVudDogJHtKU09OLnN0cmluZ2lmeShvYmplY3RUb0xvZyl9YCk7XG5cdFx0fVxuXG5cdFx0c3VwZXIuc2VuZEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPdmVybG9hZCBzZW5kUmVxdWVzdCB0byBsb2dcblx0ICovXG5cdHB1YmxpYyBzZW5kUmVxdWVzdChjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IGFueSwgdGltZW91dDogbnVtYmVyLCBjYjogKHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlJlc3BvbnNlKSA9PiB2b2lkKTogdm9pZCB7XG5cdFx0bG9nZ2VyLnZlcmJvc2UoYFRvIGNsaWVudDogJHtKU09OLnN0cmluZ2lmeShjb21tYW5kKX0oJHtKU09OLnN0cmluZ2lmeShhcmdzKX0pLCB0aW1lb3V0OiAke3RpbWVvdXR9YCk7XG5cdFx0c3VwZXIuc2VuZFJlcXVlc3QoY29tbWFuZCwgYXJncywgdGltZW91dCwgY2IpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE92ZXJsb2FkIHNlbmRSZXNwb25zZSB0byBsb2dcblx0ICovXG5cdHB1YmxpYyBzZW5kUmVzcG9uc2UocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUmVzcG9uc2UpOiB2b2lkIHtcblx0XHRsb2dnZXIudmVyYm9zZShgVG8gY2xpZW50OiAke0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlKX1gKTtcblx0XHRzdXBlci5zZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGRpc3BhdGNoUmVxdWVzdChyZXF1ZXN0OiBEZWJ1Z1Byb3RvY29sLlJlcXVlc3QpOiB2b2lkIHtcblx0XHRsb2dnZXIudmVyYm9zZShgRnJvbSBjbGllbnQ6ICR7cmVxdWVzdC5jb21tYW5kfSgke0pTT04uc3RyaW5naWZ5KHJlcXVlc3QuYXJndW1lbnRzKSB9KWApO1xuXHRcdHN1cGVyLmRpc3BhdGNoUmVxdWVzdChyZXF1ZXN0KTtcblx0fVxufVxuIl19

/***/ }),

/***/ 9955:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Handles = exports.Response = exports.Event = exports.ErrorDestination = exports.CompletionItem = exports.Module = exports.Source = exports.Breakpoint = exports.Variable = exports.Scope = exports.StackFrame = exports.Thread = exports.MemoryEvent = exports.InvalidatedEvent = exports.ProgressEndEvent = exports.ProgressUpdateEvent = exports.ProgressStartEvent = exports.CapabilitiesEvent = exports.LoadedSourceEvent = exports.ModuleEvent = exports.BreakpointEvent = exports.ThreadEvent = exports.OutputEvent = exports.ContinuedEvent = exports.StoppedEvent = exports.ExitedEvent = exports.TerminatedEvent = exports.InitializedEvent = exports.logger = exports.Logger = exports.LoggingDebugSession = exports.DebugSession = void 0;
const debugSession_1 = __webpack_require__(4651);
Object.defineProperty(exports, "DebugSession", ({ enumerable: true, get: function () { return debugSession_1.DebugSession; } }));
Object.defineProperty(exports, "InitializedEvent", ({ enumerable: true, get: function () { return debugSession_1.InitializedEvent; } }));
Object.defineProperty(exports, "TerminatedEvent", ({ enumerable: true, get: function () { return debugSession_1.TerminatedEvent; } }));
Object.defineProperty(exports, "ExitedEvent", ({ enumerable: true, get: function () { return debugSession_1.ExitedEvent; } }));
Object.defineProperty(exports, "StoppedEvent", ({ enumerable: true, get: function () { return debugSession_1.StoppedEvent; } }));
Object.defineProperty(exports, "ContinuedEvent", ({ enumerable: true, get: function () { return debugSession_1.ContinuedEvent; } }));
Object.defineProperty(exports, "OutputEvent", ({ enumerable: true, get: function () { return debugSession_1.OutputEvent; } }));
Object.defineProperty(exports, "ThreadEvent", ({ enumerable: true, get: function () { return debugSession_1.ThreadEvent; } }));
Object.defineProperty(exports, "BreakpointEvent", ({ enumerable: true, get: function () { return debugSession_1.BreakpointEvent; } }));
Object.defineProperty(exports, "ModuleEvent", ({ enumerable: true, get: function () { return debugSession_1.ModuleEvent; } }));
Object.defineProperty(exports, "LoadedSourceEvent", ({ enumerable: true, get: function () { return debugSession_1.LoadedSourceEvent; } }));
Object.defineProperty(exports, "CapabilitiesEvent", ({ enumerable: true, get: function () { return debugSession_1.CapabilitiesEvent; } }));
Object.defineProperty(exports, "ProgressStartEvent", ({ enumerable: true, get: function () { return debugSession_1.ProgressStartEvent; } }));
Object.defineProperty(exports, "ProgressUpdateEvent", ({ enumerable: true, get: function () { return debugSession_1.ProgressUpdateEvent; } }));
Object.defineProperty(exports, "ProgressEndEvent", ({ enumerable: true, get: function () { return debugSession_1.ProgressEndEvent; } }));
Object.defineProperty(exports, "InvalidatedEvent", ({ enumerable: true, get: function () { return debugSession_1.InvalidatedEvent; } }));
Object.defineProperty(exports, "MemoryEvent", ({ enumerable: true, get: function () { return debugSession_1.MemoryEvent; } }));
Object.defineProperty(exports, "Thread", ({ enumerable: true, get: function () { return debugSession_1.Thread; } }));
Object.defineProperty(exports, "StackFrame", ({ enumerable: true, get: function () { return debugSession_1.StackFrame; } }));
Object.defineProperty(exports, "Scope", ({ enumerable: true, get: function () { return debugSession_1.Scope; } }));
Object.defineProperty(exports, "Variable", ({ enumerable: true, get: function () { return debugSession_1.Variable; } }));
Object.defineProperty(exports, "Breakpoint", ({ enumerable: true, get: function () { return debugSession_1.Breakpoint; } }));
Object.defineProperty(exports, "Source", ({ enumerable: true, get: function () { return debugSession_1.Source; } }));
Object.defineProperty(exports, "Module", ({ enumerable: true, get: function () { return debugSession_1.Module; } }));
Object.defineProperty(exports, "CompletionItem", ({ enumerable: true, get: function () { return debugSession_1.CompletionItem; } }));
Object.defineProperty(exports, "ErrorDestination", ({ enumerable: true, get: function () { return debugSession_1.ErrorDestination; } }));
const loggingDebugSession_1 = __webpack_require__(1212);
Object.defineProperty(exports, "LoggingDebugSession", ({ enumerable: true, get: function () { return loggingDebugSession_1.LoggingDebugSession; } }));
const Logger = __webpack_require__(4100);
exports.Logger = Logger;
const messages_1 = __webpack_require__(601);
Object.defineProperty(exports, "Event", ({ enumerable: true, get: function () { return messages_1.Event; } }));
Object.defineProperty(exports, "Response", ({ enumerable: true, get: function () { return messages_1.Response; } }));
const handles_1 = __webpack_require__(527);
Object.defineProperty(exports, "Handles", ({ enumerable: true, get: function () { return handles_1.Handles; } }));
const logger = Logger.logger;
exports.logger = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Z0dBR2dHO0FBQ2hHLFlBQVksQ0FBQzs7O0FBRWIsaURBT3dCO0FBU3ZCLDZGQWZBLDJCQUFZLE9BZUE7QUFJWixpR0FsQkEsK0JBQWdCLE9Ba0JBO0FBQUUsZ0dBbEJBLDhCQUFlLE9Ba0JBO0FBQUUsNEZBbEJBLDBCQUFXLE9Ba0JBO0FBQUUsNkZBbEJBLDJCQUFZLE9Ba0JBO0FBQUUsK0ZBbEJBLDZCQUFjLE9Ba0JBO0FBQUUsNEZBbEJBLDBCQUFXLE9Ba0JBO0FBQUUsNEZBbEJBLDBCQUFXLE9Ba0JBO0FBQUUsZ0dBbEJBLDhCQUFlLE9Ba0JBO0FBQUUsNEZBbEJBLDBCQUFXLE9Ba0JBO0FBQ25JLGtHQWxCQSxnQ0FBaUIsT0FrQkE7QUFBRSxrR0FsQkEsZ0NBQWlCLE9Ba0JBO0FBQUUsbUdBbEJBLGlDQUFrQixPQWtCQTtBQUFFLG9HQWxCQSxrQ0FBbUIsT0FrQkE7QUFBRSxpR0FsQkEsK0JBQWdCLE9Ba0JBO0FBQUUsaUdBbEJBLCtCQUFnQixPQWtCQTtBQUFFLDRGQWxCQSwwQkFBVyxPQWtCQTtBQUMvSCx1RkFsQkEscUJBQU0sT0FrQkE7QUFBRSwyRkFsQkEseUJBQVUsT0FrQkE7QUFBRSxzRkFsQkEsb0JBQUssT0FrQkE7QUFBRSx5RkFsQkEsdUJBQVEsT0FrQkE7QUFDbkMsMkZBbEJBLHlCQUFVLE9Ba0JBO0FBQUUsdUZBbEJBLHFCQUFNLE9Ba0JBO0FBQUUsdUZBbEJBLHFCQUFNLE9Ba0JBO0FBQUUsK0ZBbEJBLDZCQUFjLE9Ba0JBO0FBQzFDLGlHQWxCQSwrQkFBZ0IsT0FrQkE7QUFoQmpCLCtEQUEwRDtBQVN6RCxvR0FUTyx5Q0FBbUIsT0FTUDtBQVJwQixtQ0FBbUM7QUFTbEMsd0JBQU07QUFSUCx5Q0FBNkM7QUFlNUMsc0ZBZlEsZ0JBQUssT0FlUjtBQUFFLHlGQWZRLG1CQUFRLE9BZVI7QUFkaEIsdUNBQW9DO0FBZW5DLHdGQWZRLGlCQUFPLE9BZVI7QUFiUixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBTTVCLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge1xuXHREZWJ1Z1Nlc3Npb24sXG5cdEluaXRpYWxpemVkRXZlbnQsIFRlcm1pbmF0ZWRFdmVudCwgRXhpdGVkRXZlbnQsIFN0b3BwZWRFdmVudCwgQ29udGludWVkRXZlbnQsIE91dHB1dEV2ZW50LCBUaHJlYWRFdmVudCwgQnJlYWtwb2ludEV2ZW50LCBNb2R1bGVFdmVudCxcblx0XHRMb2FkZWRTb3VyY2VFdmVudCwgQ2FwYWJpbGl0aWVzRXZlbnQsIFByb2dyZXNzU3RhcnRFdmVudCwgUHJvZ3Jlc3NVcGRhdGVFdmVudCwgUHJvZ3Jlc3NFbmRFdmVudCwgSW52YWxpZGF0ZWRFdmVudCwgTWVtb3J5RXZlbnQsXG5cdFRocmVhZCwgU3RhY2tGcmFtZSwgU2NvcGUsIFZhcmlhYmxlLFxuXHRCcmVha3BvaW50LCBTb3VyY2UsIE1vZHVsZSwgQ29tcGxldGlvbkl0ZW0sXG5cdEVycm9yRGVzdGluYXRpb25cbn0gZnJvbSAnLi9kZWJ1Z1Nlc3Npb24nO1xuaW1wb3J0IHtMb2dnaW5nRGVidWdTZXNzaW9ufSBmcm9tICcuL2xvZ2dpbmdEZWJ1Z1Nlc3Npb24nO1xuaW1wb3J0ICogYXMgTG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IEV2ZW50LCBSZXNwb25zZSB9IGZyb20gJy4vbWVzc2FnZXMnO1xuaW1wb3J0IHsgSGFuZGxlcyB9IGZyb20gJy4vaGFuZGxlcyc7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5sb2dnZXI7XG5cbmV4cG9ydCB7XG5cdERlYnVnU2Vzc2lvbixcblx0TG9nZ2luZ0RlYnVnU2Vzc2lvbixcblx0TG9nZ2VyLFxuXHRsb2dnZXIsXG5cdEluaXRpYWxpemVkRXZlbnQsIFRlcm1pbmF0ZWRFdmVudCwgRXhpdGVkRXZlbnQsIFN0b3BwZWRFdmVudCwgQ29udGludWVkRXZlbnQsIE91dHB1dEV2ZW50LCBUaHJlYWRFdmVudCwgQnJlYWtwb2ludEV2ZW50LCBNb2R1bGVFdmVudCxcblx0XHRMb2FkZWRTb3VyY2VFdmVudCwgQ2FwYWJpbGl0aWVzRXZlbnQsIFByb2dyZXNzU3RhcnRFdmVudCwgUHJvZ3Jlc3NVcGRhdGVFdmVudCwgUHJvZ3Jlc3NFbmRFdmVudCwgSW52YWxpZGF0ZWRFdmVudCwgTWVtb3J5RXZlbnQsXG5cdFRocmVhZCwgU3RhY2tGcmFtZSwgU2NvcGUsIFZhcmlhYmxlLFxuXHRCcmVha3BvaW50LCBTb3VyY2UsIE1vZHVsZSwgQ29tcGxldGlvbkl0ZW0sXG5cdEVycm9yRGVzdGluYXRpb24sXG5cdEV2ZW50LCBSZXNwb25zZSxcblx0SGFuZGxlc1xufVxuIl19

/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = exports.Response = exports.Message = void 0;
class Message {
    constructor(type) {
        this.seq = 0;
        this.type = type;
    }
}
exports.Message = Message;
class Response extends Message {
    constructor(request, message) {
        super('response');
        this.request_seq = request.seq;
        this.command = request.command;
        if (message) {
            this.success = false;
            this.message = message;
        }
        else {
            this.success = true;
        }
    }
}
exports.Response = Response;
class Event extends Message {
    constructor(event, body) {
        super('event');
        this.event = event;
        if (body) {
            this.body = body;
        }
    }
}
exports.Event = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOzs7QUFLaEcsTUFBYSxPQUFPO0lBSW5CLFlBQW1CLElBQVk7UUFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0NBQ0Q7QUFSRCwwQkFRQztBQUVELE1BQWEsUUFBUyxTQUFRLE9BQU87SUFLcEMsWUFBbUIsT0FBOEIsRUFBRSxPQUFnQjtRQUNsRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLE9BQU8sRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2YsSUFBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDOUI7YUFBTTtZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztDQUNEO0FBaEJELDRCQWdCQztBQUVELE1BQWEsS0FBTSxTQUFRLE9BQU87SUFHakMsWUFBbUIsS0FBYSxFQUFFLElBQVU7UUFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxJQUFJLEVBQUU7WUFDSCxJQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNGLENBQUM7Q0FDRDtBQVZELHNCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7IERlYnVnUHJvdG9jb2wgfSBmcm9tICdAdnNjb2RlL2RlYnVncHJvdG9jb2wnO1xuXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlIGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5Qcm90b2NvbE1lc3NhZ2Uge1xuXHRzZXE6IG51bWJlcjtcblx0dHlwZTogc3RyaW5nO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcpIHtcblx0XHR0aGlzLnNlcSA9IDA7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgUmVzcG9uc2UgZXh0ZW5kcyBNZXNzYWdlIGltcGxlbWVudHMgRGVidWdQcm90b2NvbC5SZXNwb25zZSB7XG5cdHJlcXVlc3Rfc2VxOiBudW1iZXI7XG5cdHN1Y2Nlc3M6IGJvb2xlYW47XG5cdGNvbW1hbmQ6IHN0cmluZztcblxuXHRwdWJsaWMgY29uc3RydWN0b3IocmVxdWVzdDogRGVidWdQcm90b2NvbC5SZXF1ZXN0LCBtZXNzYWdlPzogc3RyaW5nKSB7XG5cdFx0c3VwZXIoJ3Jlc3BvbnNlJyk7XG5cdFx0dGhpcy5yZXF1ZXN0X3NlcSA9IHJlcXVlc3Quc2VxO1xuXHRcdHRoaXMuY29tbWFuZCA9IHJlcXVlc3QuY29tbWFuZDtcblx0XHRpZiAobWVzc2FnZSkge1xuXHRcdFx0dGhpcy5zdWNjZXNzID0gZmFsc2U7XG5cdFx0XHQoPGFueT50aGlzKS5tZXNzYWdlID0gbWVzc2FnZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdWNjZXNzID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50IGV4dGVuZHMgTWVzc2FnZSBpbXBsZW1lbnRzIERlYnVnUHJvdG9jb2wuRXZlbnQge1xuXHRldmVudDogc3RyaW5nO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihldmVudDogc3RyaW5nLCBib2R5PzogYW55KSB7XG5cdFx0c3VwZXIoJ2V2ZW50Jyk7XG5cdFx0dGhpcy5ldmVudCA9IGV2ZW50O1xuXHRcdGlmIChib2R5KSB7XG5cdFx0XHQoPGFueT50aGlzKS5ib2R5ID0gYm9keTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==

/***/ }),

/***/ 1839:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProtocolServer = void 0;
const ee = __webpack_require__(2361);
const messages_1 = __webpack_require__(601);
class Disposable0 {
    dispose() {
    }
}
class Emitter {
    get event() {
        if (!this._event) {
            this._event = (listener, thisArg) => {
                this._listener = listener;
                this._this = thisArg;
                let result;
                result = {
                    dispose: () => {
                        this._listener = undefined;
                        this._this = undefined;
                    }
                };
                return result;
            };
        }
        return this._event;
    }
    fire(event) {
        if (this._listener) {
            try {
                this._listener.call(this._this, event);
            }
            catch (e) {
            }
        }
    }
    hasListener() {
        return !!this._listener;
    }
    dispose() {
        this._listener = undefined;
        this._this = undefined;
    }
}
class ProtocolServer extends ee.EventEmitter {
    constructor() {
        super();
        this._sendMessage = new Emitter();
        this._pendingRequests = new Map();
        this.onDidSendMessage = this._sendMessage.event;
    }
    // ---- implements vscode.Debugadapter interface ---------------------------
    dispose() {
    }
    handleMessage(msg) {
        if (msg.type === 'request') {
            this.dispatchRequest(msg);
        }
        else if (msg.type === 'response') {
            const response = msg;
            const clb = this._pendingRequests.get(response.request_seq);
            if (clb) {
                this._pendingRequests.delete(response.request_seq);
                clb(response);
            }
        }
    }
    _isRunningInline() {
        return this._sendMessage && this._sendMessage.hasListener();
    }
    //--------------------------------------------------------------------------
    start(inStream, outStream) {
        this._sequence = 1;
        this._writableStream = outStream;
        this._rawData = Buffer.alloc(0);
        inStream.on('data', (data) => this._handleData(data));
        inStream.on('close', () => {
            this._emitEvent(new messages_1.Event('close'));
        });
        inStream.on('error', (error) => {
            this._emitEvent(new messages_1.Event('error', 'inStream error: ' + (error && error.message)));
        });
        outStream.on('error', (error) => {
            this._emitEvent(new messages_1.Event('error', 'outStream error: ' + (error && error.message)));
        });
        inStream.resume();
    }
    stop() {
        if (this._writableStream) {
            this._writableStream.end();
        }
    }
    sendEvent(event) {
        this._send('event', event);
    }
    sendResponse(response) {
        if (response.seq > 0) {
            console.error(`attempt to send more than one response for command ${response.command}`);
        }
        else {
            this._send('response', response);
        }
    }
    sendRequest(command, args, timeout, cb) {
        const request = {
            command: command
        };
        if (args && Object.keys(args).length > 0) {
            request.arguments = args;
        }
        this._send('request', request);
        if (cb) {
            this._pendingRequests.set(request.seq, cb);
            const timer = setTimeout(() => {
                clearTimeout(timer);
                const clb = this._pendingRequests.get(request.seq);
                if (clb) {
                    this._pendingRequests.delete(request.seq);
                    clb(new messages_1.Response(request, 'timeout'));
                }
            }, timeout);
        }
    }
    // ---- protected ----------------------------------------------------------
    dispatchRequest(request) {
    }
    // ---- private ------------------------------------------------------------
    _emitEvent(event) {
        this.emit(event.event, event);
    }
    _send(typ, message) {
        message.type = typ;
        message.seq = this._sequence++;
        if (this._writableStream) {
            const json = JSON.stringify(message);
            this._writableStream.write(`Content-Length: ${Buffer.byteLength(json, 'utf8')}\r\n\r\n${json}`, 'utf8');
        }
        this._sendMessage.fire(message);
    }
    _handleData(data) {
        this._rawData = Buffer.concat([this._rawData, data]);
        while (true) {
            if (this._contentLength >= 0) {
                if (this._rawData.length >= this._contentLength) {
                    const message = this._rawData.toString('utf8', 0, this._contentLength);
                    this._rawData = this._rawData.slice(this._contentLength);
                    this._contentLength = -1;
                    if (message.length > 0) {
                        try {
                            let msg = JSON.parse(message);
                            this.handleMessage(msg);
                        }
                        catch (e) {
                            this._emitEvent(new messages_1.Event('error', 'Error handling data: ' + (e && e.message)));
                        }
                    }
                    continue; // there may be more complete messages to process
                }
            }
            else {
                const idx = this._rawData.indexOf(ProtocolServer.TWO_CRLF);
                if (idx !== -1) {
                    const header = this._rawData.toString('utf8', 0, idx);
                    const lines = header.split('\r\n');
                    for (let i = 0; i < lines.length; i++) {
                        const pair = lines[i].split(/: +/);
                        if (pair[0] == 'Content-Length') {
                            this._contentLength = +pair[1];
                        }
                    }
                    this._rawData = this._rawData.slice(idx + ProtocolServer.TWO_CRLF.length);
                    continue;
                }
            }
            break;
        }
    }
}
exports.ProtocolServer = ProtocolServer;
ProtocolServer.TWO_CRLF = '\r\n\r\n';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9jb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvdG9jb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOzs7QUFFaEcsNkJBQTZCO0FBRTdCLHlDQUE2QztBQVM3QyxNQUFNLFdBQVc7SUFDaEIsT0FBTztJQUNQLENBQUM7Q0FDRDtBQU1ELE1BQU0sT0FBTztJQU1aLElBQUksS0FBSztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxRQUF1QixFQUFFLE9BQWEsRUFBRSxFQUFFO2dCQUV4RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBRXJCLElBQUksTUFBbUIsQ0FBQztnQkFDeEIsTUFBTSxHQUFHO29CQUNSLE9BQU8sRUFBRSxHQUFHLEVBQUU7d0JBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7d0JBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO29CQUN4QixDQUFDO2lCQUNELENBQUM7Z0JBQ0YsT0FBTyxNQUFNLENBQUM7WUFDZixDQUFDLENBQUM7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQVE7UUFDWixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSTtnQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO1lBQUMsT0FBTyxDQUFDLEVBQUU7YUFDWDtTQUNEO0lBQ0YsQ0FBQztJQUVELFdBQVc7UUFDVixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxDQUFDLFNBQVMs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SSxnQkFBZ0IsRUFBRTs0QkFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDL0I7cUJBQ0Q7b0JBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUUsU0FBUztpQkFDVDthQUNEO1lBQ0QsTUFBTTtTQUNOO0lBQ0YsQ0FBQzs7QUF2S0Ysd0NBd0tDO0FBdEtlLHVCQUFRLEdBQUcsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCAqIGFzIGVlIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBEZWJ1Z1Byb3RvY29sIH0gZnJvbSAnQHZzY29kZS9kZWJ1Z3Byb3RvY29sJztcbmltcG9ydCB7IFJlc3BvbnNlLCBFdmVudCB9IGZyb20gJy4vbWVzc2FnZXMnO1xuXG5pbnRlcmZhY2UgRGVidWdQcm90b2NvbE1lc3NhZ2Uge1xufVxuXG5pbnRlcmZhY2UgSURpc3Bvc2FibGUge1xuXHRkaXNwb3NlKCk6IHZvaWQ7XG59XG5cbmNsYXNzIERpc3Bvc2FibGUwIGltcGxlbWVudHMgSURpc3Bvc2FibGUge1xuXHRkaXNwb3NlKCk6IGFueSB7XG5cdH1cbn1cblxuaW50ZXJmYWNlIEV2ZW50MDxUPiB7XG5cdChsaXN0ZW5lcjogKGU6IFQpID0+IGFueSwgdGhpc0FyZz86IGFueSk6IERpc3Bvc2FibGUwO1xufVxuXG5jbGFzcyBFbWl0dGVyPFQ+IHtcblxuXHRwcml2YXRlIF9ldmVudD86IEV2ZW50MDxUPjtcblx0cHJpdmF0ZSBfbGlzdGVuZXI/OiAoZTogVCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfdGhpcz86IGFueTtcblxuXHRnZXQgZXZlbnQoKTogRXZlbnQwPFQ+IHtcblx0XHRpZiAoIXRoaXMuX2V2ZW50KSB7XG5cdFx0XHR0aGlzLl9ldmVudCA9IChsaXN0ZW5lcjogKGU6IFQpID0+IGFueSwgdGhpc0FyZz86IGFueSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG5cdFx0XHRcdHRoaXMuX3RoaXMgPSB0aGlzQXJnO1xuXG5cdFx0XHRcdGxldCByZXN1bHQ6IElEaXNwb3NhYmxlO1xuXHRcdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdFx0ZGlzcG9zZTogKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fbGlzdGVuZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLl90aGlzID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9ldmVudDtcblx0fVxuXG5cdGZpcmUoZXZlbnQ6IFQpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fbGlzdGVuZXIpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMuX2xpc3RlbmVyLmNhbGwodGhpcy5fdGhpcywgZXZlbnQpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGhhc0xpc3RlbmVyKCkgOiBib29sZWFuIHtcblx0XHRyZXR1cm4gISF0aGlzLl9saXN0ZW5lcjtcblx0fVxuXG5cdGRpc3Bvc2UoKSB7XG5cdFx0dGhpcy5fbGlzdGVuZXIgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5fdGhpcyA9IHVuZGVmaW5lZDtcblx0fVxufVxuXG4vKipcbiAqIEEgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgY29weSBvZiB2c2NvZGUuRGVidWdBZGFwdGVyXG4gKi9cbmludGVyZmFjZSBWU0NvZGVEZWJ1Z0FkYXB0ZXIgZXh0ZW5kcyBEaXNwb3NhYmxlMCB7XG5cblx0cmVhZG9ubHkgb25EaWRTZW5kTWVzc2FnZTogRXZlbnQwPERlYnVnUHJvdG9jb2xNZXNzYWdlPjtcblxuXHRoYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IERlYnVnUHJvdG9jb2wuUHJvdG9jb2xNZXNzYWdlKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFByb3RvY29sU2VydmVyIGV4dGVuZHMgZWUuRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgVlNDb2RlRGVidWdBZGFwdGVyIHtcblxuXHRwcml2YXRlIHN0YXRpYyBUV09fQ1JMRiA9ICdcXHJcXG5cXHJcXG4nO1xuXG5cdHByaXZhdGUgX3NlbmRNZXNzYWdlID0gbmV3IEVtaXR0ZXI8RGVidWdQcm90b2NvbE1lc3NhZ2U+KCk7XG5cblx0cHJpdmF0ZSBfcmF3RGF0YTogQnVmZmVyO1xuXHRwcml2YXRlIF9jb250ZW50TGVuZ3RoOiBudW1iZXI7XG5cdHByaXZhdGUgX3NlcXVlbmNlOiBudW1iZXI7XG5cdHByaXZhdGUgX3dyaXRhYmxlU3RyZWFtOiBOb2RlSlMuV3JpdGFibGVTdHJlYW07XG5cdHByaXZhdGUgX3BlbmRpbmdSZXF1ZXN0cyA9IG5ldyBNYXA8bnVtYmVyLCAocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUmVzcG9uc2UpID0+IHZvaWQ+KCk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8vIC0tLS0gaW1wbGVtZW50cyB2c2NvZGUuRGVidWdhZGFwdGVyIGludGVyZmFjZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRwdWJsaWMgZGlzcG9zZSgpOiBhbnkge1xuXHR9XG5cblx0cHVibGljIG9uRGlkU2VuZE1lc3NhZ2U6IEV2ZW50MDxEZWJ1Z1Byb3RvY29sTWVzc2FnZT4gPSB0aGlzLl9zZW5kTWVzc2FnZS5ldmVudDtcblxuXHRwdWJsaWMgaGFuZGxlTWVzc2FnZShtc2c6IERlYnVnUHJvdG9jb2wuUHJvdG9jb2xNZXNzYWdlKTogdm9pZCB7XG5cdFx0aWYgKG1zZy50eXBlID09PSAncmVxdWVzdCcpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hSZXF1ZXN0KDxEZWJ1Z1Byb3RvY29sLlJlcXVlc3Q+bXNnKTtcblx0XHR9IGVsc2UgaWYgKG1zZy50eXBlID09PSAncmVzcG9uc2UnKSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IDxEZWJ1Z1Byb3RvY29sLlJlc3BvbnNlPm1zZztcblx0XHRcdGNvbnN0IGNsYiA9IHRoaXMuX3BlbmRpbmdSZXF1ZXN0cy5nZXQocmVzcG9uc2UucmVxdWVzdF9zZXEpO1xuXHRcdFx0aWYgKGNsYikge1xuXHRcdFx0XHR0aGlzLl9wZW5kaW5nUmVxdWVzdHMuZGVsZXRlKHJlc3BvbnNlLnJlcXVlc3Rfc2VxKTtcblx0XHRcdFx0Y2xiKHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2lzUnVubmluZ0lubGluZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fc2VuZE1lc3NhZ2UgJiYgdGhpcy5fc2VuZE1lc3NhZ2UuaGFzTGlzdGVuZXIoKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRwdWJsaWMgc3RhcnQoaW5TdHJlYW06IE5vZGVKUy5SZWFkYWJsZVN0cmVhbSwgb3V0U3RyZWFtOiBOb2RlSlMuV3JpdGFibGVTdHJlYW0pOiB2b2lkIHtcblx0XHR0aGlzLl9zZXF1ZW5jZSA9IDE7XG5cdFx0dGhpcy5fd3JpdGFibGVTdHJlYW0gPSBvdXRTdHJlYW07XG5cdFx0dGhpcy5fcmF3RGF0YSA9IEJ1ZmZlci5hbGxvYygwKTtcblxuXHRcdGluU3RyZWFtLm9uKCdkYXRhJywgKGRhdGE6IEJ1ZmZlcikgPT4gdGhpcy5faGFuZGxlRGF0YShkYXRhKSk7XG5cblx0XHRpblN0cmVhbS5vbignY2xvc2UnLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9lbWl0RXZlbnQobmV3IEV2ZW50KCdjbG9zZScpKTtcblx0XHR9KTtcblx0XHRpblN0cmVhbS5vbignZXJyb3InLCAoZXJyb3IpID0+IHtcblx0XHRcdHRoaXMuX2VtaXRFdmVudChuZXcgRXZlbnQoJ2Vycm9yJywgJ2luU3RyZWFtIGVycm9yOiAnICsgKGVycm9yICYmIGVycm9yLm1lc3NhZ2UpKSk7XG5cdFx0fSk7XG5cblx0XHRvdXRTdHJlYW0ub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XG5cdFx0XHR0aGlzLl9lbWl0RXZlbnQobmV3IEV2ZW50KCdlcnJvcicsICdvdXRTdHJlYW0gZXJyb3I6ICcgKyAoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSkpKTtcblx0XHR9KTtcblxuXHRcdGluU3RyZWFtLnJlc3VtZSgpO1xuXHR9XG5cblx0cHVibGljIHN0b3AoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3dyaXRhYmxlU3RyZWFtKSB7XG5cdFx0XHR0aGlzLl93cml0YWJsZVN0cmVhbS5lbmQoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgc2VuZEV2ZW50KGV2ZW50OiBEZWJ1Z1Byb3RvY29sLkV2ZW50KTogdm9pZCB7XG5cdFx0dGhpcy5fc2VuZCgnZXZlbnQnLCBldmVudCk7XG5cdH1cblxuXHRwdWJsaWMgc2VuZFJlc3BvbnNlKHJlc3BvbnNlOiBEZWJ1Z1Byb3RvY29sLlJlc3BvbnNlKTogdm9pZCB7XG5cdFx0aWYgKHJlc3BvbnNlLnNlcSA+IDApIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYGF0dGVtcHQgdG8gc2VuZCBtb3JlIHRoYW4gb25lIHJlc3BvbnNlIGZvciBjb21tYW5kICR7cmVzcG9uc2UuY29tbWFuZH1gKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2VuZCgncmVzcG9uc2UnLCByZXNwb25zZSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHNlbmRSZXF1ZXN0KGNvbW1hbmQ6IHN0cmluZywgYXJnczogYW55LCB0aW1lb3V0OiBudW1iZXIsIGNiOiAocmVzcG9uc2U6IERlYnVnUHJvdG9jb2wuUmVzcG9uc2UpID0+IHZvaWQpIDogdm9pZCB7XG5cblx0XHRjb25zdCByZXF1ZXN0OiBhbnkgPSB7XG5cdFx0XHRjb21tYW5kOiBjb21tYW5kXG5cdFx0fTtcblx0XHRpZiAoYXJncyAmJiBPYmplY3Qua2V5cyhhcmdzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRyZXF1ZXN0LmFyZ3VtZW50cyA9IGFyZ3M7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc2VuZCgncmVxdWVzdCcsIHJlcXVlc3QpO1xuXG5cdFx0aWYgKGNiKSB7XG5cdFx0XHR0aGlzLl9wZW5kaW5nUmVxdWVzdHMuc2V0KHJlcXVlc3Quc2VxLCBjYik7XG5cblx0XHRcdGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHRcdGNvbnN0IGNsYiA9IHRoaXMuX3BlbmRpbmdSZXF1ZXN0cy5nZXQocmVxdWVzdC5zZXEpO1xuXHRcdFx0XHRpZiAoY2xiKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGVuZGluZ1JlcXVlc3RzLmRlbGV0ZShyZXF1ZXN0LnNlcSk7XG5cdFx0XHRcdFx0Y2xiKG5ldyBSZXNwb25zZShyZXF1ZXN0LCAndGltZW91dCcpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGltZW91dCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gLS0tLSBwcm90ZWN0ZWQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdHByb3RlY3RlZCBkaXNwYXRjaFJlcXVlc3QocmVxdWVzdDogRGVidWdQcm90b2NvbC5SZXF1ZXN0KTogdm9pZCB7XG5cdH1cblxuXHQvLyAtLS0tIHByaXZhdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0cHJpdmF0ZSBfZW1pdEV2ZW50KGV2ZW50OiBEZWJ1Z1Byb3RvY29sLkV2ZW50KSB7XG5cdFx0dGhpcy5lbWl0KGV2ZW50LmV2ZW50LCBldmVudCk7XG5cdH1cblxuXHRwcml2YXRlIF9zZW5kKHR5cDogJ3JlcXVlc3QnIHwgJ3Jlc3BvbnNlJyB8ICdldmVudCcsIG1lc3NhZ2U6IERlYnVnUHJvdG9jb2wuUHJvdG9jb2xNZXNzYWdlKTogdm9pZCB7XG5cblx0XHRtZXNzYWdlLnR5cGUgPSB0eXA7XG5cdFx0bWVzc2FnZS5zZXEgPSB0aGlzLl9zZXF1ZW5jZSsrO1xuXG5cdFx0aWYgKHRoaXMuX3dyaXRhYmxlU3RyZWFtKSB7XG5cdFx0XHRjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG5cdFx0XHR0aGlzLl93cml0YWJsZVN0cmVhbS53cml0ZShgQ29udGVudC1MZW5ndGg6ICR7QnVmZmVyLmJ5dGVMZW5ndGgoanNvbiwgJ3V0ZjgnKX1cXHJcXG5cXHJcXG4ke2pzb259YCwgJ3V0ZjgnKTtcblx0XHR9XG5cdFx0dGhpcy5fc2VuZE1lc3NhZ2UuZmlyZShtZXNzYWdlKTtcblx0fVxuXG5cdHByaXZhdGUgX2hhbmRsZURhdGEoZGF0YTogQnVmZmVyKTogdm9pZCB7XG5cblx0XHR0aGlzLl9yYXdEYXRhID0gQnVmZmVyLmNvbmNhdChbdGhpcy5fcmF3RGF0YSwgZGF0YV0pO1xuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGlmICh0aGlzLl9jb250ZW50TGVuZ3RoID49IDApIHtcblx0XHRcdFx0aWYgKHRoaXMuX3Jhd0RhdGEubGVuZ3RoID49IHRoaXMuX2NvbnRlbnRMZW5ndGgpIHtcblx0XHRcdFx0XHRjb25zdCBtZXNzYWdlID0gdGhpcy5fcmF3RGF0YS50b1N0cmluZygndXRmOCcsIDAsIHRoaXMuX2NvbnRlbnRMZW5ndGgpO1xuXHRcdFx0XHRcdHRoaXMuX3Jhd0RhdGEgPSB0aGlzLl9yYXdEYXRhLnNsaWNlKHRoaXMuX2NvbnRlbnRMZW5ndGgpO1xuXHRcdFx0XHRcdHRoaXMuX2NvbnRlbnRMZW5ndGggPSAtMTtcblx0XHRcdFx0XHRpZiAobWVzc2FnZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRsZXQgbXNnOiBEZWJ1Z1Byb3RvY29sLlByb3RvY29sTWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuaGFuZGxlTWVzc2FnZShtc2cpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZW1pdEV2ZW50KG5ldyBFdmVudCgnZXJyb3InLCAnRXJyb3IgaGFuZGxpbmcgZGF0YTogJyArIChlICYmIGUubWVzc2FnZSkpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29udGludWU7XHQvLyB0aGVyZSBtYXkgYmUgbW9yZSBjb21wbGV0ZSBtZXNzYWdlcyB0byBwcm9jZXNzXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlkeCA9IHRoaXMuX3Jhd0RhdGEuaW5kZXhPZihQcm90b2NvbFNlcnZlci5UV09fQ1JMRik7XG5cdFx0XHRcdGlmIChpZHggIT09IC0xKSB7XG5cdFx0XHRcdFx0Y29uc3QgaGVhZGVyID0gdGhpcy5fcmF3RGF0YS50b1N0cmluZygndXRmOCcsIDAsIGlkeCk7XG5cdFx0XHRcdFx0Y29uc3QgbGluZXMgPSBoZWFkZXIuc3BsaXQoJ1xcclxcbicpO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHBhaXIgPSBsaW5lc1tpXS5zcGxpdCgvOiArLyk7XG5cdFx0XHRcdFx0XHRpZiAocGFpclswXSA9PSAnQ29udGVudC1MZW5ndGgnKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2NvbnRlbnRMZW5ndGggPSArcGFpclsxXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fcmF3RGF0YSA9IHRoaXMuX3Jhd0RhdGEuc2xpY2UoaWR4ICsgUHJvdG9jb2xTZXJ2ZXIuVFdPX0NSTEYubGVuZ3RoKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59XG4iXX0=

/***/ }),

/***/ 8153:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runDebugAdapter = void 0;
const Net = __webpack_require__(1808);
function runDebugAdapter(debugSession) {
    // parse arguments
    let port = 0;
    const args = process.argv.slice(2);
    args.forEach(function (val, index, array) {
        const portMatch = /^--server=(\d{4,5})$/.exec(val);
        if (portMatch) {
            port = parseInt(portMatch[1], 10);
        }
    });
    if (port > 0) {
        // start as a server
        console.error(`waiting for debug protocol on port ${port}`);
        Net.createServer((socket) => {
            console.error('>> accepted connection from client');
            socket.on('end', () => {
                console.error('>> client connection closed\n');
            });
            const session = new debugSession(false, true);
            session.setRunAsServer(true);
            session.start(socket, socket);
        }).listen(port);
    }
    else {
        // start a session
        //console.error('waiting for debug protocol on stdin/stdout');
        const session = new debugSession(false);
        process.on('SIGTERM', () => {
            session.shutdown();
        });
        session.start(process.stdin, process.stdout);
    }
}
exports.runDebugAdapter = runDebugAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuRGVidWdBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3J1bkRlYnVnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztnR0FHZ0c7OztBQUVoRywyQkFBMkI7QUFJM0IsU0FBZ0IsZUFBZSxDQUFDLFlBQWlDO0lBRWhFLGtCQUFrQjtJQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLFNBQVMsRUFBRTtZQUNkLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDYixvQkFBb0I7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hCO1NBQU07UUFFTixrQkFBa0I7UUFDbEIsOERBQThEO1FBQzlELE1BQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUMxQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzdDO0FBQ0YsQ0FBQztBQWxDRCwwQ0FrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0ICogYXMgTmV0IGZyb20gJ25ldCc7XG5cbmltcG9ydCB7IERlYnVnU2Vzc2lvbiB9IGZyb20gJy4vZGVidWdTZXNzaW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkRlYnVnQWRhcHRlcihkZWJ1Z1Nlc3Npb246IHR5cGVvZiBEZWJ1Z1Nlc3Npb24pIHtcblxuXHQvLyBwYXJzZSBhcmd1bWVudHNcblx0bGV0IHBvcnQgPSAwO1xuXHRjb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpO1xuXHRhcmdzLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaW5kZXgsIGFycmF5KSB7XG5cdFx0Y29uc3QgcG9ydE1hdGNoID0gL14tLXNlcnZlcj0oXFxkezQsNX0pJC8uZXhlYyh2YWwpO1xuXHRcdGlmIChwb3J0TWF0Y2gpIHtcblx0XHRcdHBvcnQgPSBwYXJzZUludChwb3J0TWF0Y2hbMV0sIDEwKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChwb3J0ID4gMCkge1xuXHRcdC8vIHN0YXJ0IGFzIGEgc2VydmVyXG5cdFx0Y29uc29sZS5lcnJvcihgd2FpdGluZyBmb3IgZGVidWcgcHJvdG9jb2wgb24gcG9ydCAke3BvcnR9YCk7XG5cdFx0TmV0LmNyZWF0ZVNlcnZlcigoc29ja2V0KSA9PiB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCc+PiBhY2NlcHRlZCBjb25uZWN0aW9uIGZyb20gY2xpZW50Jyk7XG5cdFx0XHRzb2NrZXQub24oJ2VuZCcsICgpID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignPj4gY2xpZW50IGNvbm5lY3Rpb24gY2xvc2VkXFxuJyk7XG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IHNlc3Npb24gPSBuZXcgZGVidWdTZXNzaW9uKGZhbHNlLCB0cnVlKTtcblx0XHRcdHNlc3Npb24uc2V0UnVuQXNTZXJ2ZXIodHJ1ZSk7XG5cdFx0XHRzZXNzaW9uLnN0YXJ0KHNvY2tldCwgc29ja2V0KTtcblx0XHR9KS5saXN0ZW4ocG9ydCk7XG5cdH0gZWxzZSB7XG5cblx0XHQvLyBzdGFydCBhIHNlc3Npb25cblx0XHQvL2NvbnNvbGUuZXJyb3IoJ3dhaXRpbmcgZm9yIGRlYnVnIHByb3RvY29sIG9uIHN0ZGluL3N0ZG91dCcpO1xuXHRcdGNvbnN0IHNlc3Npb24gPSBuZXcgZGVidWdTZXNzaW9uKGZhbHNlKTtcblx0XHRwcm9jZXNzLm9uKCdTSUdURVJNJywgKCkgPT4ge1xuXHRcdFx0c2Vzc2lvbi5zaHV0ZG93bigpO1xuXHRcdH0pO1xuXHRcdHNlc3Npb24uc3RhcnQocHJvY2Vzcy5zdGRpbiwgcHJvY2Vzcy5zdGRvdXQpO1xuXHR9XG59XG4iXX0=

/***/ }),

/***/ 9376:
/***/ ((module) => {

"use strict";


/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
const mask = (source, mask, output, offset, length) => {
  for (var i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
};

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
const unmask = (buffer, mask) => {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;
  for (var i = 0; i < length; i++) {
    buffer[i] ^= mask[i & 3];
  }
};

module.exports = { mask, unmask };


/***/ }),

/***/ 1891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


try {
  module.exports = __webpack_require__(9516)(__dirname);
} catch (e) {
  module.exports = __webpack_require__(9376);
}


/***/ }),

/***/ 9593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(4411)

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ 9516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(7147)
var path = __webpack_require__(1017)
var os = __webpack_require__(2037)

// Workaround to fix webpack's build warnings: 'the request of a dependency is an expression'
var runtimeRequire =  true ? require : 0 // eslint-disable-line

var vars = (process.config && process.config.variables) || {}
var prebuildsOnly = !!process.env.PREBUILDS_ONLY
var abi = process.versions.modules // TODO: support old node where this is undef
var runtime = isElectron() ? 'electron' : (isNwjs() ? 'node-webkit' : 'node')

var arch = os.arch()
var platform = os.platform()
var libc = process.env.LIBC || (isAlpine(platform) ? 'musl' : 'glibc')
var armv = process.env.ARM_VERSION || (arch === 'arm64' ? '8' : vars.arm_version) || ''
var uv = (process.versions.uv || '').split('.')[0]

module.exports = load

function load (dir) {
  return runtimeRequire(load.path(dir))
}

load.path = function (dir) {
  dir = path.resolve(dir || '.')

  try {
    var name = runtimeRequire(path.join(dir, 'package.json')).name.toUpperCase().replace(/-/g, '_')
    if (process.env[name + '_PREBUILD']) dir = process.env[name + '_PREBUILD']
  } catch (err) {}

  if (!prebuildsOnly) {
    var release = getFirst(path.join(dir, 'build/Release'), matchBuild)
    if (release) return release

    var debug = getFirst(path.join(dir, 'build/Debug'), matchBuild)
    if (debug) return debug
  }

  var prebuild = resolve(dir)
  if (prebuild) return prebuild

  var nearby = resolve(path.dirname(process.execPath))
  if (nearby) return nearby

  var target = [
    'platform=' + platform,
    'arch=' + arch,
    'runtime=' + runtime,
    'abi=' + abi,
    'uv=' + uv,
    armv ? 'armv=' + armv : '',
    'libc=' + libc,
    'node=' + process.versions.node,
    process.versions.electron ? 'electron=' + process.versions.electron : '',
     true ? 'webpack=true' : 0 // eslint-disable-line
  ].filter(Boolean).join(' ')

  throw new Error('No native build was found for ' + target + '\n    loaded from: ' + dir + '\n')

  function resolve (dir) {
    // Find matching "prebuilds/<platform>-<arch>" directory
    var tuples = readdirSync(path.join(dir, 'prebuilds')).map(parseTuple)
    var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0]
    if (!tuple) return

    // Find most specific flavor first
    var prebuilds = path.join(dir, 'prebuilds', tuple.name)
    var parsed = readdirSync(prebuilds).map(parseTags)
    var candidates = parsed.filter(matchTags(runtime, abi))
    var winner = candidates.sort(compareTags(runtime))[0]
    if (winner) return path.join(prebuilds, winner.file)
  }
}

function readdirSync (dir) {
  try {
    return fs.readdirSync(dir)
  } catch (err) {
    return []
  }
}

function getFirst (dir, filter) {
  var files = readdirSync(dir).filter(filter)
  return files[0] && path.join(dir, files[0])
}

function matchBuild (name) {
  return /\.node$/.test(name)
}

function parseTuple (name) {
  // Example: darwin-x64+arm64
  var arr = name.split('-')
  if (arr.length !== 2) return

  var platform = arr[0]
  var architectures = arr[1].split('+')

  if (!platform) return
  if (!architectures.length) return
  if (!architectures.every(Boolean)) return

  return { name, platform, architectures }
}

function matchTuple (platform, arch) {
  return function (tuple) {
    if (tuple == null) return false
    if (tuple.platform !== platform) return false
    return tuple.architectures.includes(arch)
  }
}

function compareTuples (a, b) {
  // Prefer single-arch prebuilds over multi-arch
  return a.architectures.length - b.architectures.length
}

function parseTags (file) {
  var arr = file.split('.')
  var extension = arr.pop()
  var tags = { file: file, specificity: 0 }

  if (extension !== 'node') return

  for (var i = 0; i < arr.length; i++) {
    var tag = arr[i]

    if (tag === 'node' || tag === 'electron' || tag === 'node-webkit') {
      tags.runtime = tag
    } else if (tag === 'napi') {
      tags.napi = true
    } else if (tag.slice(0, 3) === 'abi') {
      tags.abi = tag.slice(3)
    } else if (tag.slice(0, 2) === 'uv') {
      tags.uv = tag.slice(2)
    } else if (tag.slice(0, 4) === 'armv') {
      tags.armv = tag.slice(4)
    } else if (tag === 'glibc' || tag === 'musl') {
      tags.libc = tag
    } else {
      continue
    }

    tags.specificity++
  }

  return tags
}

function matchTags (runtime, abi) {
  return function (tags) {
    if (tags == null) return false
    if (tags.runtime !== runtime && !runtimeAgnostic(tags)) return false
    if (tags.abi !== abi && !tags.napi) return false
    if (tags.uv && tags.uv !== uv) return false
    if (tags.armv && tags.armv !== armv) return false
    if (tags.libc && tags.libc !== libc) return false

    return true
  }
}

function runtimeAgnostic (tags) {
  return tags.runtime === 'node' && tags.napi
}

function compareTags (runtime) {
  // Precedence: non-agnostic runtime, abi over napi, then by specificity.
  return function (a, b) {
    if (a.runtime !== b.runtime) {
      return a.runtime === runtime ? -1 : 1
    } else if (a.abi !== b.abi) {
      return a.abi ? -1 : 1
    } else if (a.specificity !== b.specificity) {
      return a.specificity > b.specificity ? -1 : 1
    } else {
      return 0
    }
  }
}

function isNwjs () {
  return !!(process.versions && process.versions.nw)
}

function isElectron () {
  if (process.versions && process.versions.electron) return true
  if (process.env.ELECTRON_RUN_AS_NODE) return true
  return typeof window !== 'undefined' && window.process && window.process.type === 'renderer'
}

function isAlpine (platform) {
  return platform === 'linux' && fs.existsSync('/etc/alpine-release')
}

// Exposed for unit tests
// TODO: move to lib
load.parseTags = parseTags
load.matchTags = matchTags
load.compareTags = compareTags
load.parseTuple = parseTuple
load.matchTuple = matchTuple
load.compareTuples = compareTuples


/***/ }),

/***/ 2257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }

  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false,
      }
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    const sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>')
    const sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<')
    const sameSemVer = this.semver.version === comp.semver.version
    const differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=')
    const oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, options) &&
      (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<')
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>')

    return (
      sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan
    )
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(2893)
const { re, t } = __webpack_require__(5765)
const cmp = __webpack_require__(7539)
const debug = __webpack_require__(4225)
const SemVer = __webpack_require__(6376)
const Range = __webpack_require__(6902)


/***/ }),

/***/ 6902:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.format()
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First, split based on boolean or ||
    this.raw = range
    this.set = range
      .split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0) {
        this.set = [first]
      } else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.format()
  }

  format () {
    this.range = this.set
      .map((comps) => {
        return comps.join(' ').trim()
      })
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    range = range.trim()

    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts = Object.keys(this.options).join(',')
    const memoKey = `parseRange:${memoOpts}:${range}`
    const cached = cache.get(memoKey)
    if (cached) {
      return cached
    }

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range)

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)

    // normalize spaces
    range = range.split(/\s+/).join(' ')

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    let rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))

    if (loose) {
      // in loose mode, throw out any that are not valid comparators
      rangeList = rangeList.filter(comp => {
        debug('loose invalid filter', comp, this.options)
        return !!comp.match(re[t.COMPARATORLOOSE])
      })
    }
    debug('range list', rangeList)

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const rangeMap = new Map()
    const comparators = rangeList.map(comp => new Comparator(comp, this.options))
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp]
      }
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has('')) {
      rangeMap.delete('')
    }

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}
module.exports = Range

const LRU = __webpack_require__(9593)
const cache = new LRU({ max: 1000 })

const parseOptions = __webpack_require__(2893)
const Comparator = __webpack_require__(2257)
const debug = __webpack_require__(4225)
const SemVer = __webpack_require__(6376)
const {
  re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace,
} = __webpack_require__(5765)

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const replaceTildes = (comp, options) =>
  comp.trim().split(/\s+/).map((c) => {
    return replaceTilde(c, options)
  }).join(' ')

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const replaceCarets = (comp, options) =>
  comp.trim().split(/\s+/).map((c) => {
    return replaceCaret(c, options)
  }).join(' ')

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map((c) => {
    return replaceXRange(c, options)
  }).join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<') {
        pr = '-0'
      }

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp.trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return (`${from} ${to}`).trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ 6376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(4225)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(3295)
const { re, t } = __webpack_require__(5765)

const parseOptions = __webpack_require__(2893)
const { compareIdentifiers } = __webpack_require__(6742)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier)
        this.inc('pre', identifier)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier)
        }
        this.inc('pre', identifier)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0]
            }
          } else {
            this.prerelease = [identifier, 0]
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format()
    this.raw = this.version
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 3507:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(3959)
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}
module.exports = clean


/***/ }),

/***/ 7539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const eq = __webpack_require__(8718)
const neq = __webpack_require__(1194)
const gt = __webpack_require__(1312)
const gte = __webpack_require__(5903)
const lt = __webpack_require__(1544)
const lte = __webpack_require__(2056)

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a === b

    case '!==':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ 9038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const parse = __webpack_require__(3959)
const { re, t } = __webpack_require__(5765)

const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    let next
    while ((next = re[t.COERCERTL].exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
}
module.exports = coerce


/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose)
  const versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
module.exports = compareBuild


/***/ }),

/***/ 7880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const compareLoose = (a, b) => compare(a, b, true)
module.exports = compareLoose


/***/ }),

/***/ 6269:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ 2378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(3959)
const eq = __webpack_require__(8718)

const diff = (version1, version2) => {
  if (eq(version1, version2)) {
    return null
  } else {
    const v1 = parse(version1)
    const v2 = parse(version2)
    const hasPre = v1.prerelease.length || v2.prerelease.length
    const prefix = hasPre ? 'pre' : ''
    const defaultResult = hasPre ? 'prerelease' : ''
    for (const key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}
module.exports = diff


/***/ }),

/***/ 8718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ 1312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ 5903:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ 253:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)

const inc = (version, release, options, identifier) => {
  if (typeof (options) === 'string') {
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(
      version instanceof SemVer ? version.version : version,
      options
    ).inc(release, identifier).version
  } catch (er) {
    return null
  }
}
module.exports = inc


/***/ }),

/***/ 1544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ 2056:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ 8679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ 7789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor


/***/ }),

/***/ 1194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ 3959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { MAX_LENGTH } = __webpack_require__(3295)
const { re, t } = __webpack_require__(5765)
const SemVer = __webpack_require__(6376)

const parseOptions = __webpack_require__(2893)
const parse = (version, options) => {
  options = parseOptions(options)

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  const r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

module.exports = parse


/***/ }),

/***/ 2358:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch


/***/ }),

/***/ 7559:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(3959)
const prerelease = (version, options) => {
  const parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}
module.exports = prerelease


/***/ }),

/***/ 9795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(6269)
const rcompare = (a, b, loose) => compare(b, a, loose)
module.exports = rcompare


/***/ }),

/***/ 3657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(8880)
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
module.exports = rsort


/***/ }),

/***/ 5712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(6902)
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}
module.exports = satisfies


/***/ }),

/***/ 1100:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(8880)
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
module.exports = sort


/***/ }),

/***/ 6397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(3959)
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ 1249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// just pre-load all the stuff that index.js lazily exports
const internalRe = __webpack_require__(5765)
module.exports = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: (__webpack_require__(3295).SEMVER_SPEC_VERSION),
  SemVer: __webpack_require__(6376),
  compareIdentifiers: (__webpack_require__(6742).compareIdentifiers),
  rcompareIdentifiers: (__webpack_require__(6742).rcompareIdentifiers),
  parse: __webpack_require__(3959),
  valid: __webpack_require__(6397),
  clean: __webpack_require__(3507),
  inc: __webpack_require__(253),
  diff: __webpack_require__(2378),
  major: __webpack_require__(8679),
  minor: __webpack_require__(7789),
  patch: __webpack_require__(2358),
  prerelease: __webpack_require__(7559),
  compare: __webpack_require__(6269),
  rcompare: __webpack_require__(9795),
  compareLoose: __webpack_require__(7880),
  compareBuild: __webpack_require__(8880),
  sort: __webpack_require__(1100),
  rsort: __webpack_require__(3657),
  gt: __webpack_require__(1312),
  lt: __webpack_require__(1544),
  eq: __webpack_require__(8718),
  neq: __webpack_require__(1194),
  gte: __webpack_require__(5903),
  lte: __webpack_require__(2056),
  cmp: __webpack_require__(7539),
  coerce: __webpack_require__(9038),
  Comparator: __webpack_require__(2257),
  Range: __webpack_require__(6902),
  satisfies: __webpack_require__(5712),
  toComparators: __webpack_require__(1042),
  maxSatisfying: __webpack_require__(5775),
  minSatisfying: __webpack_require__(1657),
  minVersion: __webpack_require__(5316),
  validRange: __webpack_require__(9042),
  outside: __webpack_require__(6826),
  gtr: __webpack_require__(7606),
  ltr: __webpack_require__(32),
  intersects: __webpack_require__(2937),
  simplifyRange: __webpack_require__(7908),
  subset: __webpack_require__(799),
}


/***/ }),

/***/ 3295:
/***/ ((module) => {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

module.exports = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH,
  MAX_SAFE_INTEGER,
  MAX_SAFE_COMPONENT_LENGTH,
}


/***/ }),

/***/ 4225:
/***/ ((module) => {

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 6742:
/***/ ((module) => {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
}


/***/ }),

/***/ 2893:
/***/ ((module) => {

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl']
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((o, k) => {
    o[k] = true
    return o
  }, {})
module.exports = parseOptions


/***/ }),

/***/ 5765:
/***/ ((module, exports, __webpack_require__) => {

const { MAX_SAFE_COMPONENT_LENGTH } = __webpack_require__(3295)
const debug = __webpack_require__(4225)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const createToken = (name, value, isGlobal) => {
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*')

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+')

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


/***/ }),

/***/ 7606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Determine if version is greater than all the versions possible in the range.
const outside = __webpack_require__(6826)
const gtr = (version, range, options) => outside(version, range, '>', options)
module.exports = gtr


/***/ }),

/***/ 2937:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(6902)
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}
module.exports = intersects


/***/ }),

/***/ 32:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const outside = __webpack_require__(6826)
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options) => outside(version, range, '<', options)
module.exports = ltr


/***/ }),

/***/ 5775:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const Range = __webpack_require__(6902)

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ 1657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const Range = __webpack_require__(6902)
const minSatisfying = (versions, range, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}
module.exports = minSatisfying


/***/ }),

/***/ 5316:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const Range = __webpack_require__(6902)
const gt = __webpack_require__(1312)

const minVersion = (range, loose) => {
  range = new Range(range, loose)

  let minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let setMin = null
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      const compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`)
      }
    })
    if (setMin && (!minver || gt(minver, setMin))) {
      minver = setMin
    }
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}
module.exports = minVersion


/***/ }),

/***/ 6826:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(6376)
const Comparator = __webpack_require__(2257)
const { ANY } = Comparator
const Range = __webpack_require__(6902)
const satisfies = __webpack_require__(5712)
const gt = __webpack_require__(1312)
const lt = __webpack_require__(1544)
const lte = __webpack_require__(2056)
const gte = __webpack_require__(5903)

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisfies the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let high = null
    let low = null

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

module.exports = outside


/***/ }),

/***/ 7908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __webpack_require__(5712)
const compare = __webpack_require__(6269)
module.exports = (versions, range, options) => {
  const set = []
  let first = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!first) {
        first = version
      }
    } else {
      if (prev) {
        set.push([first, prev])
      }
      prev = null
      first = null
    }
  }
  if (first) {
    set.push([first, null])
  }

  const ranges = []
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min)
    } else if (!max && min === v[0]) {
      ranges.push('*')
    } else if (!max) {
      ranges.push(`>=${min}`)
    } else if (min === v[0]) {
      ranges.push(`<=${max}`)
    } else {
      ranges.push(`${min} - ${max}`)
    }
  }
  const simplified = ranges.join(' || ')
  const original = typeof range.raw === 'string' ? range.raw : String(range)
  return simplified.length < original.length ? simplified : range
}


/***/ }),

/***/ 799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(6902)
const Comparator = __webpack_require__(2257)
const { ANY } = Comparator
const satisfies = __webpack_require__(5712)
const compare = __webpack_require__(6269)

// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true

const subset = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true
  }

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub) {
        continue OUTER
      }
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull) {
      return false
    }
  }
  return true
}

const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true
  }

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true
    } else if (options.includePrerelease) {
      sub = [new Comparator('>=0.0.0-0')]
    } else {
      sub = [new Comparator('>=0.0.0')]
    }
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true
    } else {
      dom = [new Comparator('>=0.0.0')]
    }
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=') {
      gt = higherGT(gt, c, options)
    } else if (c.operator === '<' || c.operator === '<=') {
      lt = lowerLT(lt, c, options)
    } else {
      eqSet.add(c.semver)
    }
  }

  if (eqSet.size > 1) {
    return null
  }

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0) {
      return null
    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
      return null
    }
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options)) {
      return null
    }

    if (lt && !satisfies(eq, String(lt), options)) {
      return null
    }

    for (const c of dom) {
      if (!satisfies(eq, String(c), options)) {
        return false
      }
    }

    return true
  }

  let higher, lower
  let hasDomLT, hasDomGT
  // if the subset has a prerelease, we need a comparator in the superset
  // with the same tuple and a prerelease, or it's not a subset
  let needDomLTPre = lt &&
    !options.includePrerelease &&
    lt.semver.prerelease.length ? lt.semver : false
  let needDomGTPre = gt &&
    !options.includePrerelease &&
    gt.semver.prerelease.length ? gt.semver : false
  // exception: <1.2.3-0 is the same as <1.2.3
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false
  }

  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false
        }
      }
      if (c.operator === '>' || c.operator === '>=') {
        higher = higherGT(gt, c, options)
        if (higher === c && higher !== gt) {
          return false
        }
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
        return false
      }
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false
        }
      }
      if (c.operator === '<' || c.operator === '<=') {
        lower = lowerLT(lt, c, options)
        if (lower === c && lower !== lt) {
          return false
        }
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
        return false
      }
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0) {
      return false
    }
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0) {
    return false
  }

  if (lt && hasDomGT && !gt && gtltComp !== 0) {
    return false
  }

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre) {
    return false
  }

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp < 0 ? a
    : comp > 0 ? b
    : b.operator === '<' && a.operator === '<=' ? b
    : a
}

module.exports = subset


/***/ }),

/***/ 1042:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(6902)

// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set
    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '))

module.exports = toComparators


/***/ }),

/***/ 9042:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(6902)
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}
module.exports = validRange


/***/ }),

/***/ 2372:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DartDebugSession = void 0;
/* eslint-disable no-underscore-dangle */
const debugadapter_1 = __webpack_require__(9955);
const fs = __webpack_require__(7147);
const os = __webpack_require__(2037);
const path = __webpack_require__(1017);
const dart_1 = __webpack_require__(7355);
const vm_service_1 = __webpack_require__(9947);
const constants_1 = __webpack_require__(5628);
const enums_1 = __webpack_require__(7341);
const processes_1 = __webpack_require__(5837);
const package_map_1 = __webpack_require__(143);
const utils_1 = __webpack_require__(4586);
const array_1 = __webpack_require__(7434);
const colors_1 = __webpack_require__(4951);
const fs_1 = __webpack_require__(300);
const stack_trace_1 = __webpack_require__(564);
const dart_debug_protocol_1 = __webpack_require__(6157);
const logging_1 = __webpack_require__(8257);
const threads_1 = __webpack_require__(783);
const utils_2 = __webpack_require__(4446);
const maxValuesToCallToString = 100;
// Prefix that appears at the start of stack frame names that are unoptimized
// which we'd prefer not to show to the user.
const unoptimizedPrefix = "[Unoptimized] ";
const trailingSemicolonPattern = new RegExp(`;\\s*$`, "m");
const logDapTraffic = false;
const threadExceptionExpression = "$_threadException";
// TODO: supportsSetVariable
// TODO: class variables?
// TODO: library variables?
// stepBackRequest(response: DebugProtocol.StepBackResponse, args: DebugProtocol.StepBackArguments): void;
// restartFrameRequest(response: DebugProtocol.RestartFrameResponse, args: DebugProtocol.RestartFrameArguments): void;
// completionsRequest(response: DebugProtocol.CompletionsResponse, args: DebugProtocol.CompletionsArguments): void;
class DartDebugSession extends debugadapter_1.DebugSession {
    constructor() {
        // Don't allow unhandled promises to terminate the DA, instead send a log event
        // to the client.
        // TODO: Track down and fix anywhere that unhandled promises can occur!
        process.on("unhandledRejection", (reason, promise) => {
            this.logger.error(`UNHANDLED: ${reason}, ${promise}`);
        });
        super();
        /** The additional process IDs to terminate when terminating a debugging session.
         *
         * A Set is used so a Process ID does not appear multiple times within the collection as
         * that can cause a (eg. testing) session to be terminated prematurely while waiting for it to end.
         */
        this.additionalPidsToTerminate = new Set();
        this.expectAdditionalPidToTerminate = false;
        this.additionalPidCompleter = new utils_1.PromiseCompleter();
        // We normally track the pid from the VM service to terminate the VM afterwards, but for Flutter Run it's
        // a remote PID and therefore doesn't make sense to try and terminate.
        this.allowTerminatingVmServicePid = true;
        // Normally we don't connect to the VM when running no noDebug mode, but for
        // Flutter, this means we can't call service extensions (for ex. toggling
        // debug modes) so we allow it to override this (and then we skip things
        // like breakpoints). We can't do it always, because some functionality
        // (such as running multiple test suites) will break by having multiple
        // potential VM services come and go.
        // https://github.com/Dart-Code/Dart-Code/issues/1673
        this.connectVmEvenForNoDebug = false;
        this.allowWriteServiceInfo = true;
        this.processExited = false;
        this.sendLogsToClient = false;
        this.debugSdkLibraries = false;
        this.debugExternalPackageLibraries = false;
        this.showDartDeveloperLogs = true;
        this.subscribeToStdout = false;
        this.useInspectorNotificationsForWidgetErrors = false;
        this.evaluateGettersInDebugViews = false;
        this.evaluateToStringInDebugViews = false;
        this.dartCapabilities = dart_1.DartCapabilities.empty;
        this.vmServiceCapabilities = vm_service_1.VmServiceCapabilities.empty;
        this.useWriteServiceInfo = false;
        this.deleteServiceFileAfterRead = false;
        this.sendStdOutToConsole = true;
        this.supportsObservatoryWebApp = true;
        this.parseVmServiceUriFromStdOut = true;
        this.requiresProgram = true;
        this.processExit = Promise.resolve({ code: 0, signal: null });
        this.maxLogLineLength = 1000; // This should always be overriden in launch/attach requests but we have it here for narrower types.
        this.shouldKillProcessOnTerminate = true;
        this.logCategory = enums_1.LogCategory.General; // This isn't used as General, since both debuggers override it.
        this.supportsRunInTerminalRequest = false;
        this.supportsDebugInternalLibraries = false;
        this.isTerminating = false;
        this.logger = new logging_1.DebugAdapterLogger(this, enums_1.LogCategory.VmService);
        this.urlExposeCompleters = {};
        // Logging
        this.lastLoggingEvent = Promise.resolve();
        this.logBuffer = {};
        this.threadManager = new threads_1.ThreadManager(this.logger, this);
    }
    get shouldConnectDebugger() {
        return !this.noDebug || this.connectVmEvenForNoDebug;
    }
    logDapRequest(name, args) {
        if (!logDapTraffic)
            return;
        this.log(`DAP-REQ: ${name}: ${JSON.stringify(args)}`);
    }
    logDapResponse(resp) {
        if (!logDapTraffic)
            return;
        this.log(`DAP-RESP: ${JSON.stringify(resp)}`);
    }
    logDapEvent(evt) {
        if (!logDapTraffic)
            return;
        this.log(`DAP-EVT: ${JSON.stringify(evt)}`);
    }
    initializeRequest(response, args) {
        this.logDapRequest("initializeRequest", args);
        this.supportsRunInTerminalRequest = !!args.supportsRunInTerminalRequest;
        response.body = response.body || {};
        response.body.supportsConfigurationDoneRequest = true;
        response.body.supportsEvaluateForHovers = true;
        response.body.supportsDelayedStackTraceLoading = true;
        response.body.supportsConditionalBreakpoints = true;
        response.body.supportsLogPoints = true;
        response.body.supportsTerminateRequest = true;
        response.body.supportsRestartFrame = true;
        response.body.supportsClipboardContext = true;
        response.body.exceptionBreakpointFilters = [
            { filter: "All", label: "All Exceptions", default: false },
            { filter: "Unhandled", label: "Uncaught Exceptions", default: true },
        ];
        this.logDapResponse(response);
        this.sendResponse(response);
    }
    launchRequest(response, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("launchRequest", args);
            if (!args || !args.dartSdkPath || (this.requiresProgram && !args.program)) {
                this.logToUser("Unable to restart debugging. Please try ending the debug session and starting again.\n");
                this.logDapEvent(new debugadapter_1.TerminatedEvent());
                this.sendEvent(new debugadapter_1.TerminatedEvent());
                return;
            }
            // Force relative paths to absolute.
            if (args.program && !path.isAbsolute(args.program)) {
                if (!args.cwd) {
                    return this.errorResponse(response, "Unable to start debugging. program was specified as a relative path without cwd.");
                }
                args.program = path.join(args.cwd, args.program);
            }
            this.startProgress(constants_1.debugLaunchProgressId, "Launching");
            this.shouldKillProcessOnTerminate = true;
            this.cwd = args.cwd;
            this.noDebug = args.noDebug;
            // Set default exception mode based on noDebug. This will be sent to threads
            // prior to VS Code sending (or, in the case of noDebug, due to not sending)
            // the exception mode.
            yield this.threadManager.setExceptionPauseMode(this.noDebug ? "None" : "Unhandled");
            this.packageMap = package_map_1.PackageMap.load(this.logger, package_map_1.PackageMap.findPackagesFile(args.program || args.cwd));
            this.dartCapabilities.version = (_a = (0, fs_1.getSdkVersion)(this.logger, { sdkRoot: args.dartSdkPath })) !== null && _a !== void 0 ? _a : this.dartCapabilities.version;
            this.useWriteServiceInfo = this.allowWriteServiceInfo && this.dartCapabilities.supportsWriteServiceInfo;
            this.deleteServiceFileAfterRead = !!args.deleteServiceInfoFile;
            this.supportsDebugInternalLibraries = this.dartCapabilities.supportsDebugInternalLibraries;
            this.readSharedArgs(args);
            this.logDapResponse(response);
            this.sendResponse(response);
            if (this.useWriteServiceInfo) {
                this.parseVmServiceUriFromStdOut = false;
                this.vmServiceInfoFile = path.join(os.tmpdir(), `dart-vm-service-${(0, fs_1.getRandomInt)(0x1000, 0x10000).toString(16)}.json`);
            }
            const terminalType = args.console === "terminal"
                ? "integrated"
                : args.console === "externalTerminal"
                    ? "external"
                    : undefined;
            try {
                // Terminal mode is only supported if we can use writeServiceInfo.
                // TODO: Move useWriteServiceInfo check to the client, so other clients do not need to provide this.
                if (terminalType && !this.supportsRunInTerminalRequest) {
                    this.log("Ignoring request to run in terminal because client does not support runInTerminalRequest", enums_1.LogSeverity.Warn);
                }
                if (terminalType && this.useWriteServiceInfo && this.supportsRunInTerminalRequest) {
                    this.deleteServiceFileAfterRead = true;
                    this.childProcess = yield this.spawnRemoteEditorProcess(args, terminalType);
                }
                else {
                    const process = yield this.spawnProcess(args);
                    this.childProcess = process;
                    this.processExited = false;
                    this.processExit = new Promise((resolve) => process.on("exit", (code, signal) => resolve({ code, signal })));
                    process.stdout.setEncoding("utf8");
                    process.stdout.on("data", (data) => __awaiter(this, void 0, void 0, function* () {
                        let match = null;
                        if (this.shouldConnectDebugger && this.parseVmServiceUriFromStdOut && !this.vmService) {
                            match = constants_1.vmServiceListeningBannerPattern.exec(data.toString());
                        }
                        if (match)
                            yield this.initDebugger(this.convertObservatoryUriToVmServiceUri(match[1]));
                        else if (this.sendStdOutToConsole)
                            this.logStdout(data.toString());
                    }));
                    process.stderr.setEncoding("utf8");
                    process.stderr.on("data", (data) => {
                        this.logToUserBuffered(data.toString(), "stderr");
                    });
                    process.on("error", (error) => {
                        this.logToUser(`${error}\n`, "stderr");
                    });
                    // tslint:disable-next-line: no-floating-promises
                    this.processExit.then(({ code, signal }) => __awaiter(this, void 0, void 0, function* () {
                        this.stopServiceFilePolling(this.deleteServiceFileAfterRead);
                        this.processExited = true;
                        this.log(`Process exited (${signal ? `${signal}`.toLowerCase() : code})`);
                        if (!code && !signal)
                            this.logToUser("Exited\n");
                        else
                            this.logToUser(`Exited (${signal ? `${signal}`.toLowerCase() : code})\n`);
                        // To reduce the chances of losing async logs, wait a short period
                        // before terminating.
                        yield this.raceIgnoringErrors(() => this.lastLoggingEvent, 500);
                        setImmediate(() => {
                            this.logDapEvent(new debugadapter_1.TerminatedEvent());
                            this.sendEvent(new debugadapter_1.TerminatedEvent());
                        });
                    }));
                }
                if (this.useWriteServiceInfo && this.shouldConnectDebugger) {
                    const url = yield this.startServiceFilePolling();
                    yield this.initDebugger(url.toString());
                }
            }
            catch (e) {
                this.logToUser(`Unable to start debugging: ${e}`);
                this.sendEvent(new debugadapter_1.TerminatedEvent());
                return;
            }
            if (!this.shouldConnectDebugger) {
                this.endProgress(constants_1.debugLaunchProgressId);
                this.logDapEvent(new debugadapter_1.InitializedEvent());
                this.sendEvent(new debugadapter_1.InitializedEvent());
                // If we're not connecting a debugger and we spawned a remote process, we have
                // no way of knowing when the process terminates and will have to just end the debug
                // session immediately (it has no value anyway).
                if (this.childProcess && this.childProcess instanceof RemoteEditorTerminalProcess)
                    setImmediate(() => this.sendEvent(new debugadapter_1.TerminatedEvent()));
            }
        });
    }
    readSharedArgs(args) {
        this.debugExternalPackageLibraries = args.debugExternalPackageLibraries;
        this.debugSdkLibraries = args.debugSdkLibraries;
        this.evaluateGettersInDebugViews = args.evaluateGettersInDebugViews;
        this.evaluateToStringInDebugViews = args.evaluateToStringInDebugViews;
        this.logFile = args.vmServiceLogFile;
        this.maxLogLineLength = args.maxLogLineLength;
        this.sendLogsToClient = !!args.sendLogsToClient;
        this.showDartDeveloperLogs = args.showDartDeveloperLogs;
        this.toolEnv = args.toolEnv;
        this.useInspectorNotificationsForWidgetErrors = !!args.useInspectorNotificationsForWidgetErrors;
    }
    attachRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("attachRequest", args);
            const vmServiceUri = (args.vmServiceUri || args.observatoryUri);
            if (!args || (!vmServiceUri && !args.vmServiceInfoFile)) {
                return this.errorResponse(response, "Unable to attach; no VM service address or service info file provided.");
            }
            this.startProgress(constants_1.debugLaunchProgressId, "Waiting for application");
            this.shouldKillProcessOnTerminate = false;
            this.cwd = args.cwd;
            this.readSharedArgs(args);
            this.log(`Attaching to process via ${vmServiceUri || args.vmServiceInfoFile}`);
            // If we were given an explicity packages path, use it (otherwise we'll try
            // to extract from the VM)
            if (args.packages) {
                // Support relative paths
                if (args.packages && !path.isAbsolute(args.packages))
                    args.packages = args.cwd ? path.join(args.cwd, args.packages) : args.packages;
                try {
                    this.packageMap = package_map_1.PackageMap.load(this.logger, package_map_1.PackageMap.findPackagesFile(args.packages));
                }
                catch (e) {
                    this.errorResponse(response, `Unable to load packages file: ${e}`);
                }
            }
            this.logDapResponse(response);
            this.sendResponse(response);
            let url;
            try {
                if (vmServiceUri) {
                    // TODO: Should we do this here? DDS won't have a /ws on the end so
                    // this may end up being incorrect.
                    url = this.convertObservatoryUriToVmServiceUri(vmServiceUri);
                }
                else {
                    this.vmServiceInfoFile = args.vmServiceInfoFile;
                    this.updateProgress(constants_1.debugLaunchProgressId, `Waiting for ${this.vmServiceInfoFile}`);
                    url = yield this.startServiceFilePolling();
                    this.endProgress(constants_1.debugLaunchProgressId);
                }
                this.subscribeToStdout = true;
                yield this.initDebugger(url);
            }
            catch (e) {
                const messageSuffix = args.vmServiceInfoFile ? `\n    VM info was read from ${args.vmServiceInfoFile}` : "";
                this.logToUser(`Unable to connect to VM service at ${url || "??"}${messageSuffix}\n    ${e}`);
                this.sendEvent(new debugadapter_1.TerminatedEvent());
                return;
            }
        });
    }
    sourceFileForArgs(args) {
        return args.cwd ? path.relative(args.cwd, args.program) : args.program;
    }
    spawnProcess(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let dartPath = path.join(args.dartSdkPath, constants_1.dartVMPath);
            const execution = this.buildExecutionInfo(dartPath, args);
            dartPath = execution.executable;
            const appArgs = execution.args;
            this.log(`Spawning ${dartPath} with args ${JSON.stringify(appArgs)}`);
            if (args.cwd)
                this.log(`..  in ${args.cwd}`);
            const env = Object.assign({}, args.toolEnv, args.env);
            const process = (0, processes_1.safeSpawn)(args.cwd, dartPath, appArgs, env);
            this.log(`    PID: ${process.pid}`);
            return process;
        });
    }
    spawnRemoteEditorProcess(args, terminalType) {
        return __awaiter(this, void 0, void 0, function* () {
            const dartPath = path.join(args.dartSdkPath, constants_1.dartVMPath);
            const execution = this.buildExecutionInfo(dartPath, args);
            const appArgs = execution.args;
            this.log(`Spawning ${dartPath} remotely with args ${JSON.stringify(appArgs)}`);
            if (args.cwd)
                this.log(`..  in ${args.cwd}`);
            this.remoteEditorTerminalLaunched = new Promise((resolve, reject) => {
                this.sendRequest("runInTerminal", {
                    args: [dartPath].concat(appArgs),
                    cwd: args.cwd,
                    env: args.env,
                    kind: terminalType,
                    title: args.name,
                }, 15000, (response) => {
                    if (response.success) {
                        this.log(`    PID: ${process.pid}`);
                        const resp = response;
                        // Do not fall back to `resp.body.shellProcessId` here, as terminating the shell
                        // during shutdown will result in an error on Windows being shown to the user.
                        // https://github.com/Dart-Code/Dart-Code/issues/2750
                        //
                        // When running in debug mode, we should have the real PID via the VM Service
                        // anyway, and when not running in debug mode we "terminate" immediately and
                        // would not be showing a debug toolbar for the user to terminate anyway (any
                        // disconnect event we get is because the process already finished).
                        resolve(new RemoteEditorTerminalProcess(resp.body.processId));
                    }
                    else {
                        reject(response.message);
                    }
                });
            });
            return this.remoteEditorTerminalLaunched;
        });
    }
    buildExecutionInfo(binPath, args) {
        let allArgs = [];
        if (args.vmAdditionalArgs)
            allArgs = allArgs.concat(args.vmAdditionalArgs);
        if (this.shouldConnectDebugger) {
            this.expectAdditionalPidToTerminate = true;
            allArgs.push(`--enable-vm-service=${args.vmServicePort}`);
            allArgs.push("--pause_isolates_on_start=true");
            if (this.dartCapabilities.supportsNoServeDevTools)
                allArgs.push("--no-serve-devtools");
        }
        if (this.useWriteServiceInfo && this.vmServiceInfoFile) {
            allArgs.push(`--write-service-info=${(0, utils_2.formatPathForVm)(this.vmServiceInfoFile)}`);
            allArgs.push("-DSILENT_OBSERVATORY=true");
        }
        // Replace in any custom tool.
        const customTool = {
            replacesArgs: args.customToolReplacesArgs,
            script: args.customTool,
        };
        const execution = (0, utils_1.usingCustomScript)(binPath, allArgs, customTool);
        allArgs = execution.args;
        if (args.toolArgs)
            allArgs = allArgs.concat(args.toolArgs);
        allArgs.push(this.sourceFileForArgs(args));
        if (args.args)
            allArgs = allArgs.concat(args.args);
        return {
            args: allArgs,
            executable: execution.executable,
        };
    }
    convertObservatoryUriToVmServiceUri(uri) {
        const wsUri = uri.trim();
        if (wsUri.endsWith("/ws"))
            return wsUri;
        else if (wsUri.endsWith("/ws/"))
            return wsUri.substr(0, wsUri.length - 1);
        else if (wsUri.endsWith("/"))
            return `${wsUri}ws`;
        else
            return `${wsUri}/ws`;
    }
    log(message, severity = enums_1.LogSeverity.Info) {
        if (this.logFile) {
            if (!this.logStream) {
                this.logStream = fs.createWriteStream(this.logFile);
            }
            this.logStream.write(`[${(new Date()).toLocaleTimeString()}]: `);
            if (this.maxLogLineLength && message.length > this.maxLogLineLength)
                this.logStream.write(message.substring(0, this.maxLogLineLength) + "…\r\n");
            else
                this.logStream.write(message.trim() + "\r\n");
        }
        if (this.sendLogsToClient)
            this.sendEvent(new debugadapter_1.Event("dart.log", { message, severity, category: enums_1.LogCategory.VmService }));
    }
    startServiceFilePolling() {
        this.logger.info(`Starting to poll for file ${this.vmServiceInfoFile}`);
        // Ensure we stop if we were already running, to avoid leaving timers running
        // if this is somehow called twice.
        this.stopServiceFilePolling(false);
        if (this.vmServiceInfoFileCompleter)
            this.vmServiceInfoFileCompleter.reject("Cancelled");
        this.vmServiceInfoFileCompleter = new utils_1.PromiseCompleter();
        this.serviceInfoPollTimer = setInterval(() => this.tryReadServiceFile(), 50);
        return this.vmServiceInfoFileCompleter.promise;
    }
    stopServiceFilePolling(allowDelete) {
        if (this.serviceInfoPollTimer) {
            this.logger.info(`Stopping polling for file ${this.vmServiceInfoFile}`);
            clearInterval(this.serviceInfoPollTimer);
            this.serviceInfoPollTimer = undefined;
        }
        if (allowDelete
            && this.vmServiceInfoFile
            && fs.existsSync(this.vmServiceInfoFile)) {
            try {
                fs.unlinkSync(this.vmServiceInfoFile);
                this.vmServiceInfoFile = undefined;
            }
            catch (e) {
                // Don't complain if we failed - the file may have been cleaned up
                // in the meantime.
            }
        }
    }
    tryReadServiceFile() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.vmServiceInfoFile || !fs.existsSync(this.vmServiceInfoFile))
                return;
            try {
                const serviceInfoJson = fs.readFileSync(this.vmServiceInfoFile, "utf8");
                // It's possible we read the file before the VM had started writing it, so
                // do some crude checks and bail to reduce the chances of logging half-written
                // files as errors.
                if (serviceInfoJson.length < 2 || !serviceInfoJson.trimRight().endsWith("}"))
                    return;
                const serviceInfo = JSON.parse(serviceInfoJson);
                this.logger.info(`Successfully read JSON from ${this.vmServiceInfoFile} which indicates URI ${serviceInfo.uri}`);
                this.stopServiceFilePolling(this.deleteServiceFileAfterRead);
                // Ensure we don't try to start anything before we've finished
                // setting up the process when running remotely.
                if (this.remoteEditorTerminalLaunched) {
                    yield this.remoteEditorTerminalLaunched;
                    yield new Promise((resolve) => setTimeout(resolve, 5));
                }
                (_a = this.vmServiceInfoFileCompleter) === null || _a === void 0 ? void 0 : _a.resolve(serviceInfo.uri);
            }
            catch (e) {
                this.logger.error(e);
                (_b = this.vmServiceInfoFileCompleter) === null || _b === void 0 ? void 0 : _b.reject(e);
            }
        });
    }
    initDebugger(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            // On some cloud providers we get an IPv6 loopback which fails to connect
            // correctly. Assume that if we get this, it's safe to use the "localhost" hostname.
            uri = uri.replace("[::]", "localhost");
            this.log(`Initialising debugger for ${uri}`);
            // Send the uri back to the editor so it can be used to launch browsers etc.
            let browserFriendlyUri;
            if (uri.endsWith("/ws")) {
                browserFriendlyUri = uri.substring(0, uri.length - 2);
                if (browserFriendlyUri.startsWith("ws:"))
                    browserFriendlyUri = "http:" + browserFriendlyUri.substring(3);
            }
            else {
                browserFriendlyUri = uri;
            }
            const evt = new debugadapter_1.Event("dart.debuggerUris", {
                // If we don't support Observatory, don't send its URL back to the editor.
                observatoryUri: this.supportsObservatoryWebApp ? browserFriendlyUri.toString() : undefined,
                vmServiceUri: browserFriendlyUri.toString(),
            });
            this.logDapEvent(evt);
            this.sendEvent(evt);
            if (!this.shouldConnectDebugger)
                return;
            this.debuggerInit = new Promise((resolve, reject) => {
                this.log(`Connecting to VM Service at ${uri}`);
                this.logToUser(`Connecting to VM Service at ${uri}\n`);
                this.vmService = new dart_debug_protocol_1.VmServiceConnection(uri);
                this.vmService.onLogging((message) => this.log(message));
                // TODO: Extract some code here and change to async/await. This is
                // super confusing, for ex. it's not clear the resolve() inside onOpen
                // fires immediately opon opening, not when all the code in the getVM
                // callback fires (so it may as well have come first - unless it's
                // a bug/race and it was supposed to be after all the setup!).
                this.vmService.onOpen(() => __awaiter(this, void 0, void 0, function* () {
                    if (!this.vmService)
                        return;
                    // Read the version to update capabilities before doing anything else.
                    yield this.vmService.getVersion().then((versionResult) => __awaiter(this, void 0, void 0, function* () {
                        const version = versionResult.result;
                        this.vmServiceCapabilities.version = `${version.major}.${version.minor}.0`;
                        if (!this.vmService)
                            return;
                        // Subscribe to streams before we get a list of active isolates, otherwise we could have a race
                        // between getting the list and then starting to listen for events.
                        yield this.subscribeToStreams();
                        yield this.vmService.getVM().then((vmResult) => __awaiter(this, void 0, void 0, function* () {
                            if (!this.vmService)
                                return;
                            const vm = vmResult.result;
                            // If we own this process (we launched it, didn't attach) and the PID we get from the VM service is different, then
                            // we should keep a ref to this process to terminate when we quit. This avoids issues where our process is a shell
                            // (we use shell execute to fix issues on Windows) and the kill signal isn't passed on correctly.
                            // See: https://github.com/Dart-Code/Dart-Code/issues/907
                            if (this.allowTerminatingVmServicePid && this.childProcess) {
                                this.recordAdditionalPid(vm.pid);
                            }
                            const isolates = (yield Promise.all(vm.isolates.map((isolateRef) => this.vmService.getIsolate(isolateRef.id))))
                                // Filter to just Isolates, in case we got an collected Sentinels.
                                // https://github.com/flutter/devtools/issues/2324#issuecomment-690128227
                                .filter((resp) => resp.result.type === "Isolate");
                            // TODO: Is it valid to assume the first (only?) isolate with a rootLib is the one we care about here?
                            // If it's always the first, could we even just query the first instead of getting them all before we
                            // start the other processing?
                            const rootIsolateResult = isolates.find((isolate) => !!isolate.result.rootLib);
                            const rootIsolate = rootIsolateResult && rootIsolateResult.result;
                            if (rootIsolate && rootIsolate.extensionRPCs) {
                                // If we're attaching, we won't see ServiceExtensionAdded events for extensions already loaded so
                                // we need to enumerate them here.
                                rootIsolate.extensionRPCs.forEach((id) => this.notifyServiceExtensionAvailable(id, rootIsolate.id));
                            }
                            if (!this.packageMap) {
                                // TODO: There's a race here if the isolate is not yet runnable, it might not have rootLib yet. We don't
                                // currently fill this in later.
                                if (rootIsolate && rootIsolate.rootLib)
                                    this.packageMap = package_map_1.PackageMap.load(this.logger, package_map_1.PackageMap.findPackagesFile(this.convertVMUriToSourcePath(rootIsolate.rootLib.uri)));
                            }
                            yield Promise.all(isolates.map((response) => __awaiter(this, void 0, void 0, function* () {
                                const isolate = response.result;
                                yield this.threadManager.registerThread(isolate, isolate.runnable ? "IsolateRunnable" : "IsolateStart");
                                if (isolate.pauseEvent.kind.startsWith("Pause")) {
                                    yield this.handlePauseEvent(isolate.pauseEvent);
                                }
                            })));
                            // Set a timer for memory updates.
                            if (this.pollforMemoryMs)
                                setTimeout(() => this.pollForMemoryUsage(), this.pollforMemoryMs);
                            this.endProgress(constants_1.debugLaunchProgressId);
                            this.logDapEvent(new debugadapter_1.InitializedEvent());
                            this.sendEvent(new debugadapter_1.InitializedEvent());
                        }));
                    }));
                    resolve();
                }));
                this.vmService.onClose((code, message) => {
                    this.log(`VM service connection closed: ${code} (${message})`);
                    if (this.logStream) {
                        this.logStream.end();
                        this.logStream = undefined;
                        // Wipe out the filename so if a message arrives late, it doesn't
                        // wipe out the logfile with just a "process exited" or similar message.
                        this.logFile = undefined;
                    }
                    // If we don't have a process (eg. we're attached) or we ran as a terminal, then this is our signal to quit,
                    // since we won't get a process exit event.
                    if (!this.childProcess || this.childProcess instanceof RemoteEditorTerminalProcess) {
                        this.logDapEvent(new debugadapter_1.TerminatedEvent());
                        this.sendEvent(new debugadapter_1.TerminatedEvent());
                    }
                    else {
                        // In some cases the VM service closes but we never get the exit/close events from the process
                        // so this is a fallback to terminate the session after a short period. Without this, we have
                        // issues like https://github.com/Dart-Code/Dart-Code/issues/1268 even though when testing from
                        // the terminal the app does terminate as expected.
                        // 2019-07-10: Increased delay because when we tell Flutter to stop the VM service quits quickly and
                        // this code results in a TerminatedEvent() even though the process hasn't quit. The TerminatedEvent()
                        // results in VS Code sending disconnectRequest() and we then try to more forefully kill.
                        setTimeout(() => {
                            if (!this.processExited) {
                                this.logDapEvent(new debugadapter_1.TerminatedEvent());
                                this.sendEvent(new debugadapter_1.TerminatedEvent());
                            }
                        }, 5000);
                    }
                });
                this.vmService.onError((error) => {
                    reject(error);
                });
            });
            return this.debuggerInit;
        });
    }
    recordAdditionalPid(pid) {
        this.additionalPidsToTerminate.add(pid);
        this.additionalPidCompleter.resolve();
    }
    subscribeToStreams() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.vmService)
                return;
            const serviceStreamName = this.vmServiceCapabilities.serviceStreamIsPublic ? "Service" : "_Service";
            yield Promise.all([
                this.vmService.on("Isolate", (event) => this.handleIsolateEvent(event)),
                this.vmService.on("Extension", (event) => this.handleExtensionEvent(event)),
                this.vmService.on("Debug", (event) => this.handleDebugEvent(event)),
                this.vmService.on(serviceStreamName, (event) => this.handleServiceEvent(event)),
            ]);
            if (this.vmServiceCapabilities.hasLoggingStream && this.showDartDeveloperLogs) {
                yield this.vmService.on("Logging", (event) => this.handleLoggingEvent(event)).catch((e) => {
                    // For web, the protocol version says this is supported, but it throws.
                    // TODO: Remove this catch block if/when the stable release does not throw.
                    this.logger.info((0, utils_1.errorString)(e));
                });
            }
            if (this.subscribeToStdout) {
                yield this.vmService.on("Stdout", (event) => this.handleStdoutEvent(event)).catch((e) => {
                    // Some embedders may not provide Stdout and it's not clear if they will throw, so
                    // just catch/log errors here.
                    this.logger.info((0, utils_1.errorString)(e));
                });
            }
        });
    }
    terminate(force) {
        return __awaiter(this, void 0, void 0, function* () {
            const signal = force ? "SIGKILL" : "SIGINT";
            const request = force ? "DISC" : "TERM";
            this.log(`${request}: Requested to terminate with ${signal}...`);
            this.stopServiceFilePolling(this.deleteServiceFileAfterRead);
            if (this.shouldKillProcessOnTerminate && this.childProcess && !this.processExited) {
                this.log(`${request}: Terminating processes...`);
                for (const pid of this.additionalPidsToTerminate) {
                    if (pid === this.childProcess.pid)
                        continue;
                    try {
                        this.log(`${request}: Terminating related process ${pid} with ${signal}...`);
                        process.kill(pid, signal);
                        // Don't remove these PIDs from the list as we don't know that they actually quit yet.
                    }
                    catch (e) {
                        // Sometimes this process will have already gone away (eg. the app finished/terminated)
                        // so logging here just results in lots of useless info.
                    }
                }
                if (!this.processExited) {
                    if (this.childProcess.pid) {
                        try {
                            this.log(`${request}: Terminating main process with ${signal}...`);
                            process.kill(this.childProcess.pid, signal);
                        }
                        catch (e) {
                            // This tends to throw a lot because the shell process quit when we terminated the related
                            // VM process above, so just swallow the error.
                        }
                    }
                    else {
                        this.log(`${request}: Process had no PID.`);
                    }
                    // If we didn't quit, it might be because we're paused.
                    yield this.tryRemoveAllBreakpointsAndResumeAllThreads(request);
                }
                else {
                    this.log(`${request}: Main process had already quit.`);
                }
                // Don't do this - because the process might ignore our kill (eg. test framework lets the current
                // test finish) so we may need to send again it we get another disconnectRequest.
                // We also use !childProcess to mean we're attached.
                // this.childProcess = undefined;
            }
            else if (!this.shouldKillProcessOnTerminate && this.vmService) {
                this.log(`${request}: Disconnecting from process...`);
                yield this.tryRemoveAllBreakpointsAndResumeAllThreads(request);
                try {
                    this.log(`${request}: Closing VM service connection...`);
                    this.vmService.close();
                }
                catch (_a) { }
                finally {
                    this.vmService = undefined;
                }
            }
            else {
                this.log(`${request}: Did not need to terminate processes`);
            }
            this.log(`${request}: Removing all stored data...`);
            this.threadManager.removeAllStoredData();
            this.log(`${request}: Waiting for process to finish...`);
            yield this.processExit;
            this.log(`${request}: Disconnecting...`);
        });
    }
    // When shutting down, we may need to remove all breakpoints and resume all threads
    // to avoid things like waiting for tests to exit that will never exit. We don't wait
    // for any responses here as if the VM has shut down we won't get them.
    tryRemoveAllBreakpointsAndResumeAllThreads(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log(`${request}: Disabling break-on-exception and removing all breakpoints`);
            yield this.raceIgnoringErrors(() => Promise.all([
                this.threadManager.setExceptionPauseMode("None"),
                ...this.threadManager.threads.map((thread) => thread.removeAllBreakpoints()),
            ]));
            this.log(`${request}: Unpausing all threads...`);
            yield this.raceIgnoringErrors(() => Promise.all([
                ...this.threadManager.threads.map((thread) => thread.resume()),
            ]));
        });
    }
    // Run some code, but don't wait longer than a certain time period for the result
    // as it may never come. Returns true if the operation completed.
    raceIgnoringErrors(action, timeoutMilliseconds = 250) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.withTimeout(action(), timeoutMilliseconds);
                return true;
            }
            catch (e) {
                this.log(`Error while while waiting for action: ${e}`);
                return false;
            }
        });
    }
    terminateRequest(response, args) {
        const _super = Object.create(null, {
            terminateRequest: { get: () => super.terminateRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("teminateRequest", args);
            this.log(`Termination requested!`);
            this.isTerminating = true;
            this.startProgress(constants_1.debugTerminatingProgressId, "Terminating debug session");
            if (this.expectAdditionalPidToTerminate && !this.additionalPidsToTerminate.size) {
                this.log(`Waiting for main process PID before terminating`);
                this.updateProgress(constants_1.debugTerminatingProgressId, "Waiting for process");
                const didGetPid = yield this.raceIgnoringErrors(() => this.additionalPidCompleter.promise, 20000);
                if (didGetPid)
                    this.log(`Got main process PID, continuing...`);
                else
                    this.log(`Timed out waiting for main process PID, continuing anyway...`);
                this.updateProgress(constants_1.debugTerminatingProgressId, "Terminating process");
            }
            // If we wait for terminate() to complete, VS code will report a timeout after 1000ms
            // so we have to acknowledge the request even if it takes longer to complete.
            _super.terminateRequest.call(this, response, args);
            try {
                yield this.terminate(false);
            }
            catch (e) {
                this.logger.error(e);
                this.logToUser((0, utils_1.errorString)(e));
            }
        });
    }
    disconnectRequest(response, args) {
        const _super = Object.create(null, {
            disconnectRequest: { get: () => super.disconnectRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("disconnectRequest", args);
            this.log(`Disconnect requested!`);
            this.isTerminating = true;
            try {
                const succeeded = yield this.raceIgnoringErrors(() => this.terminate(false), 2000);
                // If we hit the 2s timeout, then terminate more forcefully.
                if (!succeeded)
                    yield this.terminate(true);
            }
            catch (e) {
                return this.errorResponse(response, `${e}`);
            }
            // If we call super.disconnectRequest before other async code finishes, the TerminatedEvent()
            // might not be sent, so wait as least as long as the code in the processExit handler, which is
            // just a setImmediate after the last logging event (capped at 500).
            yield this.raceIgnoringErrors(() => this.lastLoggingEvent, 500);
            yield new Promise((resolve) => setTimeout(resolve, 10));
            _super.disconnectRequest.call(this, response, args);
        });
    }
    setBreakPointsRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("setBreakPointsRequest", args);
            if (this.noDebug) {
                response.body = { breakpoints: (args.breakpoints || []).map((b) => ({ verified: false })) };
                this.logDapResponse(response);
                this.sendResponse(response);
                return;
            }
            const source = args.source;
            const breakpoints = args.breakpoints || [];
            // Format the path correctly for the VM.
            // TODO: The `|| source.name` stops a crash (#1566) but doesn't actually make
            // the breakpoints work. This needs more work.
            const uri = (0, utils_2.formatPathForVm)(source.path || source.name);
            try {
                const result = yield this.threadManager.setBreakpoints(uri, breakpoints);
                const bpResponse = [];
                for (const bpRes of result) {
                    bpResponse.push({ verified: !!bpRes });
                }
                response.body = { breakpoints: bpResponse };
                this.logDapResponse(response);
                this.sendResponse(response);
            }
            catch (error) {
                this.errorResponse(response, `${error}`);
            }
        });
    }
    setExceptionBreakPointsRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("setExceptionBreakPointsRequest", args);
            const filters = args.filters;
            let mode = "None";
            // If we're running in noDebug mode, we'll always set None.
            if (!this.noDebug) {
                if (filters.indexOf("Unhandled") !== -1)
                    mode = "Unhandled";
                if (filters.indexOf("All") !== -1)
                    mode = "All";
            }
            yield this.threadManager.setExceptionPauseMode(mode);
            this.logDapResponse(response);
            this.sendResponse(response);
        });
    }
    configurationDoneRequest(response, args) {
        this.logDapRequest("configurationDoneRequest", args);
        this.logDapResponse(response);
        this.sendResponse(response);
        this.threadManager.receivedConfigurationDone();
    }
    pauseRequest(response, args) {
        this.logDapRequest("pauseRequest", args);
        const thread = this.threadManager.getThreadInfoFromNumber(args.threadId);
        if (!thread) {
            this.errorResponse(response, `No thread with id ${args.threadId}`);
            return;
        }
        if (!this.vmService) {
            this.errorResponse(response, `No VM service connection`);
            return;
        }
        this.vmService.pause(thread.ref.id)
            .then(() => {
            this.logDapResponse(response);
            this.sendResponse(response);
        })
            .catch((error) => this.errorResponse(response, `${error}`));
    }
    sourceRequest(response, args) {
        this.logDapRequest("sourceRequest", args);
        const sourceReference = args.sourceReference;
        const data = this.threadManager.getStoredData(sourceReference);
        const scriptRef = data.data;
        data.thread.getScript(scriptRef).then((script) => {
            if (script.source) {
                response.body = { content: script.source, mimeType: "text/x-dart" };
            }
            else {
                response.success = false;
                response.message = "<source not available>";
            }
            this.logDapResponse(response);
            this.sendResponse(response);
        }).catch((error) => this.errorResponse(response, `${error}`));
    }
    threadsRequest(response) {
        this.logDapRequest("threadsRequest", undefined);
        response.body = { threads: this.threadManager.getThreads() };
        this.logDapResponse(response);
        this.sendResponse(response);
    }
    stackTraceRequest(response, args) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("stackTraceRequest", args);
            const stackFrameBatch = 20;
            const thread = this.threadManager.getThreadInfoFromNumber(args.threadId);
            const startFrame = args.startFrame || 0;
            const levels = args.levels;
            if (!thread) {
                this.errorResponse(response, `No thread with id ${args.threadId}`);
                return;
            }
            if (!thread.paused) {
                this.errorResponse(response, `Thread ${args.threadId} is not paused`);
                return;
            }
            if (!this.vmService) {
                this.errorResponse(response, `No VM service connection`);
                return;
            }
            try {
                let isTruncated = true;
                let totalFrames = 1;
                let stackFrames = [];
                // Newer VM Service allows us to cap the frames to avoid fetching more than we need.
                // They do not support an offset, however earlier frames will be internally cached
                // so fetching 40 frames if we've already had 0-20 should only incur the cost of the
                // new 20.
                const supportsGetStackLimit = this.vmServiceCapabilities.supportsGetStackLimit;
                const limit = supportsGetStackLimit && levels
                    ? startFrame + levels
                    : undefined;
                // If the request is only for the top frame, we may be able to satisfy this using the
                // `topFrame` field of the pause event.
                if (startFrame === 0 && levels === 1 && ((_a = thread.pauseEvent) === null || _a === void 0 ? void 0 : _a.topFrame)) {
                    totalFrames = 1 + stackFrameBatch; // Claim we had more +stackFrameBatch frames to force another request.
                    stackFrames.push(yield this.convertStackFrame(thread, (_b = thread.pauseEvent) === null || _b === void 0 ? void 0 : _b.topFrame, true, true, Infinity));
                }
                else {
                    const result = yield this.vmService.getStack(thread.ref.id, limit);
                    const stack = result.result;
                    let vmFrames = stack.asyncCausalFrames || stack.frames;
                    const framesRecieved = vmFrames.length;
                    isTruncated = (_c = stack.truncated) !== null && _c !== void 0 ? _c : false;
                    let firstAsyncMarkerIndex = vmFrames.findIndex((f) => f.kind === "AsyncSuspensionMarker");
                    if (firstAsyncMarkerIndex === -1)
                        firstAsyncMarkerIndex = Infinity;
                    // Drop frames that are earlier than what we wanted.
                    vmFrames = vmFrames.slice(startFrame);
                    // Drop off any that are after where we wanted.
                    if (levels && vmFrames.length > levels)
                        vmFrames = vmFrames.slice(0, levels);
                    const hasAnyDebuggableFrames = !!vmFrames.find((f) => { var _a, _b, _c, _d; return ((_b = (_a = f.location) === null || _a === void 0 ? void 0 : _a.script) === null || _b === void 0 ? void 0 : _b.uri) && this.isDebuggable((_d = (_c = f.location) === null || _c === void 0 ? void 0 : _c.script) === null || _d === void 0 ? void 0 : _d.uri); });
                    stackFrames = yield Promise.all(vmFrames.map((f, i) => this.convertStackFrame(thread, f, startFrame + i === 0, hasAnyDebuggableFrames, firstAsyncMarkerIndex)));
                    totalFrames = supportsGetStackLimit
                        // If the stack was truncated, we should say there are 20(stackFrameBatch) more frames, otherwise use the real count.
                        ? isTruncated ? framesRecieved + stackFrameBatch : framesRecieved
                        // If we don't support limit, the number recieved is always correct.
                        : framesRecieved;
                }
                response.body = {
                    stackFrames,
                    totalFrames,
                };
                this.logDapResponse(response);
                this.sendResponse(response);
            }
            catch (error) {
                this.errorResponse(response, `${error}`);
            }
        });
    }
    convertStackFrame(thread, frame, isTopFrame, hasDebuggableFrames, firstAsyncMarkerIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const frameId = thread.storeData(frame);
            if (frame.kind === "AsyncSuspensionMarker") {
                const stackFrame = new debugadapter_1.StackFrame(frameId, "<asynchronous gap>");
                stackFrame.presentationHint = "label";
                return stackFrame;
            }
            const frameName = frame && frame.code && frame.code.name
                ? (frame.code.name.startsWith(unoptimizedPrefix)
                    ? frame.code.name.substring(unoptimizedPrefix.length)
                    : frame.code.name)
                : "<unknown>";
            const location = frame.location;
            if (!location) {
                const stackFrame = new debugadapter_1.StackFrame(frameId, frameName);
                stackFrame.presentationHint = "subtle";
                return stackFrame;
            }
            const uri = location.script.uri;
            let sourcePath = this.convertVMUriToSourcePath(uri);
            let canShowSource = sourcePath && fs.existsSync(sourcePath);
            // Download the source if from a "dart:" uri.
            let sourceReference;
            if (uri.startsWith("dart:") || uri.startsWith("org-dartlang-app:")) {
                sourcePath = undefined;
                sourceReference = thread.storeData(location.script);
                canShowSource = true;
            }
            const shortName = this.formatUriForShortDisplay(uri);
            const stackFrame = new debugadapter_1.StackFrame(frameId, frameName, canShowSource ? new debugadapter_1.Source(shortName, sourcePath, sourceReference, undefined, location.script) : undefined, 0, 0);
            // The top frame is only allowed to be deemphasized when it's an exception and there is some user-code in the
            // stack (so the editor can walk up the stack to user code).
            // If the reason for stopping was a breakpoint, step, etc., then we should always leave the frame focusable.
            const isStoppedAtException = thread.exceptionReference !== 0;
            const allowDeemphasizingFrame = !isTopFrame || (isStoppedAtException && hasDebuggableFrames);
            // If we wouldn't debug this source, then deemphasize in the stack.
            if (stackFrame.source) {
                if (this.isSdkLibrary(uri))
                    stackFrame.source.origin = "from the SDK";
                else if (this.isExternalLibrary(uri))
                    stackFrame.source.origin = uri.startsWith("package:flutter/") ? "from the Flutter framework" : "from external packages";
                if (allowDeemphasizingFrame && !this.isDebuggable(uri))
                    stackFrame.source.presentationHint = "deemphasize";
            }
            stackFrame.canRestart = !isTopFrame && frame.index < firstAsyncMarkerIndex;
            // Resolve the line and column information.
            try {
                const script = yield thread.getScript(location.script);
                const fileLocation = this.resolveFileLocation(script, location.tokenPos);
                if (fileLocation) {
                    stackFrame.line = fileLocation.line;
                    stackFrame.column = fileLocation.column;
                }
            }
            catch (e) {
                this.logger.error(e);
            }
            return stackFrame;
        });
    }
    isDebuggable(uri) {
        if (!this.isValidToDebug(uri))
            return false;
        if (this.isSdkLibrary(uri))
            return this.debugSdkLibraries;
        if (this.isExternalLibrary(uri))
            return this.debugExternalPackageLibraries;
        return true;
    }
    scopesRequest(response, args) {
        this.logDapRequest("scopesRequest", args);
        const frameId = args.frameId;
        const data = this.threadManager.getStoredData(frameId);
        const frame = data.data;
        // TODO: class variables? library variables?
        const variablesReference = data.thread.storeData(frame);
        const scopes = [];
        if (data.thread.exceptionReference) {
            scopes.push(new debugadapter_1.Scope("Exceptions", data.thread.exceptionReference));
        }
        scopes.push(new debugadapter_1.Scope("Locals", variablesReference));
        response.body = { scopes };
        this.logDapResponse(response);
        this.sendResponse(response);
    }
    variablesRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("variablesRequest", args);
            if (!this.vmService) {
                this.errorResponse(response, `No VM service connection`);
                return;
            }
            const variablesReference = args.variablesReference;
            // implement paged arrays
            // let filter = args.filter; // optional; either "indexed" or "named"
            const requestedStart = args.start; // (optional) index of the first variable to return; if omitted children start at 0
            const startNumeric = requestedStart || 0;
            const requestedCount = args.count; // (optional) number of variables to return. If count is missing or 0, all variables are returned
            const data = this.threadManager.getStoredData(variablesReference);
            if (!data) {
                this.errorResponse(response, `Variable is no longer available (maybe debug session finished?)`);
                return;
            }
            const thread = data.thread;
            if (data.data.type === "Frame") {
                const frame = data.data;
                let variables = [];
                if (frame.vars) {
                    const framePromises = frame.vars
                        .filter((variable) => !variable.value || variable.value.type !== "@TypeArguments")
                        .map((variable, i) => this.instanceRefToVariable(thread, true, variable.name, variable.name, variable.value, i <= maxValuesToCallToString));
                    const frameVariables = yield Promise.all(framePromises);
                    variables = variables.concat(frameVariables);
                }
                variables = (0, array_1.sortBy)(variables, (v) => v.name);
                response.body = { variables };
                this.logDapResponse(response);
                this.sendResponse(response);
            }
            else if (data.data.type === "MapEntry") {
                const mapRef = data.data;
                const keyResult = this.vmService.getObject(thread.ref.id, mapRef.keyId);
                const valueResult = this.vmService.getObject(thread.ref.id, mapRef.valueId);
                const variables = [];
                let canEvaluateValueName = false;
                let valueEvaluateName = "value";
                try {
                    const keyDebuggerResult = yield keyResult;
                    const keyInstanceRef = keyDebuggerResult.result;
                    variables.push(yield this.instanceRefToVariable(thread, false, "key", "key", keyInstanceRef, true));
                    if (this.isSimpleKind(keyInstanceRef.kind) && mapRef.mapEvaluateName) {
                        canEvaluateValueName = true;
                        valueEvaluateName = `${mapRef.mapEvaluateName}[${this.valueAsString(keyInstanceRef)}]`;
                    }
                }
                catch (error) {
                    variables.push({ name: "key", value: this.errorAsDisplayValue(error), variablesReference: 0 });
                }
                try {
                    const valueDebuggerResult = yield valueResult;
                    const valueInstanceRef = valueDebuggerResult.result;
                    variables.push(yield this.instanceRefToVariable(thread, canEvaluateValueName, valueEvaluateName, "value", valueInstanceRef, true));
                }
                catch (error) {
                    variables.push({ name: "value", value: this.errorAsDisplayValue(error), variablesReference: 0 });
                }
                response.body = { variables };
                this.logDapResponse(response);
                this.sendResponse(response);
            }
            else if (data.data.type === InspectedVariable.type) {
                const variable = data.data;
                response.body = {
                    variables: [
                        { name: "insp", value: "<inspected variable>", variablesReference: variable.variablesReference },
                    ],
                };
                this.sendResponse(response);
            }
            else {
                const instanceRef = data.data;
                try {
                    const result = yield this.vmService.getObject(thread.ref.id, instanceRef.id, requestedStart, requestedCount);
                    let variables = [];
                    // If we're the top-level exception, or our parent has an evaluateName of undefined (its children)
                    // we cannot evaluate (this will disable "Add to Watch" etc).
                    const canEvaluate = instanceRef.evaluateName !== undefined;
                    if (result.result.type === "Sentinel") {
                        variables.push({
                            name: "<evalError>",
                            value: result.result.valueAsString,
                            variablesReference: 0,
                        });
                    }
                    else {
                        const obj = result.result;
                        if (obj.type === "Instance") {
                            const instance = obj;
                            // TODO: show by kind instead
                            if (this.isSimpleKind(instance.kind)) {
                                variables.push(yield this.instanceRefToVariable(thread, canEvaluate, `${instanceRef.evaluateName}`, instance.kind, instanceRef, true));
                            }
                            else if (instance.elements) {
                                const elementPromises = instance.elements.map((element, i) => __awaiter(this, void 0, void 0, function* () { return this.instanceRefToVariable(thread, canEvaluate, `${instanceRef.evaluateName}[${i + startNumeric}]`, `[${i + startNumeric}]`, element, i <= maxValuesToCallToString); }));
                                // Add them in order.
                                const elementVariables = yield Promise.all(elementPromises);
                                variables = variables.concat(elementVariables);
                            }
                            else if (instance.associations) {
                                const len = instance.associations.length;
                                for (let i = 0; i < len; i++) {
                                    const association = instance.associations[i];
                                    const keyName = this.valueAsString(association.key, true);
                                    const valueName = this.valueAsString(association.value, true);
                                    let variablesReference = 0;
                                    if (association.key.type !== "Sentinel" && association.value.type !== "Sentinel") {
                                        const mapRef = {
                                            keyId: association.key.id,
                                            mapEvaluateName: instanceRef.evaluateName,
                                            type: "MapEntry",
                                            valueId: association.value.id,
                                        };
                                        variablesReference = thread.storeData(mapRef);
                                    }
                                    variables.push({
                                        name: `${i + startNumeric}`,
                                        type: `${keyName} -> ${valueName}`,
                                        value: `${keyName} -> ${valueName}`,
                                        variablesReference,
                                    });
                                }
                            }
                            else if (instance.fields) {
                                let fieldAndGetterPromises = [];
                                const fields = (0, array_1.sortBy)(instance.fields, (f) => f.decl.name);
                                const fieldPromises = fields.map((field, i) => __awaiter(this, void 0, void 0, function* () { return this.instanceRefToVariable(thread, canEvaluate, `${instanceRef.evaluateName}.${field.decl.name}`, field.decl.name, field.value, i <= maxValuesToCallToString); }));
                                fieldAndGetterPromises = fieldAndGetterPromises.concat(fieldPromises);
                                // Add getters
                                if (this.evaluateGettersInDebugViews && instance.class) {
                                    let getterNames = yield this.getGetterNamesForHierarchy(thread.ref, instance.class);
                                    getterNames = getterNames.sort();
                                    // Call each getter, adding the result as a variable.
                                    const getterPromises = getterNames.map((getterName, i) => __awaiter(this, void 0, void 0, function* () {
                                        try {
                                            const getterResult = yield this.vmService.evaluate(thread.ref.id, instanceRef.id, getterName, true);
                                            if (getterResult.result.type === "@Error") {
                                                const message = getterResult.result.message.replace("Unhandled exception:", "").trim();
                                                return {
                                                    name: getterName,
                                                    value: `<${message}>`,
                                                    variablesReference: 0,
                                                };
                                            }
                                            else if (getterResult.result.type === "Sentinel") {
                                                return { name: getterName, value: getterResult.result.valueAsString, variablesReference: 0 };
                                            }
                                            else {
                                                const getterResultInstanceRef = getterResult.result;
                                                return this.instanceRefToVariable(thread, canEvaluate, `${instanceRef.evaluateName}.${getterName}`, getterName, getterResultInstanceRef, instance.fields.length + i <= maxValuesToCallToString);
                                            }
                                        }
                                        catch (e) {
                                            return { name: getterName, value: this.errorAsDisplayValue(e), variablesReference: 0 };
                                        }
                                    }));
                                    fieldAndGetterPromises = fieldAndGetterPromises.concat(getterPromises);
                                }
                                const fieldAndGetterVariables = yield Promise.all(fieldAndGetterPromises);
                                variables = variables.concat(fieldAndGetterVariables);
                            }
                            else {
                                this.logToUser(`Unknown instance kind: ${instance.kind}. ${constants_1.pleaseReportBug}\n`);
                            }
                        }
                        else {
                            this.logToUser(`Unknown object type: ${obj.type}. ${constants_1.pleaseReportBug}\n`);
                        }
                    }
                    response.body = { variables };
                    this.logDapResponse(response);
                    this.sendResponse(response);
                }
                catch (error) {
                    response.body = {
                        variables: [
                            { name: "<error>", value: this.errorAsDisplayValue(error), variablesReference: 0 },
                        ],
                    };
                    this.logDapResponse(response);
                    this.sendResponse(response);
                }
            }
        });
    }
    errorAsDisplayValue(error) {
        const message = (0, utils_1.errorString)(error);
        return `<${message.split("\n")[0].trim()}>`;
    }
    getGetterNamesForHierarchy(thread, classRef) {
        return __awaiter(this, void 0, void 0, function* () {
            let getterNames = [];
            while (this.vmService && classRef) {
                const classResponse = yield this.vmService.getObject(thread.id, classRef.id);
                if (classResponse.result.type !== "Class")
                    break;
                const c = classResponse.result;
                // TODO: This kinda smells for two reasons:
                // 1. This is supposed to be an @Function but it has loads of extra stuff on it compare to the docs
                // 2. We're accessing _kind to check if it's a getter :/
                getterNames = getterNames.concat(getterNames, c.functions.filter((f) => f._kind === "GetterFunction" && !f.static && !f.const).map((f) => f.name));
                classRef = c.super;
            }
            // Distinct the list; since we may have got dupes from the super-classes.
            getterNames = (0, utils_1.uniq)(getterNames);
            // Remove _identityHashCode because it seems to throw (and probably isn't useful to the user).
            return getterNames.filter((g) => g !== "_identityHashCode");
        });
    }
    isSimpleKind(kind) {
        return kind === "String" || kind === "Bool" || kind === "Int" || kind === "Num" || kind === "Double" || kind === "Null" || kind === "Closure";
    }
    callToString(isolate, instanceRef, getFullString = false, suppressQuotesAroundStrings = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.vmService)
                return;
            try {
                const result = this.vmServiceCapabilities.hasInvoke
                    ? yield this.vmService.invoke(isolate.id, instanceRef.id, "toString", [], true)
                    : yield this.vmService.evaluate(isolate.id, instanceRef.id, "toString()", true);
                if (result.result.type === "@Error") {
                    return undefined;
                }
                else {
                    let evalResult = result.result;
                    if (evalResult.valueAsStringIsTruncated && getFullString) {
                        const result = yield this.vmService.getObject(isolate.id, evalResult.id);
                        evalResult = result.result;
                    }
                    return this.valueAsString(evalResult, undefined, suppressQuotesAroundStrings);
                }
            }
            catch (e) {
                this.logger.error(e);
                return undefined;
            }
        });
    }
    setVariableRequest(response, args) {
        this.logDapRequest("setVariableRequest", args);
        // const variablesReference: number = args.variablesReference;
        // const name: string = args.name;
        // const value: string = args.value;
        // TODO: Use eval to implement this.
        this.errorResponse(response, "not supported");
    }
    continueRequest(response, args) {
        this.logDapRequest("continueRequest", args);
        const thread = this.threadManager.getThreadInfoFromNumber(args.threadId);
        if (!thread) {
            this.errorResponse(response, `No thread with id ${args.threadId}`);
            return;
        }
        thread.resume().then(() => {
            response.body = { allThreadsContinued: false };
            this.logDapResponse(response);
            this.sendResponse(response);
        }).catch((error) => this.errorResponse(response, `${error}`));
    }
    nextRequest(response, args) {
        this.logDapRequest("nextRequest", args);
        const thread = this.threadManager.getThreadInfoFromNumber(args.threadId);
        if (!thread) {
            this.errorResponse(response, `No thread with id ${args.threadId}`);
            return;
        }
        const type = thread.atAsyncSuspension ? "OverAsyncSuspension" : "Over";
        thread.resume(type).then(() => {
            this.logDapResponse(response);
            this.sendResponse(response);
        }).catch((error) => this.errorResponse(response, `${error}`));
    }
    stepInRequest(response, args) {
        this.logDapRequest("stepInRequest", args);
        const thread = this.threadManager.getThreadInfoFromNumber(args.threadId);
        if (!thread) {
            this.errorResponse(response, `No thread with id ${args.threadId}`);
            return;
        }
        thread.resume("Into").then(() => {
            this.logDapResponse(response);
            this.sendResponse(response);
        }).catch((error) => this.errorResponse(response, `${error}`));
    }
    stepOutRequest(response, args) {
        this.logDapRequest("stepOutRequest", args);
        const thread = this.threadManager.getThreadInfoFromNumber(args.threadId);
        if (!thread) {
            this.errorResponse(response, `No thread with id ${args.threadId}`);
            return;
        }
        thread.resume("Out").then(() => {
            this.logDapResponse(response);
            this.sendResponse(response);
        }).catch((error) => this.errorResponse(response, `${error}`));
    }
    restartFrameRequest(response, args) {
        this.logDapRequest("restartFrameRequest", args);
        const frameId = args.frameId;
        // const context: string = args.context; // "watch", "repl", "hover"
        if (!frameId) {
            this.errorResponse(response, "unable to restart with no frame");
            return;
        }
        const data = this.threadManager.getStoredData(frameId);
        const thread = data.thread;
        const frame = data.data;
        thread.resume("Rewind", frame.index).then(() => {
            this.logDapResponse(response);
            this.sendResponse(response);
        }).catch((error) => this.errorResponse(response, `${error}`));
    }
    reverseContinueRequest(response, args) {
        this.logDapRequest("reverseContinueRequest", args);
        this.logToUser("Reverse continue is not supported\n");
        this.errorResponse(response, `Reverse continue is not supported for the Dart debugger`);
    }
    evaluateRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("evaluateRequest", args);
            const isClipboardContext = args.context === "clipboard";
            const isWatchContext = args.context === "watch";
            const expression = args.expression.replace(trailingSemicolonPattern, "");
            // Stack frame scope; if not specified, the expression is evaluated in the global scope.
            const frameId = args.frameId;
            // const context: string = args.context; // "watch", "repl", "hover"
            const data = frameId ? this.threadManager.getStoredData(frameId) : undefined;
            const thread = data ? data.thread : this.threadManager.threads[0];
            try {
                let result;
                if (!data) {
                    if (!this.vmService || !thread) {
                        this.errorResponse(response, "Global evaluation requires a thread to have been loaded");
                        return;
                    }
                    const isolate = (yield this.vmService.getIsolate(thread.ref.id)).result;
                    const rootLib = isolate.rootLib;
                    if (!rootLib) {
                        this.errorResponse(response, "global evaluation requires a rootLib on the initial thread");
                        return;
                    }
                    // Don't wait more than a second for the response:
                    //   1. VS Code's watch window behaves badly when there are incomplete evaluate requests
                    //      https://github.com/Microsoft/vscode/issues/52317
                    //   2. The VM sometimes doesn't respond to your requests at all
                    //      https://github.com/flutter/flutter/issues/18595
                    result = yield this.withTimeout(this.vmService.evaluate(thread.ref.id, rootLib.id, expression, true));
                }
                else {
                    const frame = data.data;
                    if ((expression === threadExceptionExpression || expression.startsWith(`${threadExceptionExpression}.`)) && thread.exceptionReference) {
                        const exceptionData = this.threadManager.getStoredData(thread.exceptionReference);
                        const exceptionInstanceRef = exceptionData && exceptionData.data;
                        if (expression === threadExceptionExpression) {
                            response.body = {
                                result: (yield this.fullValueAsString(thread.ref, exceptionInstanceRef)) || "<unknown>",
                                variablesReference: thread.exceptionReference,
                            };
                            this.logDapResponse(response);
                            this.sendResponse(response);
                            return;
                        }
                        const exceptionId = exceptionInstanceRef && exceptionInstanceRef.id;
                        if (exceptionId)
                            result = yield this.vmService.evaluate(thread.ref.id, exceptionId, expression.substr(threadExceptionExpression.length + 1), true);
                    }
                    if (!result) {
                        // Don't wait more than a second for the response:
                        //   1. VS Code's watch window behaves badly when there are incomplete evaluate requests
                        //      https://github.com/Microsoft/vscode/issues/52317
                        //   2. The VM sometimes doesn't respond to your requests at all
                        //      https://github.com/flutter/flutter/issues/18595
                        result = yield this.withTimeout(this.vmService.evaluateInFrame(thread.ref.id, frame.index, expression, true));
                    }
                }
                if (!result) {
                    this.errorResponse(response, "No evaluation result");
                }
                else if (result.result.type === "@Error") {
                    // InstanceRef or ErrorRef
                    const error = result.result;
                    let str = error.message;
                    if (str)
                        str = str.split("\n").slice(0, 6).join("\n");
                    this.errorResponse(response, str);
                }
                else {
                    const instanceRef = result.result;
                    instanceRef.evaluateName = expression;
                    const text = yield this.fullValueAsString(thread.ref, instanceRef, isClipboardContext);
                    response.body = {
                        result: text || "<unknown>",
                        variablesReference: this.isSimpleKind(instanceRef.kind) ? 0 : thread.storeData(instanceRef),
                    };
                    this.logDapResponse(response);
                    this.sendResponse(response);
                }
            }
            catch (e) {
                if (e && e.message && e.message.indexOf("UnimplementedError") !== -1)
                    this.errorResponse(response, `<not yet implemented>`);
                else if (isWatchContext && e && e.message && e.message.indexOf("Expression compilation error") !== -1)
                    this.errorResponse(response, `not available`);
                else if (isWatchContext && e && e.message && e.message.indexOf("noSuchMethodException") !== -1)
                    this.errorResponse(response, `not available`);
                else if (e && e.data && e.data.details)
                    this.errorResponse(response, `${e.data.details}`);
                else
                    this.errorResponse(response, (0, utils_1.errorString)(e));
            }
        });
    }
    withTimeout(promise, milliseconds = 100000) {
        return new Promise((resolve, reject) => {
            // Set a timeout to reject the promise after the timeout period.
            const timeoutTimer = setTimeout(() => {
                reject(new Error(`<timed out>`));
            }, milliseconds);
            promise
                // When the main promise completes, cancel the timeout and return its result.
                .then((result) => {
                clearTimeout(timeoutTimer);
                resolve(result);
            })
                // And if it errors, pass that up.
                .catch(reject);
        });
    }
    exposeUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.urlExposeCompleters[url])
                return this.urlExposeCompleters[url].promise;
            const completer = new utils_1.PromiseCompleter();
            this.urlExposeCompleters[url] = completer;
            this.sendEvent(new debugadapter_1.Event("dart.exposeUrl", { url }));
            return completer.promise;
        });
    }
    startProgress(progressID, message) {
        message = message || "Working";
        message = message.endsWith("…") || message.endsWith("...") ? message : `${message}…`;
        // TODO: It's not clear if passing an empty string for title is reasonable, but it works better in VS Code.
        // See https://github.com/microsoft/language-server-protocol/issues/1025.
        // TODO: Revert these changes if VS Code removes the delay.
        // https://github.com/microsoft/vscode/issues/101405
        // this.sendEvent(new ProgressStartEvent(progressID, "", e.message));
        this.sendEvent(new debugadapter_1.Event("dart.progressStart", { progressID, message }));
    }
    updateProgress(progressID, message) {
        if (!message)
            return;
        message = message.endsWith("…") || message.endsWith("...") ? message : `${message}…`;
        // TODO: Revert these changes if VS Code removes the delay.
        // https://github.com/microsoft/vscode/issues/101405
        // this.sendEvent(new ProgressUpdateEvent(progressID, message));
        this.sendEvent(new debugadapter_1.Event("dart.progressUpdate", { progressID, message }));
    }
    endProgress(progressID, message) {
        // TODO: Revert these changes if VS Code removes the delay.
        // https://github.com/microsoft/vscode/issues/101405
        // this.sendEvent(new ProgressEndEvent(progressID, e.message));
        this.sendEvent(new debugadapter_1.Event("dart.progressEnd", { progressID, message }));
    }
    customRequest(request, response, args) {
        const _super = Object.create(null, {
            customRequest: { get: () => super.customRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.logDapRequest("customRequest", args);
            try {
                switch (request) {
                    case "callService":
                        const result = yield this.callService(args.method, args.params);
                        response.body = result === null || result === void 0 ? void 0 : result.result;
                        this.logDapResponse(response);
                        this.sendResponse(response);
                        break;
                    case "exposeUrlResponse":
                        const completer = this.urlExposeCompleters[args.originalUrl];
                        if (completer)
                            completer.resolve({ url: args.exposedUrl });
                        break;
                    case "updateDebugOptions":
                        this.debugExternalPackageLibraries = !!args.debugExternalPackageLibraries;
                        this.debugSdkLibraries = !!args.debugSdkLibraries;
                        yield this.threadManager.setLibrariesDuggableForAllIsolates();
                        this.logDapResponse(response);
                        this.sendResponse(response);
                        break;
                    case "hotReload":
                        yield this.reloadSources();
                        this.logDapResponse(response);
                        this.sendResponse(response);
                        break;
                    // Flutter requests that may be sent during test runs or other places
                    // that we don't currently support.
                    case "hotRestart":
                        // TODO: Get rid of this!
                        this.log(`Ignoring Flutter customRequest ${request} for non-Flutter-run app`, enums_1.LogSeverity.Warn);
                        this.logDapResponse(response);
                        this.sendResponse(response);
                        break;
                    default:
                        this.log(`Unknown customRequest ${request}`, enums_1.LogSeverity.Warn);
                        _super.customRequest.call(this, request, response, args);
                        break;
                }
            }
            catch (e) {
                this.logger.error(`Error handling '${request}' custom request: ${e}`);
                this.errorResponse(response, (0, utils_1.errorString)(e));
            }
        });
    }
    // IsolateStart, IsolateRunnable, IsolateExit, IsolateUpdate, ServiceExtensionAdded
    handleIsolateEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // Don't process any events while the debugger is still running init code.
            yield this.debuggerInit;
            const kind = event.kind;
            if (kind === "IsolateStart" || kind === "IsolateRunnable") {
                yield this.threadManager.registerThread(event.isolate, kind);
            }
            else if (kind === "IsolateExit") {
                this.threadManager.handleIsolateExit(event.isolate);
            }
            else if (kind === "ServiceExtensionAdded") {
                this.handleServiceExtensionAdded(event);
            }
        });
    }
    // Extension
    handleExtensionEvent(event) {
        // Nothing Dart-specific, but Flutter overrides this
    }
    // Service
    handleServiceEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // Don't process any events while the debugger is still running init code.
            yield this.debuggerInit;
            const kind = event.kind;
            if (kind === "ServiceRegistered")
                this.handleServiceRegistered(event);
        });
    }
    handleLoggingEvent(event) {
        // Logging may involve async operations (for ex. fetching exception text
        // and call stacks) so we must ensure each log is not processed until
        // the previous one has been processed.
        this.lastLoggingEvent = this.lastLoggingEvent.then(() => this.processLoggingEvent(event));
    }
    handleStdoutEvent(event) {
        if (!event.bytes)
            return;
        const buff = Buffer.from(event.bytes, "base64");
        const message = buff.toString("utf8");
        // Use the promise from above, to avoid stdout getting out of order with logging events.
        this.lastLoggingEvent = this.lastLoggingEvent.then(() => this.logStdout(message));
    }
    // Logging
    processLoggingEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const kind = event.kind;
            if (kind === "Logging" && event.logRecord) {
                const record = event.logRecord;
                if (record) {
                    const name = record.loggerName ? this.valueAsString(record.loggerName, false, true) : undefined;
                    const logPrefix = `[${name || "log"}] `;
                    let indent = " ".repeat(logPrefix.length);
                    const printLogRecord = (event, instance, logPrefix, indent, category = "console") => __awaiter(this, void 0, void 0, function* () {
                        const message = yield this.fullValueAsString(event.isolate, instance, true);
                        if (message) {
                            const indentedMessage = `${(0, colors_1.faint)(logPrefix)}${message.split("\n").join(`\n${indent}`)}`;
                            this.logToUser(`${indentedMessage.trimRight()}\n`, category);
                        }
                    });
                    if (record.message && record.message.kind !== "Null")
                        yield printLogRecord(event, record.message, logPrefix, indent);
                    indent += "  ";
                    if (record.error && record.error.kind !== "Null")
                        yield printLogRecord(event, record.error, logPrefix, indent, "stderr");
                    if (record.stackTrace && record.stackTrace.kind !== "Null")
                        yield printLogRecord(event, record.stackTrace, logPrefix, indent, "stderr");
                }
            }
        });
    }
    // PauseStart, PauseExit, PauseBreakpoint, PauseInterrupted, PauseException, Resume,
    // BreakpointAdded, BreakpointResolved, BreakpointRemoved, Inspect, None
    handleDebugEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // Don't process any events while the debugger is still running init code.
            yield this.debuggerInit;
            try {
                const kind = event.kind;
                if (kind.startsWith("Pause")) {
                    yield this.handlePauseEvent(event);
                }
                else if (kind === "Inspect") {
                    yield this.handleInspectEvent(event);
                }
            }
            catch (e) {
                this.logger.error(e);
            }
        });
    }
    handlePauseEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!event.isolate) {
                this.logger.warn(`Unable to handle pause event (${event.kind}) that had no isolate`);
                return;
            }
            const kind = event.kind;
            const thread = this.threadManager.getThreadInfoFromRef(event.isolate);
            if (!thread) {
                this.logger.warn(`ThreadManager couldn't find thread with ref ${event.isolate.id} to handle ${kind}`);
                return;
            }
            if (!this.vmService) {
                this.logger.warn("No VM service connection");
                return;
            }
            // For PausePostRequest we need to re-send all breakpoints; this happens after a flutter restart
            if (kind === "PausePostRequest") {
                try {
                    yield this.threadManager.resendThreadBreakpoints(thread);
                }
                catch (e) {
                    this.logger.error(e);
                }
                try {
                    yield this.vmService.resume(event.isolate.id);
                }
                catch (e) {
                    // Ignore failed-to-resume errors https://github.com/flutter/flutter/issues/10934
                    if (e.code !== 106)
                        throw e;
                }
            }
            else if (kind === "PauseStart") {
                // "PauseStart" should auto-resume after breakpoints are set if we launched the process.
                if (this.childProcess)
                    thread.receivedPauseStart();
                else {
                    // Otherwise, if we were attaching, then just issue a step-into to put the debugger
                    // right at the start of the application.
                    thread.handlePaused(event);
                    yield thread.resume("Into");
                }
            }
            else {
                // PauseStart, PauseExit, PauseBreakpoint, PauseInterrupted, PauseException
                let reason = "pause";
                let exceptionText;
                let shouldRemainedStoppedOnBreakpoint = true;
                if (kind === "PauseBreakpoint" && event.pauseBreakpoints && event.pauseBreakpoints.length) {
                    reason = "breakpoint";
                    const potentialBreakpoints = event.pauseBreakpoints.map((bp) => thread.breakpoints[bp.id]);
                    // When attaching to an already-stopped process, this event can be handled before the
                    // breakpoints have been registered. If that happens, replace any unknown breakpoints with
                    // dummy unconditional breakpoints.
                    // TODO: Ensure that VM breakpoint state is reconciled with debugger breakpoint state before
                    // handling thread state so that this doesn't happen, and remove this check.
                    const hasUnknownBreakpoints = potentialBreakpoints.indexOf(undefined) !== -1;
                    if (!hasUnknownBreakpoints) {
                        // There can't be any undefined here because of the above, but the types don't know that
                        // so strip the undefineds.
                        const breakpoints = potentialBreakpoints.filter(utils_1.notUndefined);
                        const hasUnconditionalBreakpoints = !!breakpoints.find((bp) => !bp.condition && !bp.logMessage);
                        const conditionalBreakpoints = breakpoints.filter((bp) => bp.condition);
                        const logPoints = breakpoints.filter((bp) => bp.logMessage);
                        // Evalute conditions to see if we should remain stopped or continue.
                        shouldRemainedStoppedOnBreakpoint =
                            hasUnconditionalBreakpoints
                                || (yield this.anyBreakpointConditionReturnsTrue(conditionalBreakpoints, thread));
                        // Output any logpoint messages.
                        for (const logPoint of logPoints) {
                            if (!logPoint.logMessage)
                                continue;
                            const logMessage = logPoint.logMessage
                                .replace(/(^|[^\\\$]){/g, "$1\${") // Prefix any {tokens} with $ if they don't have
                                .replace(/\\({)/g, "$1") // Remove slashes
                                .replace(/"""/g, '\\"\\"\\"'); // Escape triple-quotes
                            const printCommand = `print("""${logMessage}""")`;
                            yield this.evaluateAndSendErrors(thread, printCommand, "log message");
                        }
                    }
                }
                else if (kind === "PauseBreakpoint") {
                    reason = "step";
                }
                else if (kind === "PauseException") {
                    reason = "exception";
                    exceptionText =
                        event.exception
                            ? yield this.fullValueAsString(event.isolate, event.exception)
                            : undefined;
                }
                thread.handlePaused(event);
                if (shouldRemainedStoppedOnBreakpoint) {
                    this.logDapEvent(new debugadapter_1.StoppedEvent(reason, thread.num, exceptionText));
                    this.sendEvent(new debugadapter_1.StoppedEvent(reason, thread.num, exceptionText));
                }
                else {
                    yield thread.resume();
                }
            }
        });
    }
    handleInspectEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const isolateRef = event.isolate;
            const instanceRef = event.inspectee;
            const thread = isolateRef ? this.threadManager.getThreadInfoFromRef(isolateRef) : undefined;
            if (isolateRef && instanceRef && thread) {
                const text = yield this.fullValueAsString(isolateRef, instanceRef, false);
                this.sendVariable(thread.storeData(new InspectedVariable(thread.storeData(instanceRef))));
            }
        });
    }
    sendVariable(variablesReference) {
        const evt = new debugadapter_1.OutputEvent("");
        evt.body.variablesReference = variablesReference;
        this.sendEvent(evt);
    }
    // Like valueAsString, but will call toString() if the thing is truncated.
    fullValueAsString(isolate, instanceRef, suppressQuotesAroundStrings = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let text;
            if (!instanceRef.valueAsStringIsTruncated)
                text = this.valueAsString(instanceRef, false, suppressQuotesAroundStrings);
            if (!text && isolate)
                text = yield this.callToString(isolate, instanceRef, true, instanceRef.kind !== "String" || suppressQuotesAroundStrings);
            // If it has a custom toString(), put that in parens after the type name.
            if (instanceRef.kind === "PlainInstance" && instanceRef.class && instanceRef.class.name) {
                if (text === `Instance of '${instanceRef.class.name}'` || text === instanceRef.class.name || !text)
                    text = instanceRef.class.name;
                else
                    text = `${instanceRef.class.name} (${text})`;
            }
            if (!text)
                text = instanceRef.valueAsString;
            return text;
        });
    }
    anyBreakpointConditionReturnsTrue(breakpoints, thread) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const bp of breakpoints) {
                const evalResult = yield this.evaluateAndSendErrors(thread, bp.condition, "condition");
                if (evalResult) {
                    // To be considered true, we need to have a value and either be not-a-bool
                    const breakpointconditionEvaluatesToTrue = (evalResult.kind === "Bool" && evalResult.valueAsString === "true")
                        || (evalResult.kind === "Int" && evalResult.valueAsString !== "0")
                        || (evalResult.kind === "Double" && evalResult.valueAsString !== "0");
                    if (breakpointconditionEvaluatesToTrue)
                        return true;
                }
            }
            return false;
        });
    }
    callService(type, args) {
        if (!this.vmService)
            throw new Error("VM service connection is not available");
        return this.vmService.callMethod(type, args);
    }
    evaluateAndSendErrors(thread, expression, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.vmService)
                return;
            try {
                const result = yield this.vmService.evaluateInFrame(thread.ref.id, 0, expression, true);
                if (result.result.type !== "@Error") {
                    return result.result;
                }
                else {
                    this.logToUser(`Debugger failed to evaluate breakpoint ${type} "${expression}"\n`);
                }
            }
            catch (_a) {
                this.logToUser(`Debugger failed to evaluate breakpoint ${type} "${expression}"\n`);
            }
        });
    }
    handleServiceExtensionAdded(event) {
        if (event && event.extensionRPC) {
            this.notifyServiceExtensionAvailable(event.extensionRPC, event.isolate ? event.isolate.id : undefined);
        }
    }
    handleServiceRegistered(event) {
        if (event && event.service) {
            this.notifyServiceRegistered(event.service, event.method);
        }
    }
    notifyServiceExtensionAvailable(extensionRPC, isolateId) {
        const evt = new debugadapter_1.Event("dart.serviceExtensionAdded", { extensionRPC, isolateId });
        this.logDapEvent(evt);
        this.sendEvent(evt);
    }
    notifyServiceRegistered(service, method) {
        const evt = new debugadapter_1.Event("dart.serviceRegistered", { service, method });
        this.logDapEvent(evt);
        this.sendEvent(evt);
    }
    errorResponse(response, message) {
        response.success = false;
        response.message = message;
        this.logDapResponse(response);
        this.sendResponse(response);
    }
    formatUriForShortDisplay(uri) {
        if (uri.startsWith("file:")) {
            uri = (0, utils_1.uriToFilePath)(uri);
            if (this.cwd)
                uri = path.relative(this.cwd, uri);
        }
        // Split on the separators and return only the first and last two parts.
        const sep = uri.indexOf("/") === -1 && uri.indexOf("\\") !== -1 ? "\\" : "/";
        const parts = uri.split(sep);
        if (parts.length > 3) {
            return parts[0] === "org-dartlang-app"
                ? ["…", parts[parts.length - 2], parts[parts.length - 1]].join(sep)
                : [parts[0], "…", parts[parts.length - 2], parts[parts.length - 1]].join(sep);
        }
        else {
            return uri;
        }
    }
    convertVMUriToSourcePath(uri, returnWindowsPath) {
        if (uri.startsWith("file:"))
            return (0, utils_1.uriToFilePath)(uri, returnWindowsPath);
        if (uri.startsWith("package:") && this.packageMap)
            return this.packageMap.resolvePackageUri(uri);
        return uri;
    }
    valueAsString(ref, useClassNameAsFallback = true, suppressQuotesAroundStrings = false) {
        if (ref.type === "Sentinel")
            return ref.valueAsString;
        const instanceRef = ref;
        if (ref.kind === "String" || ref.valueAsString) {
            let str = instanceRef.valueAsString;
            if (instanceRef.valueAsStringIsTruncated)
                str += "…";
            if (instanceRef.kind === "String" && !suppressQuotesAroundStrings)
                str = `"${str}"`;
            return str;
        }
        else if (ref.kind === "List") {
            return `List (${instanceRef.length} ${instanceRef.length === 1 ? "item" : "items"})`;
        }
        else if (ref.kind === "Map") {
            return `Map (${instanceRef.length} ${instanceRef.length === 1 ? "item" : "items"})`;
        }
        else if (ref.kind === "Type") {
            const typeRef = ref;
            return `Type (${typeRef.name})`;
        }
        else if (useClassNameAsFallback) {
            return this.getFriendlyTypeName(instanceRef);
        }
        else {
            return undefined;
        }
    }
    getFriendlyTypeName(ref) {
        return ref.kind !== "PlainInstance" ? ref.kind : ref.class.name;
    }
    instanceRefToVariable(thread, canEvaluate, evaluateName, name, ref, allowFetchFullString) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ref.type === "Sentinel") {
                return {
                    name,
                    value: ref.valueAsString,
                    variablesReference: 0,
                };
            }
            else {
                const val = ref;
                // Stick on the evaluateName as we'll need this to build
                // the evaluateName for the child, and we don't have the parent
                // (or a string expression) in the response.
                val.evaluateName = canEvaluate ? evaluateName : undefined;
                const str = this.evaluateToStringInDebugViews && allowFetchFullString && !val.valueAsString
                    ? yield this.fullValueAsString(thread.ref, val)
                    : this.valueAsString(val);
                return {
                    evaluateName: canEvaluate ? evaluateName : undefined,
                    indexedVariables: (val && val.kind && val.kind.endsWith("List") ? val.length : undefined),
                    name,
                    type: `${val.kind} (${val.class.name})`,
                    value: str || "",
                    variablesReference: val.valueAsString ? 0 : thread.storeData(val),
                };
            }
        });
    }
    isValidToDebug(uri) {
        return this.supportsDebugInternalLibraries || !uri.startsWith("dart:_");
    }
    isSdkLibrary(uri) {
        return uri.startsWith("dart:");
    }
    isExternalLibrary(uri) {
        // If it's not a package URI, or we don't have a package map, we assume not external. We don't want
        // to ever disable debugging of something if we're not certain.
        if (!uri.startsWith("package:") || !this.packageMap)
            return false;
        // package:flutter won't be in pub-cache, but should be considered external.
        if (uri.startsWith("package:flutter/") || uri.startsWith("package:flutter_test/"))
            return true;
        const path = this.packageMap.resolvePackageUri(uri);
        // If we don't have the path, we can't tell if it's external or not.
        if (!path)
            return false;
        // HACK: Take a guess at whether it's inside the pubcache (in which case we're considering it external).
        return path.indexOf("/hosted/pub.dartlang.org/") !== -1
            || path.indexOf("\\hosted\\pub.dartlang.org\\") !== -1
            || path.indexOf("/third_party/") !== -1
            || path.indexOf("\\third_party\\") !== -1;
    }
    resolveFileLocation(script, tokenPos) {
        const table = script.tokenPosTable;
        for (const entry of table) {
            // [lineNumber, (tokenPos, columnNumber)*]
            for (let index = 1; index < entry.length; index += 2) {
                if (entry[index] === tokenPos) {
                    const line = entry[0];
                    return { line, column: entry[index + 1] };
                }
            }
        }
        return undefined;
    }
    pollForMemoryUsage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.childProcess || this.childProcess.killed || !this.vmService)
                return;
            const result = yield this.vmService.getVM();
            const vm = result.result;
            const isolatePromises = vm.isolates.map((isolateRef) => this.vmService.getIsolate(isolateRef.id));
            const isolatesResponses = yield Promise.all(isolatePromises);
            const isolates = isolatesResponses.map((response) => response.result);
            let current = 0;
            let total = 0;
            for (const isolate of isolates) {
                if (!isolate._heaps)
                    continue;
                for (const heap of [isolate._heaps.old, isolate._heaps.new]) {
                    current += heap.used + heap.external;
                    total += heap.capacity + heap.external;
                }
            }
            this.logDapEvent(new debugadapter_1.Event("dart.debugMetrics", { memory: { current, total } }));
            this.sendEvent(new debugadapter_1.Event("dart.debugMetrics", { memory: { current, total } }));
            if (this.pollforMemoryMs)
                setTimeout(() => this.pollForMemoryUsage(), this.pollforMemoryMs).unref();
        });
    }
    reloadSources() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.vmService)
                return;
            const result = yield this.vmService.getVM();
            const vm = result.result;
            yield Promise.all(vm.isolates.map((isolateRef) => this.vmService.callMethod("reloadSources", { isolateId: isolateRef.id })));
        });
    }
    logStdout(message) {
        this.logToUserBuffered(message, "stdout");
    }
    /// Buffers text and sends to the user when a newline is recieved. This is to handle stderr/stdout which
    /// might arrive in chunks but we need to process in lines.
    ///    [5:01:50 PM] [General] [Info] [stderr] tion: Oop
    ///    [5:01:50 PM] [General] [Info] [stderr] s
    ///    [5:01:50 PM] [General] [Info] [stderr]
    ///    [5:01:50 PM] [General] [Info] [stderr] #
    ///    [5:01:50 PM] [General] [Info] [stderr] 0
    ///    [5:01:50 PM] [General] [Info] [stderr]
    ///    [5:01:50 PM] [General] [Info] [stderr]
    ///    [5:01:50 PM] [General] [Info] [stderr]     main (file:///D:/a/
    ///    [5:01:50 PM] [General] [Info] [stderr] Dart-Code/Dart-Code/src/test/test_projects/hello_world/bin/broken.dart:2:3)
    logToUserBuffered(message, category) {
        this.logBuffer[category] = this.logBuffer[category] || "";
        this.logBuffer[category] += message;
        const lastNewLine = this.logBuffer[category].lastIndexOf("\n");
        if (lastNewLine !== -1) {
            const processString = this.logBuffer[category].substr(0, lastNewLine + 1);
            this.logBuffer[category] = this.logBuffer[category].substr(lastNewLine + 1);
            this.logToUser(processString, category);
        }
    }
    // Logs a message back to the editor. Does not add its own newlines, you must
    // provide them!
    logToUser(message, category, colorText = (s) => s) {
        // If we get a multi-line message that contains an error/stack trace, process each
        // line individually, so we can attach location metadata to individual lines.
        const isMultiLine = message.trimRight().indexOf("\n") !== -1;
        if (isMultiLine && (0, stack_trace_1.mayContainStackFrame)(message)) {
            message.split("\n").forEach((line) => this.logToUser(`${line}\n`, category));
            return;
        }
        // Extract stack frames from the message so we can do nicer formatting of them.
        const frame = (0, stack_trace_1.parseStackFrame)(message);
        const output = new debugadapter_1.OutputEvent(`${(0, colors_1.applyColor)(message, colorText)}`, category);
        const mayBeAsyncMarker = (output.body.output.trim().startsWith("<async") && output.body.output.trim().endsWith(">"))
            || (output.body.output.trim().startsWith("===== asynchronous gap ==="));
        // If the output line looks like a stack frame with users code, attempt to link it up to make
        // it clickable.
        if (frame) {
            let sourcePath = this.convertVMUriToSourcePath(frame.sourceUri);
            if (sourcePath && !path.isAbsolute(sourcePath) && this.cwd)
                sourcePath = path.join(this.cwd, sourcePath);
            const canShowSource = sourcePath && sourcePath !== frame.sourceUri && fs.existsSync(sourcePath);
            const shortName = this.formatUriForShortDisplay(frame.sourceUri);
            const source = canShowSource ? new debugadapter_1.Source(shortName, sourcePath, undefined, undefined, undefined) : undefined;
            let text = message.trim();
            if (source) {
                output.body.source = source;
                output.body.line = frame.line || 1;
                output.body.column = frame.col || 1;
                // Replace the output to only the text part to avoid the duplicated uri.
                text = frame.text;
            }
            // Colour based on whether it's framework code or not.
            const isExternalCode = this.isSdkLibrary(frame.sourceUri) || this.isExternalLibrary(frame.sourceUri);
            // Fade out any stack frames for external code.
            const colouredText = frame.isStackFrame && isExternalCode ? (0, colors_1.applyColor)(text, colors_1.faint) : text;
            output.body.output = `${colouredText}\n`;
        }
        else if (mayBeAsyncMarker) {
            output.body.output = `${(0, colors_1.applyColor)(output.body.output.trimRight(), colors_1.faint)}\n`;
        }
        this.logDapEvent(output);
        this.sendEvent(output);
    }
}
exports.DartDebugSession = DartDebugSession;
class RemoteEditorTerminalProcess {
    constructor(pid) {
        this.pid = pid;
        this.killed = false;
    }
}
class InspectedVariable {
    constructor(variablesReference) {
        this.variablesReference = variablesReference;
    }
    get type() { return InspectedVariable.type; }
}
InspectedVariable.type = "InspectedVariable";


/***/ }),

/***/ 6157:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VmServiceConnection = exports.RPCError = exports.SourceReportKind = exports.DebuggerResult = void 0;
/* eslint-disable id-blacklist */
const WebSocket = __webpack_require__(8777);
const utils_1 = __webpack_require__(4586);
class DebuggerResult {
    constructor(result) {
        this.result = result;
    }
}
exports.DebuggerResult = DebuggerResult;
var SourceReportKind;
(function (SourceReportKind) {
    SourceReportKind[SourceReportKind["Coverage"] = 0] = "Coverage";
    SourceReportKind[SourceReportKind["PossibleBreakpoints"] = 1] = "PossibleBreakpoints";
})(SourceReportKind = exports.SourceReportKind || (exports.SourceReportKind = {}));
class RPCError {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    details() {
        return this.data ? this.data.details : undefined;
    }
    toString() {
        return `${this.code} ${this.message}`;
    }
}
exports.RPCError = RPCError;
class VmServiceConnection {
    constructor(uri) {
        this.completers = {};
        this.eventListeners = {};
        this.nextId = 0;
        const url = new URL(uri);
        if (url.protocol.startsWith("http")) {
            url.protocol = url.protocol === "https" ? "wss" : "ws";
            uri = url.toString();
        }
        this.socket = new WebSocket(uri, { followRedirects: true });
        this.socket.on("message", (data) => this.handleData(data.toString()));
    }
    onOpen(cb) {
        this.socket.on("open", cb);
    }
    // TODO: This API doesn't make it obvious you can only have one subscriber.
    onLogging(callback) {
        this.logging = callback;
    }
    getVersion() {
        return this.callMethod("getVersion");
    }
    getVM() {
        return this.callMethod("getVM");
    }
    getIsolate(isolateId) {
        return this.callMethod("getIsolate", { isolateId });
    }
    on(streamId, callback) {
        this.eventListeners[streamId] = callback;
        return this.streamListen(streamId);
    }
    streamListen(streamId) {
        return this.callMethod("streamListen", { streamId });
    }
    addBreakpointWithScriptUri(isolateId, scriptUri, line, column) {
        const data = { isolateId, scriptUri, line, column };
        return this.callMethod("addBreakpointWithScriptUri", data);
    }
    // None, Unhandled, and All
    setExceptionPauseMode(isolateId, mode) {
        return this.callMethod("setExceptionPauseMode", { isolateId, mode });
    }
    removeBreakpoint(isolateId, breakpointId) {
        return this.callMethod("removeBreakpoint", { isolateId, breakpointId });
    }
    pause(isolateId) {
        return this.callMethod("pause", { isolateId });
    }
    // Into, Over, OverAsyncSuspension, and Out
    resume(isolateId, step, frameIndex) {
        return this.callMethod("resume", { isolateId, step, frameIndex });
    }
    getStack(isolateId, limit) {
        return this.callMethod("getStack", { isolateId, limit });
    }
    // TODO: Make these strongly-typed - DebuggerResult -> SourceReport? DebuggerResult<SourceReport>?
    // Do we need DebuggerResult?
    getSourceReport(isolate, reports, script) {
        return this.callMethod("getSourceReport", { isolateId: isolate.id, reports: reports.map((r) => SourceReportKind[r]), scriptId: script.id });
    }
    getObject(isolateId, objectId, offset, count) {
        const data = { isolateId, objectId, offset, count };
        return this.callMethod("getObject", data);
    }
    evaluate(isolateId, targetId, expression, disableBreakpoints) {
        return this.callMethod("evaluate", {
            disableBreakpoints,
            expression,
            isolateId,
            targetId,
        });
    }
    evaluateInFrame(isolateId, frameIndex, expression, disableBreakpoints) {
        return this.callMethod("evaluateInFrame", {
            disableBreakpoints,
            expression,
            frameIndex,
            isolateId,
        });
    }
    invoke(isolateId, targetId, selector, argumentIds, disableBreakpoints) {
        return this.callMethod("invoke", {
            argumentIds,
            disableBreakpoints,
            isolateId,
            selector,
            targetId,
        });
    }
    setLibraryDebuggable(isolateId, libraryId, isDebuggable) {
        return this.callMethod("setLibraryDebuggable", { isolateId, libraryId, isDebuggable });
    }
    callMethod(method, params) {
        const id = `${this.nextId++}`;
        const completer = new utils_1.PromiseCompleter();
        this.completers[id] = completer;
        const json = {
            id,
            jsonrpc: "2.0",
            method,
            params: params || {},
        };
        const str = JSON.stringify(json);
        this.logTraffic(`==> ${str}\n`);
        this.socket.send(str);
        return completer.promise;
    }
    handleData(data) {
        this.logTraffic(`<== ${data}\n`);
        const json = JSON.parse(data);
        const id = json.id;
        const method = json.method;
        const error = json.error;
        const completer = this.completers[id];
        if (completer) {
            delete this.completers[id];
            if (error)
                completer.reject(new RPCError(error.code, error.message, error.data));
            else
                completer.resolve(new DebuggerResult(json.result));
        }
        else if (method) {
            const params = json.params;
            const streamId = params.streamId;
            const callback = this.eventListeners[streamId];
            // Responses to requests (above) are processed by completing a promise
            // which will be processed asynchronously. If we call callback here
            // synchronously then it may trigger before a response that was recieved
            // before it. The setTimeout forces it to go into the queue to be
            // processed in order.
            // TODO: Try to find a better way.
            if (callback)
                setTimeout(callback, 0, params.event);
        }
    }
    onError(cb) {
        this.socket.on("error", cb);
    }
    onClose(cb) {
        this.socket.on("close", cb);
    }
    logTraffic(message) {
        if (this.logging) {
            this.logging(message);
        }
    }
    close() {
        this.socket.close();
    }
}
exports.VmServiceConnection = VmServiceConnection;


/***/ }),

/***/ 2485:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DartTestDebugSession = void 0;
const debugadapter_1 = __webpack_require__(9955);
const path = __webpack_require__(1017);
const constants_1 = __webpack_require__(5628);
const enums_1 = __webpack_require__(7341);
const utils_1 = __webpack_require__(4586);
const dart_debug_impl_1 = __webpack_require__(2372);
const logging_1 = __webpack_require__(8257);
const test_runner_1 = __webpack_require__(3163);
const tick = "✓";
const cross = "✖";
class DartTestDebugSession extends dart_debug_impl_1.DartDebugSession {
    constructor() {
        super();
        this.expectSingleTest = false;
        this.suitePaths = [];
        this.tests = [];
        this.testCounts = {};
        this.sendStdOutToConsole = false;
        this.allowWriteServiceInfo = false;
        this.requiresProgram = false;
    }
    launchRequest(response, args) {
        const _super = Object.create(null, {
            launchRequest: { get: () => super.launchRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.expectSingleTest = args.expectSingleTest;
            return _super.launchRequest.call(this, response, args);
        });
    }
    spawnProcess(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let allArgs = [];
            if (args.vmAdditionalArgs)
                allArgs = allArgs.concat(args.vmAdditionalArgs);
            // To use the test framework in the supported debugging way we should
            // send this flag; which will pause the tests at each suite start (this is
            // deifferent to the isolates being paused). To do that, we need to change
            // how our "unpause" logic works in the base debug adapter (since it won't
            // be paused at startup).
            // if (this.shouldConnectDebugger) {
            // 	appArgs.push("--pause-after-load");
            // }
            // Instead, we do it the VM way for now...
            if (this.shouldConnectDebugger) {
                this.expectAdditionalPidToTerminate = true;
                allArgs.push("--enable-vm-service=0");
                allArgs.push("--pause_isolates_on_start=true");
            }
            if (this.dartCapabilities.supportsDartRunTest) {
                // Use "dart --vm-args run test:test"
                allArgs.push("run");
                if (this.dartCapabilities.supportsNoServeDevTools)
                    allArgs.push("--no-serve-devtools");
                allArgs.push("test:test");
            }
            else {
                // Use "dart --vm-args [pub-snapshot] run test"
                allArgs.push(path.join(args.dartSdkPath, constants_1.pubSnapshotPath));
                allArgs = allArgs.concat(["run", "test"]);
            }
            allArgs.push("-r");
            allArgs.push("json");
            allArgs.push("-j1"); // Only run single-threaded in the runner.
            // Replace in any custom tool.
            const customTool = {
                replacesArgs: args.customToolReplacesArgs,
                script: args.customTool,
            };
            const execution = (0, utils_1.usingCustomScript)(path.join(args.dartSdkPath, constants_1.dartVMPath), allArgs, customTool);
            allArgs = execution.args;
            if (args.toolArgs)
                allArgs = allArgs.concat(args.toolArgs);
            if (args.program)
                allArgs.push(this.sourceFileForArgs(args));
            if (args.args)
                allArgs = allArgs.concat(args.args);
            const logger = new logging_1.DebugAdapterLogger(this, enums_1.LogCategory.DartTest);
            return this.createRunner(execution.executable, args.cwd, allArgs, args.env, args.dartTestLogFile, logger, args.maxLogLineLength);
        });
    }
    createRunner(executable, projectFolder, args, envOverrides, logFile, logger, maxLogLineLength) {
        const runner = new test_runner_1.TestRunner(executable, projectFolder, args, { envOverrides, toolEnv: this.toolEnv }, logFile, logger, maxLogLineLength);
        // Set up subscriptions.
        // this.flutter.registerForUnhandledMessages((msg) => this.log(msg));
        runner.registerForUnhandledMessages((msg) => {
            // Hack: Would be better to have an event for this.
            // https://github.com/dart-lang/test/issues/1216
            if (msg.toLowerCase().indexOf("waiting for current test(s) to finish") !== -1)
                this.updateProgress(constants_1.debugTerminatingProgressId, `${msg.trim()}`);
            this.logToUserIfAppropriate(msg, "stdout");
        });
        runner.registerForTestStartedProcess((n) => {
            // flutter test may send this without a Uri in non-debug mode
            // https://github.com/flutter/flutter/issues/76533
            // also exclude the string "null" since that's never valid and
            // was emitted for a short period (it will never make stable, but
            // is currently being produced on the bots running against Flutter
            // master).
            if (n.observatoryUri && n.observatoryUri !== "null")
                this.initDebugger(`${n.observatoryUri}ws`);
        });
        runner.registerForAllTestNotifications((n) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.handleTestEvent(n);
            }
            catch (e) {
                this.log(`${e}`);
                this.logToUser(`${e}\n`);
            }
            try {
                this.sendTestEventToEditor(n);
            }
            catch (e) {
                this.log(`${e}`);
                this.logToUser(`${e}\n`);
            }
        }));
        return runner.process;
    }
    logToUserIfAppropriate(message, category) {
        // Filter out these messages taht come to stdout that we don't want to send to the user.
        if (message && message.startsWith("Observatory listening on"))
            return;
        if (message && message.startsWith("The Dart VM service is listening on"))
            return;
        if (message && message.startsWith("Press Control-C again"))
            return;
        this.logToUser(message, category);
    }
    handleTestEvent(notification) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // Handle basic output
            switch (notification.type) {
                case "start":
                    const pid = notification.pid;
                    if (pid) {
                        this.recordAdditionalPid(pid);
                    }
                    break;
                case "debug":
                    const observatoryUri = notification.observatory;
                    if (observatoryUri) {
                        const match = constants_1.vmServiceHttpLinkPattern.exec(observatoryUri);
                        if (match) {
                            yield this.initDebugger(this.convertObservatoryUriToVmServiceUri(match[1]));
                        }
                    }
                    break;
                case "suite":
                    const suite = notification;
                    // HACK: If we got a relative path, fix it up.
                    if (!path.isAbsolute(suite.suite.path) && this.cwd)
                        suite.suite.path = path.join(this.cwd, suite.suite.path);
                    this.suitePaths[suite.suite.id] = suite.suite.path;
                    break;
                case "testStart":
                    const testStart = notification;
                    this.tests[testStart.test.id] = testStart.test;
                    break;
                case "testDone":
                    const testDone = notification;
                    if (testDone.hidden)
                        return;
                    const name = (_a = this.tests[testDone.testID].name) !== null && _a !== void 0 ? _a : "";
                    const pass = testDone.result === "success";
                    const symbol = pass ? tick : cross;
                    this.testCounts[name] = ((_b = this.testCounts[name]) !== null && _b !== void 0 ? _b : 0) + 1;
                    this.sendEvent(new debugadapter_1.OutputEvent(`${symbol} ${name}\n`, "stdout"));
                    break;
                case "print":
                    const print = notification;
                    this.sendEvent(new debugadapter_1.OutputEvent(`${print.message}\n`, "stdout"));
                    break;
                case "error":
                    const error = notification;
                    this.logToUser(`${error.error}\n`, "stderr");
                    this.logToUser(`${error.stackTrace}\n`, "stderr");
                    break;
                case "done":
                    if (this.expectSingleTest) {
                        const testNames = Object.keys(this.testCounts);
                        const firstTestWithMultipleRuns = testNames.find((name) => this.testCounts[name] > 1);
                        // It's possible that we ran multiple tests because of a variant argument in Flutter, so only actually report
                        // if there were multiple tests with the same name.
                        if (firstTestWithMultipleRuns) {
                            this.logToUser(`Multiple tests named "${firstTestWithMultipleRuns}" ran but only one was expected.\nYou may have multiple tests with the same name.\n`, "console");
                        }
                    }
                    break;
            }
        });
    }
    sendTestEventToEditor(notification) {
        let suiteID;
        switch (notification.type) {
            case "suite":
                const suite = notification;
                suiteID = suite.suite.id;
                break;
            case "group":
                const group = notification;
                suiteID = group.group.suiteID;
                break;
            case "testStart":
                const testStart = notification;
                suiteID = testStart.test.suiteID;
                break;
            case "testDone":
                const testDone = notification;
                suiteID = this.tests[testDone.testID].suiteID;
                break;
            case "print":
                const print = notification;
                suiteID = this.tests[print.testID].suiteID;
                break;
            case "error":
                const error = notification;
                suiteID = this.tests[error.testID].suiteID;
                break;
        }
        const suitePath = suiteID !== undefined ? this.suitePaths[suiteID] : undefined;
        if (suitePath) {
            this.sendEvent(new debugadapter_1.Event("dart.testNotification", notification));
        }
    }
}
exports.DartTestDebugSession = DartTestDebugSession;


/***/ }),

/***/ 8384:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlutterDebugSession = void 0;
const debugadapter_1 = __webpack_require__(9955);
const path = __webpack_require__(1017);
const flutter_1 = __webpack_require__(4790);
const constants_1 = __webpack_require__(5628);
const enums_1 = __webpack_require__(7341);
const structured_errors_1 = __webpack_require__(6581);
const utils_1 = __webpack_require__(4586);
const dart_debug_impl_1 = __webpack_require__(2372);
const flutter_run_1 = __webpack_require__(2758);
const logging_1 = __webpack_require__(8257);
const run_daemon_base_1 = __webpack_require__(2330);
const objectGroupName = "my-group";
const flutterExceptionStartBannerPrefix = "══╡ EXCEPTION CAUGHT BY";
const flutterExceptionEndBannerPrefix = "══════════════════════════════════════════";
class FlutterDebugSession extends dart_debug_impl_1.DartDebugSession {
    constructor() {
        super();
        this.appHasStarted = false;
        this.appHasBeenToldToStopOrDetach = false;
        this.isReloadInProgress = false;
        this.flutterCapabilities = flutter_1.FlutterCapabilities.empty;
        // Allow flipping into stderr mode for red exceptions when we see the start/end of a Flutter exception dump.
        this.outputCategory = "console";
        this.sendStdOutToConsole = false;
        this.allowWriteServiceInfo = false;
        // We get the VM service URI from the `flutter run` process. If we parse
        // it out of verbose logging and connect to it, it'll be before Flutter is
        // finished setting up and bad things can happen (like us sending events
        // way too early).
        this.parseVmServiceUriFromStdOut = false;
        this.requiresProgram = false;
        this.logCategory = enums_1.LogCategory.FlutterRun;
        // Enable connecting the VM even for noDebug mode so that service
        // extensions can be used.
        this.connectVmEvenForNoDebug = true;
    }
    initializeRequest(response, args) {
        response.body = response.body || {};
        response.body.supportsRestartRequest = true;
        super.initializeRequest(response, args);
    }
    attachRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // For flutter attach, we actually do the same thing as launch - we run a flutter process
            // (flutter attach instead of flutter run).
            this.subscribeToStdout = true;
            return this.launchRequest(response, args);
        });
    }
    spawnProcess(args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const isAttach = args.request === "attach";
            const deviceIdFlag = (_a = args.toolArgs) === null || _a === void 0 ? void 0 : _a.indexOf("-d");
            const deviceId = deviceIdFlag && deviceIdFlag !== -1 && args.toolArgs && args.toolArgs.length > deviceIdFlag ? args.toolArgs[deviceIdFlag + 1] : undefined;
            if (args.showMemoryUsage) {
                this.pollforMemoryMs = 1000;
            }
            // If we have a service info file, read the URI from it and then use that
            // as if it was supplied.
            if (isAttach && (!args.vmServiceUri && args.vmServiceInfoFile)) {
                this.vmServiceInfoFile = args.vmServiceInfoFile;
                this.updateProgress(constants_1.debugLaunchProgressId, `Waiting for ${this.vmServiceInfoFile}`);
                args.vmServiceUri = yield this.startServiceFilePolling();
            }
            // Normally for `flutter run` we don't allow terminating the pid we get from the VM service,
            // because it's on a remote device, however in the case of the flutter-tester, it is local
            // and otherwise might be left hanging around.
            // Unless, of course, we attached in which case we expect to detach by default.
            this.allowTerminatingVmServicePid = deviceId === "flutter-tester" && !isAttach;
            const logger = new logging_1.DebugAdapterLogger(this, this.logCategory);
            this.expectAdditionalPidToTerminate = true;
            const mode = isAttach ? run_daemon_base_1.RunMode.Attach : run_daemon_base_1.RunMode.Run;
            this.runDaemon = this.spawnRunDaemon(mode, deviceId, args, logger);
            this.runDaemon.registerForUnhandledMessages((msg) => this.handleLogOutput(msg));
            // Set up subscriptions.
            this.runDaemon.registerForDaemonConnect((n) => this.recordAdditionalPid(n.pid));
            this.runDaemon.registerForAppStart((n) => this.currentRunningAppId = n.appId);
            this.runDaemon.registerForAppDebugPort((n) => __awaiter(this, void 0, void 0, function* () {
                this.vmServiceUri = n.wsUri;
                yield this.connectToVmServiceIfReady();
            }));
            this.runDaemon.registerForAppStarted((n) => __awaiter(this, void 0, void 0, function* () {
                this.appHasStarted = true;
                this.outputCategory = "stdout";
                yield this.connectToVmServiceIfReady();
            }));
            this.runDaemon.registerForAppStop((n) => {
                this.currentRunningAppId = undefined;
                if (this.runDaemon) {
                    this.runDaemon.dispose();
                    this.runDaemon = undefined;
                }
            });
            this.runDaemon.registerForAppProgress((e) => {
                if (!this.appHasStarted)
                    this.sendLaunchProgressEvent(e);
                else
                    this.sendProgressEvent(e);
            });
            this.runDaemon.registerForAppWebLaunchUrl((e) => this.sendEvent(new debugadapter_1.Event("dart.webLaunchUrl", { url: e.url, launched: e.launched })));
            // TODO: Should this use logToUser?
            this.runDaemon.registerForError((err) => this.sendEvent(new debugadapter_1.OutputEvent(`${err}\n`, "stderr")));
            this.runDaemon.registerForDaemonLog((msg) => this.handleLogOutput(msg.log, msg.error));
            this.runDaemon.registerForAppLog((msg) => this.handleLogOutput(msg.log, msg.error));
            return this.runDaemon.process;
        });
    }
    sendLaunchProgressEvent(e) {
        // We ignore finish progress events for launch progress because we use a
        // single ID for launch progress to avoid multiple progress indicators and
        // don't want to hide the overall progress when the first step completes.
        //
        // We'll hide the overall launch progress when we connect to the VM service.
        if (!e.finished && e.message)
            this.updateProgress(constants_1.debugLaunchProgressId, e.message);
    }
    sendProgressEvent(e) {
        const progressID = `flutter-${e.appId}-${e.progressId}`;
        if (e.finished) {
            let finalMessage;
            if (!finalMessage) {
                if (e.progressId === "hot.reload")
                    finalMessage = "Hot Reload complete!";
                else if (e.progressId === "hot.restart")
                    finalMessage = "Hot Restart complete!";
            }
            this.endProgress(progressID, finalMessage);
        }
        else {
            this.startProgress(progressID, e.message);
        }
    }
    handleLogOutput(msg, forceErrorCategory = false) {
        msg = `${msg.trimRight()}\n`;
        if (msg.indexOf(flutterExceptionStartBannerPrefix) !== -1) {
            // Change before logging.
            this.outputCategory = "stderr";
            this.logToUser(msg, this.outputCategory);
        }
        else if (msg.indexOf(flutterExceptionEndBannerPrefix) !== -1) {
            // Log before changing back.
            this.logToUser(msg, this.outputCategory);
            this.outputCategory = "stdout";
        }
        else {
            this.logToUser(msg, forceErrorCategory ? "stderr" : this.outputCategory);
            // This text comes through as stdout and not Progress, so map it over
            // to progress indicator.
            if (msg.indexOf("Waiting for connection from") !== -1) {
                const instructions = "Please click the Dart Debug extension button in the spawned browser window";
                this.updateProgress(constants_1.debugLaunchProgressId, instructions);
                // Send this delayed, so it appears after the rest of the help text.
                setTimeout(() => this.logToUser(`${instructions}\n`, forceErrorCategory ? "stderr" : this.outputCategory), 10);
            }
        }
    }
    spawnRunDaemon(mode, deviceId, args, logger) {
        var _a, _b;
        let allArgs = [];
        if (mode === run_daemon_base_1.RunMode.Attach)
            allArgs.push("attach");
        else
            allArgs.push("run");
        allArgs.push("--machine");
        const isProfileMode = (_a = args.toolArgs) === null || _a === void 0 ? void 0 : _a.includes("--profile");
        const isReleaseMode = (_b = args.toolArgs) === null || _b === void 0 ? void 0 : _b.includes("--release");
        const isWeb = (0, utils_1.isWebDevice)(deviceId);
        if (mode === run_daemon_base_1.RunMode.Attach) {
            const vmServiceUri = (args.vmServiceUri || args.observatoryUri);
            if (vmServiceUri) {
                allArgs.push("--debug-uri");
                allArgs.push(vmServiceUri);
            }
        }
        if (mode === run_daemon_base_1.RunMode.Run) {
            // For release/profile, always be noDebug. If we don't do this, we
            // will use start-paused which can affect timing unexpectedly.
            // https://github.com/Dart-Code/Dart-Code/issues/3838
            if (isReleaseMode || isProfileMode) {
                this.noDebug = true;
            }
            // Additionally, for release mode
            // (or profile on web for now - see https://github.com/Dart-Code/Dart-Code/issues/3338)
            // disable connecting the debugger.
            if (isReleaseMode || (isProfileMode && isWeb)) {
                this.connectVmEvenForNoDebug = false;
            }
            // When running in Profile mode, we don't want isolates to start
            // paused because it could affect timings negatively and give a false
            // impression of performance.
            if (this.shouldConnectDebugger && !isProfileMode)
                allArgs.push("--start-paused");
        }
        // Replace in any custom tool.
        const customTool = {
            replacesArgs: args.customToolReplacesArgs,
            script: args.customTool,
        };
        let execution = (0, utils_1.usingCustomScript)(path.join(args.flutterSdkPath, constants_1.flutterPath), allArgs, customTool);
        allArgs = execution.args;
        if (args.toolArgs)
            allArgs = allArgs.concat(args.toolArgs);
        if (mode === run_daemon_base_1.RunMode.Run || args.program) {
            if (!args.omitTargetFlag)
                allArgs.push("--target");
            if (args.program.startsWith("//")) {
                allArgs.push(args.program);
            }
            else {
                allArgs.push(this.sourceFileForArgs(args));
            }
        }
        if (args.args)
            allArgs = allArgs.concat(args.args);
        execution = {
            args: allArgs,
            executable: execution.executable,
        };
        return new flutter_run_1.FlutterRun(mode, this.dartCapabilities, execution, args.cwd, { envOverrides: args.env, toolEnv: this.toolEnv }, args.flutterRunLogFile, logger, (url) => this.exposeUrl(url), this.maxLogLineLength);
    }
    connectToVmServiceIfReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.vmServiceUri && this.appHasStarted && !this.vmService)
                yield this.initDebugger(this.vmServiceUri);
        });
    }
    terminate(force) {
        const _super = Object.create(null, {
            terminate: { get: () => super.terminate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.appHasBeenToldToStopOrDetach) {
                this.appHasBeenToldToStopOrDetach = true;
                try {
                    if (this.currentRunningAppId && this.appHasStarted && !this.processExited && this.runDaemon) {
                        // Request to quit/detach, but don't await it since we sometimes
                        // don't get responses before the process quits.
                        if (this.runDaemon.mode === run_daemon_base_1.RunMode.Run)
                            this.runDaemon.stop(this.currentRunningAppId);
                        else
                            this.runDaemon.detach(this.currentRunningAppId);
                        // Now wait for the process to terminate up to 3s.
                        yield Promise.race([
                            this.processExit,
                            new Promise((resolve) => setTimeout(resolve, 3000)),
                        ]);
                    }
                }
                catch (_a) {
                    // Ignore failures here (we're shutting down and will send kill signals).
                }
            }
            yield _super.terminate.call(this, force);
        });
    }
    restartRequest(response, args) {
        const _super = Object.create(null, {
            restartRequest: { get: () => super.restartRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.sendEvent(new debugadapter_1.Event("dart.hotRestartRequest"));
            this.sendEvent(new debugadapter_1.ContinuedEvent(0, true));
            yield this.performReload(true, { reason: constants_1.restartReasonManual });
            _super.restartRequest.call(this, response, args);
        });
    }
    performReload(hotRestart, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.appHasStarted || !this.currentRunningAppId || !this.runDaemon)
                return;
            if (!this.flutterCapabilities.supportsRestartDebounce && this.isReloadInProgress) {
                this.sendEvent(new debugadapter_1.OutputEvent("Reload already in progress, ignoring request", "stderr"));
                return;
            }
            this.isReloadInProgress = true;
            const restartType = hotRestart ? "hot-restart" : "hot-reload";
            // To avoid issues with hot restart pausing on exceptions during the restart, we remove
            // exception-pause behaviour here, and it will be re-added as part of the startup code
            // when the new isolate appears.
            if (hotRestart)
                yield this.threadManager.setExceptionPauseMode("None", false);
            try {
                yield this.runDaemon.restart(this.currentRunningAppId, !this.noDebug, hotRestart, args);
            }
            catch (e) {
                this.sendEvent(new debugadapter_1.OutputEvent(`Error running ${restartType}: ${e}\n`, "stderr"));
            }
            finally {
                this.isReloadInProgress = false;
            }
        });
    }
    customRequest(request, response, args) {
        const _super = Object.create(null, {
            customRequest: { get: () => super.customRequest }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (request) {
                    case "hotReload":
                        if (this.currentRunningAppId)
                            yield this.performReload(false, args);
                        this.sendResponse(response);
                        break;
                    case "hotRestart":
                        if (this.currentRunningAppId)
                            yield this.performReload(true, args);
                        this.sendResponse(response);
                        break;
                    default:
                        yield _super.customRequest.call(this, request, response, args);
                        break;
                }
            }
            catch (e) {
                const error = (0, utils_1.errorString)(e);
                const message = `Error handling '${request}' custom request: ${error}`;
                if (!this.isTerminating)
                    this.sendEvent(new debugadapter_1.OutputEvent(`${message}\n`, "stderr"));
                this.logger.error(message);
                this.errorResponse(response, message);
            }
        });
    }
    handleInspectEvent(event) {
        const _super = Object.create(null, {
            handleInspectEvent: { get: () => super.handleInspectEvent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.runDaemon || !this.currentRunningAppId)
                return;
            const selectedWidget = yield this.runDaemon.callServiceExtension(this.currentRunningAppId, "ext.flutter.inspector.getSelectedSummaryWidget", { previousSelectionId: null, objectGroup: objectGroupName });
            try {
                if (selectedWidget && selectedWidget.result && selectedWidget.result.creationLocation) {
                    const loc = selectedWidget.result.creationLocation;
                    const file = loc.file;
                    const line = loc.line;
                    const column = loc.column;
                    this.sendEvent(new debugadapter_1.Event("dart.navigate", { file, line, column, inOtherEditorColumn: true, fromInspector: true }));
                }
                else {
                    yield _super.handleInspectEvent.call(this, event);
                }
            }
            finally {
                // console.log(JSON.stringify(selectedWidget));
                yield this.runDaemon.callServiceExtension(this.currentRunningAppId, "ext.flutter.inspector.disposeGroup", { objectGroup: objectGroupName });
                // TODO: How can we translate this back to source?
                // const evt = event as any;
                // const thread: VMIsolateRef = evt.isolate;
                // const inspectee = (event as any).inspectee;
            }
        });
    }
    handleFlutterErrorEvent(event) {
        const error = event.extensionData;
        this.logFlutterErrorToUser(error);
        if (this.useInspectorNotificationsForWidgetErrors)
            this.tryParseDevToolsInspectLink(error);
    }
    logFlutterErrorToUser(error) {
        const assumedTerminalSize = 80;
        const barChar = "═";
        const headerPrefix = barChar.repeat(8);
        const headerSuffix = barChar.repeat(Math.max((assumedTerminalSize - error.description.length - 2 - headerPrefix.length), 0));
        const header = `${headerPrefix} ${error.description} ${headerSuffix}`;
        this.logToUser(`\n`, "stderr");
        this.logToUser(`${header}\n`, "stderr");
        if (error.errorsSinceReload)
            this.logFlutterErrorSummary(error);
        else
            this.logDiagnosticNodeDescendents(error);
        this.logToUser(`${barChar.repeat(header.length)}\n`, "stderr");
    }
    logDiagnosticNodeToUser(node, { parent, level = 0, blankLineAfterSummary = true }) {
        if (node.description && node.description.startsWith("◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤"))
            return;
        if (node.type === structured_errors_1.DiagnosticsNodeType.ErrorSpacer)
            return;
        let line = " ".repeat(level * 4);
        if (node.name && node.showName !== false) {
            line += node.name;
            if (node.showSeparator !== false && node.description)
                line += ": ";
        }
        if (node.description) {
            if (this.useInspectorNotificationsForWidgetErrors && node.type === structured_errors_1.DiagnosticsNodeType.DevToolsDeepLinkProperty)
                line += "You can inspect this widget using the 'Inspect Widget' button in the VS Code notification.";
            else
                line += node.description;
        }
        line = line.trimRight();
        // For text that is not part of a stack trace and is not an Error or Summary we
        // want to override the default red text for the stderr category to grey.
        const isErrorMessage = node.level === structured_errors_1.DiagnosticsNodeLevel.Error
            || node.level === structured_errors_1.DiagnosticsNodeLevel.Summary
            // TODO: Remove this when Flutter is marking user-thrown exceptions with
            // ErrorSummary.
            || node.description && node.description.startsWith("Exception: ");
        if (isErrorMessage) {
            this.logToUser(`${line}\n`, "stderr");
        }
        else {
            this.logToUser(`${line}\n`, "stdout");
        }
        if (blankLineAfterSummary && node.level === structured_errors_1.DiagnosticsNodeLevel.Summary)
            this.logToUser("\n", "stdout");
        const childLevel = node.style === structured_errors_1.DiagnosticsNodeStyle.Flat
            ? level
            : level + 1;
        this.logDiagnosticNodeDescendents(node, childLevel);
    }
    logFlutterErrorSummary(error) {
        for (const p of error.properties) {
            const allChildrenAreLeaf = p.children && p.children.length && !p.children.find((c) => c.children && c.children.length);
            if (p.level === structured_errors_1.DiagnosticsNodeLevel.Summary || allChildrenAreLeaf)
                this.logDiagnosticNodeToUser(p, { parent: error, blankLineAfterSummary: false });
        }
    }
    logDiagnosticNodeDescendents(node, level = 0) {
        if (node.style === structured_errors_1.DiagnosticsNodeStyle.Shallow)
            return;
        if (node.properties) {
            let lastLevel;
            for (const child of node.properties) {
                if (lastLevel !== child.level && (lastLevel === structured_errors_1.DiagnosticsNodeLevel.Hint || child.level === structured_errors_1.DiagnosticsNodeLevel.Hint))
                    this.logToUser("\n", "stdout");
                this.logDiagnosticNodeToUser(child, { parent: node, level });
                lastLevel = child.level;
            }
        }
        if (node.children)
            node.children.forEach((child) => this.logDiagnosticNodeToUser(child, { parent: node, level }));
    }
    tryParseDevToolsInspectLink(error) {
        var _a, _b;
        try {
            const errorSummaryNode = (_a = error.properties) === null || _a === void 0 ? void 0 : _a.find((p) => p.type === structured_errors_1.DiagnosticsNodeType.ErrorSummary);
            const devToolsLinkNode = (_b = error.properties) === null || _b === void 0 ? void 0 : _b.find((p) => p.type === structured_errors_1.DiagnosticsNodeType.DevToolsDeepLinkProperty);
            // "A RenderFlex overflowed by 5551 pixels on the right."
            const errorDescription = errorSummaryNode === null || errorSummaryNode === void 0 ? void 0 : errorSummaryNode.description;
            // "http://127.0.0.1:9100/#/inspector?uri=http%3A%2F%2F127.0.0.1%3A49905%2FC-UKCEA9hEQ%3D%2F&inspectorRef=inspector-0"
            const devToolsInspectWidgetUrl = devToolsLinkNode === null || devToolsLinkNode === void 0 ? void 0 : devToolsLinkNode.value;
            const devToolsInspectWidgetUrlMatch = devToolsInspectWidgetUrl ? FlutterDebugSession.flutterErrorDevToolsUrlPattern.exec(devToolsInspectWidgetUrl) : undefined;
            const devToolsUrl = (devToolsInspectWidgetUrlMatch === null || devToolsInspectWidgetUrlMatch === void 0 ? void 0 : devToolsInspectWidgetUrlMatch.length) ? devToolsInspectWidgetUrlMatch[1] : undefined;
            const inspectorReference = (devToolsInspectWidgetUrlMatch === null || devToolsInspectWidgetUrlMatch === void 0 ? void 0 : devToolsInspectWidgetUrlMatch.length) ? devToolsInspectWidgetUrlMatch[2] : undefined;
            if (errorDescription && devToolsUrl && inspectorReference) {
                this.sendEvent(new debugadapter_1.Event("dart.flutter.widgetErrorInspectData", { errorDescription, devToolsUrl, inspectorReference }));
            }
        }
        catch (e) {
            this.logger.error(`Error trying to parse widget inspect data from structured error`);
        }
    }
    // Extension
    handleExtensionEvent(event) {
        const _super = Object.create(null, {
            handleExtensionEvent: { get: () => super.handleExtensionEvent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // Don't process any events while the debugger is still running init code.
            yield this.debuggerInit;
            if (event.kind === "Extension" && event.extensionKind === "Flutter.Error") {
                this.handleFlutterErrorEvent(event);
            }
            else if (event.kind === "Extension" && event.extensionKind === "Flutter.ServiceExtensionStateChanged") {
                this.sendEvent(new debugadapter_1.Event("flutter.serviceExtensionStateChanged", event.extensionData));
            }
            else {
                _super.handleExtensionEvent.call(this, event);
            }
        });
    }
}
exports.FlutterDebugSession = FlutterDebugSession;
FlutterDebugSession.flutterErrorDevToolsUrlPattern = new RegExp("(https?://[^/]+/)[^ ]+&inspectorRef=([^ &\\n]+)");


/***/ }),

/***/ 2758:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlutterRun = void 0;
const enums_1 = __webpack_require__(7341);
const logging_1 = __webpack_require__(8323);
const run_daemon_base_1 = __webpack_require__(2330);
class FlutterRun extends run_daemon_base_1.RunDaemonBase {
    constructor(mode, dartCapabilties, execution, projectFolder, env, logFile, logger, urlExposer, maxLogLineLength) {
        super(mode, dartCapabilties, logFile, new logging_1.CategoryLogger(logger, enums_1.LogCategory.FlutterRun), urlExposer, maxLogLineLength, true, true);
        this.createProcess(projectFolder, execution.executable, execution.args, env);
    }
}
exports.FlutterRun = FlutterRun;


/***/ }),

/***/ 2651:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlutterTestDebugSession = void 0;
const path = __webpack_require__(1017);
const constants_1 = __webpack_require__(5628);
const enums_1 = __webpack_require__(7341);
const utils_1 = __webpack_require__(4586);
const dart_test_debug_impl_1 = __webpack_require__(2485);
const logging_1 = __webpack_require__(8257);
class FlutterTestDebugSession extends dart_test_debug_impl_1.DartTestDebugSession {
    spawnProcess(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let allArgs = ["test", "--machine"];
            if (this.shouldConnectDebugger)
                allArgs.push("--start-paused");
            // Replace in any custom tool.
            const customTool = {
                replacesArgs: args.customToolReplacesArgs,
                script: args.customTool,
            };
            const execution = (0, utils_1.usingCustomScript)(path.join(args.flutterSdkPath, constants_1.flutterPath), allArgs, customTool);
            allArgs = execution.args;
            if (args.toolArgs)
                allArgs = allArgs.concat(args.toolArgs);
            // For `flutter test`, arguments cannot go after the script name or they will be interpreted
            // as test scripts and fail, so insert them before [program]. If `flutter` is updated to work
            // like `pub run test` and dart run test:test` in future, this should be moved below for consistency.
            if (args.args)
                allArgs = allArgs.concat(args.args);
            if (args.program)
                allArgs.push(this.sourceFileForArgs(args));
            const logger = new logging_1.DebugAdapterLogger(this, enums_1.LogCategory.FlutterTest);
            return this.createRunner(execution.executable, args.cwd, allArgs, args.env, args.flutterTestLogFile, logger, args.maxLogLineLength);
        });
    }
}
exports.FlutterTestDebugSession = FlutterTestDebugSession;


/***/ }),

/***/ 8257:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DebugAdapterLogger = void 0;
const debugadapter_1 = __webpack_require__(9955);
const enums_1 = __webpack_require__(7341);
const utils_1 = __webpack_require__(4586);
// A logger that passes log events back to the UI in `dart.log` events.
class DebugAdapterLogger {
    constructor(debugClient, category) {
        this.debugClient = debugClient;
        this.category = category;
    }
    log(message, severity, category = this.category) {
        this.debugClient.sendEvent(new debugadapter_1.Event("dart.log", { message, severity, category }));
    }
    info(message, category) {
        this.log(message, enums_1.LogSeverity.Info, category);
    }
    warn(errorOrMessage, category) {
        this.log((0, utils_1.errorString)(errorOrMessage), enums_1.LogSeverity.Warn, category);
    }
    error(errorOrMessage, category) {
        this.log((0, utils_1.errorString)(errorOrMessage), enums_1.LogSeverity.Error, category);
    }
}
exports.DebugAdapterLogger = DebugAdapterLogger;


/***/ }),

/***/ 2330:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RunMode = exports.RunDaemonBase = void 0;
const stdio_service_1 = __webpack_require__(3058);
class RunDaemonBase extends stdio_service_1.StdIOService {
    constructor(mode, dartCapabilities, logFile, logger, urlExposer, maxLogLineLength, messagesWrappedInBrackets = false, treatHandlingErrorsAsUnhandledMessages = false) {
        super(logger, maxLogLineLength, messagesWrappedInBrackets, treatHandlingErrorsAsUnhandledMessages, true, logFile);
        this.mode = mode;
        this.dartCapabilities = dartCapabilities;
        this.urlExposer = urlExposer;
        this.unhandledMessageSubscriptions = [];
        // Subscription lists.
        this.daemonConnectedSubscriptions = [];
        this.appStartSubscriptions = [];
        this.appDebugPortSubscriptions = [];
        this.appStartedSubscriptions = [];
        this.appStopSubscriptions = [];
        this.appProgressSubscriptions = [];
        this.appWebLaunchUrlSubscriptions = [];
        this.appLogSubscriptions = [];
        this.errorSubscriptions = [];
        this.daemonLogMessageSubscriptions = [];
        this.daemonLogSubscriptions = [];
    }
    shouldHandleMessage(message) {
        // Everything in daemon is wrapped in [] so we can tell what to handle.
        return message.startsWith("[{") && message.endsWith("}]");
    }
    processUnhandledMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.notify(this.unhandledMessageSubscriptions, message);
        });
    }
    registerForUnhandledMessages(subscriber) {
        return this.subscribe(this.unhandledMessageSubscriptions, subscriber);
    }
    handleRequest(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (method) {
                case "app.exposeUrl":
                    return this.urlExposer(params.url);
                default:
                    throw new Error(`Unknown request ${method}`);
            }
        });
    }
    // TODO: Can we code-gen all this like the analysis server?
    handleNotification(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            // Always send errors up, no matter where they're from.
            if (evt.params.error) {
                yield this.notify(this.errorSubscriptions, evt.params.error);
            }
            switch (evt.event) {
                case "daemon.connected":
                    yield this.notify(this.daemonConnectedSubscriptions, evt.params);
                    break;
                case "app.start":
                    yield this.notify(this.appStartSubscriptions, evt.params);
                    break;
                case "app.debugPort":
                    yield this.notify(this.appDebugPortSubscriptions, evt.params);
                    break;
                case "app.started":
                    yield this.notify(this.appStartedSubscriptions, evt.params);
                    break;
                case "app.webLaunchUrl":
                    yield this.notify(this.appWebLaunchUrlSubscriptions, evt.params);
                    break;
                case "app.stop":
                    yield this.notify(this.appStopSubscriptions, evt.params);
                    break;
                case "app.progress":
                    yield this.notify(this.appProgressSubscriptions, evt.params);
                    break;
                case "app.log":
                    yield this.notify(this.appLogSubscriptions, evt.params);
                    break;
                case "daemon.logMessage":
                    yield this.notify(this.daemonLogMessageSubscriptions, evt.params);
                    break;
                case "daemon.log":
                    yield this.notify(this.daemonLogSubscriptions, evt.params);
                    break;
            }
        });
    }
    // Request methods.
    restart(appId, pause, hotRestart, args) {
        return this.sendRequest("app.restart", { appId, fullRestart: hotRestart === true, pause, reason: args === null || args === void 0 ? void 0 : args.reason, debounce: args === null || args === void 0 ? void 0 : args.debounce });
    }
    detach(appId) {
        return this.sendRequest("app.detach", { appId });
    }
    stop(appId) {
        return this.sendRequest("app.stop", { appId });
    }
    callServiceExtension(appId, methodName, params) {
        return this.sendRequest("app.callServiceExtension", { appId, methodName, params });
    }
    // Subscription methods.
    registerForDaemonConnect(subscriber) {
        return this.subscribe(this.daemonConnectedSubscriptions, subscriber);
    }
    registerForAppStart(subscriber) {
        return this.subscribe(this.appStartSubscriptions, subscriber);
    }
    registerForAppDebugPort(subscriber) {
        return this.subscribe(this.appDebugPortSubscriptions, subscriber);
    }
    registerForAppStarted(subscriber) {
        return this.subscribe(this.appStartedSubscriptions, subscriber);
    }
    registerForAppStop(subscriber) {
        return this.subscribe(this.appStopSubscriptions, subscriber);
    }
    registerForAppProgress(subscriber) {
        return this.subscribe(this.appProgressSubscriptions, subscriber);
    }
    registerForAppWebLaunchUrl(subscriber) {
        return this.subscribe(this.appWebLaunchUrlSubscriptions, subscriber);
    }
    registerForAppLog(subscriber) {
        return this.subscribe(this.appLogSubscriptions, subscriber);
    }
    registerForError(subscriber) {
        return this.subscribe(this.errorSubscriptions, subscriber);
    }
    registerForDaemonLogMessage(subscriber) {
        return this.subscribe(this.daemonLogMessageSubscriptions, subscriber);
    }
    registerForDaemonLog(subscriber) {
        return this.subscribe(this.daemonLogSubscriptions, subscriber);
    }
}
exports.RunDaemonBase = RunDaemonBase;
var RunMode;
(function (RunMode) {
    RunMode[RunMode["Run"] = 0] = "Run";
    RunMode[RunMode["Attach"] = 1] = "Attach";
})(RunMode = exports.RunMode || (exports.RunMode = {}));


/***/ }),

/***/ 3163:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestRunner = void 0;
const stdio_service_1 = __webpack_require__(3058);
class TestRunner extends stdio_service_1.StdIOService {
    constructor(executable, projectFolder, args, env, logFile, logger, maxLogLineLength) {
        super(logger, maxLogLineLength, true, true, true, logFile);
        this.unhandledMessageSubscriptions = [];
        // Subscription lists.
        this.testStartedProcessSubscriptions = [];
        this.allTestNotificationsSubscriptions = [];
        this.createProcess(projectFolder, executable, args, env);
    }
    shouldHandleMessage(message) {
        return (message.startsWith("{") && message.endsWith("}"))
            || (message.startsWith("[{") && message.endsWith("}]"));
    }
    isNotification(msg) { return !!(msg.type || msg.event); }
    isResponse(msg) { return false; }
    processUnhandledMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.notify(this.unhandledMessageSubscriptions, message);
        });
    }
    registerForUnhandledMessages(subscriber) {
        return this.subscribe(this.unhandledMessageSubscriptions, subscriber);
    }
    handleNotification(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(JSON.stringify(evt));
            switch (evt.event) {
                case "test.startedProcess":
                    yield this.notify(this.testStartedProcessSubscriptions, evt.params);
                    break;
            }
            // Send all events to the editor.
            yield this.notify(this.allTestNotificationsSubscriptions, evt);
        });
    }
    // Subscription methods.
    registerForTestStartedProcess(subscriber) {
        return this.subscribe(this.testStartedProcessSubscriptions, subscriber);
    }
    registerForAllTestNotifications(subscriber) {
        return this.subscribe(this.allTestNotificationsSubscriptions, subscriber);
    }
}
exports.TestRunner = TestRunner;


/***/ }),

/***/ 783:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadInfo = exports.ThreadManager = void 0;
const debugadapter_1 = __webpack_require__(9955);
const enums_1 = __webpack_require__(7341);
const utils_1 = __webpack_require__(4586);
class ThreadManager {
    constructor(logger, debugSession) {
        this.logger = logger;
        this.debugSession = debugSession;
        this.nextThreadId = 0;
        this.threads = [];
        this.bps = {};
        this.hasConfigurationDone = false;
        this.exceptionMode = "Unhandled";
        this.nextDataId = 1;
        this.storedData = {};
    }
    registerThread(ref, eventKind) {
        return __awaiter(this, void 0, void 0, function* () {
            let thread = this.getThreadInfoFromRef(ref);
            if (!thread) {
                thread = new ThreadInfo(this, ref, this.nextThreadId);
                this.nextThreadId++;
                this.threads.push(thread);
                // If this is the first time we've seen it, fire an event
                this.debugSession.sendEvent(new debugadapter_1.ThreadEvent("started", thread.num));
                if (this.hasConfigurationDone)
                    thread.receivedConfigurationDone();
            }
            // If it's just become runnable (IsolateRunnable), then set breakpoints.
            if (eventKind === "IsolateRunnable" && !thread.runnable) {
                thread.runnable = true;
                if (this.debugSession.vmService) {
                    yield Promise.all([
                        this.debugSession.vmService.setExceptionPauseMode(thread.ref.id, this.exceptionMode),
                        this.setLibrariesDebuggable(thread.ref),
                        this.resendThreadBreakpoints(thread),
                    ]);
                    thread.setInitialBreakpoints();
                }
            }
        });
    }
    setLibrariesDuggableForAllIsolates() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.threads.map((thread) => this.setLibrariesDebuggable(thread.ref)));
        });
    }
    receivedConfigurationDone() {
        this.hasConfigurationDone = true;
        for (const thread of this.threads)
            thread.receivedConfigurationDone();
    }
    getThreadInfoFromRef(ref) {
        for (const thread of this.threads) {
            if (thread.ref.id === ref.id)
                return thread;
        }
        return undefined;
    }
    getThreadInfoFromNumber(num) {
        for (const thread of this.threads) {
            if (thread.num === num)
                return thread;
        }
        return undefined;
    }
    getThreads() {
        return this.threads.map((thread) => new debugadapter_1.Thread(thread.num, thread.ref.name));
    }
    setExceptionPauseMode(mode, persist = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (persist) {
                this.exceptionMode = mode;
            }
            if (!this.debugSession.vmService)
                return;
            yield Promise.all(this.threads.map((thread) => __awaiter(this, void 0, void 0, function* () {
                if (!thread.runnable || !this.debugSession.vmService)
                    return;
                yield this.debugSession.vmService.setExceptionPauseMode(thread.ref.id, mode);
            })));
        });
    }
    setLibrariesDebuggable(isolateRef) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debugSession.noDebug || !this.debugSession.vmService)
                return;
            // Helpers to categories libraries as SDK/ExternalLibrary/not.
            // Set whether libraries should be debuggable based on user settings.
            const response = yield this.debugSession.vmService.getIsolate(isolateRef.id);
            const isolate = response.result;
            const validDebugLibraries = ((_a = isolate.libraries) === null || _a === void 0 ? void 0 : _a.filter((l) => this.debugSession.isValidToDebug(l.uri))) || [];
            if (validDebugLibraries.length === 0)
                return;
            const debugSession = this.debugSession;
            function setLibrary(library) {
                if (!debugSession.vmService)
                    return Promise.resolve(true);
                // Note: Condition is negated.
                const shouldDebug = !(
                // Inside here is shouldNotDebug!
                (debugSession.isSdkLibrary(library.uri) && !debugSession.debugSdkLibraries)
                    || (debugSession.isExternalLibrary(library.uri) && !debugSession.debugExternalPackageLibraries));
                return debugSession.vmService.setLibraryDebuggable(isolate.id, library.id, shouldDebug);
            }
            // We usually send these requests all concurrently, however on web this is not currently
            // supported (https://github.com/dart-lang/webdev/issues/606) which results in a lot of
            // bloat in the logs. Instead, send the first one, and if it works successfully, then
            // do the whole lot.
            const firstLib = validDebugLibraries[0];
            try {
                yield setLibrary(firstLib);
            }
            catch (e) {
                this.logger.info((0, utils_1.errorString)(e));
                return;
            }
            // Do all.
            yield Promise.all(validDebugLibraries.map(setLibrary)).catch((e) => this.logger.info((0, utils_1.errorString)(e)));
        });
    }
    // Just resends existing breakpoints for a single thread.
    resendThreadBreakpoints(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const uri of Object.keys(this.bps)) {
                promises.push(thread.setBreakpoints(this.logger, uri, this.bps[uri]));
            }
            yield Promise.all(promises);
        });
    }
    setBreakpoints(uri, breakpoints) {
        // Remember these bps for when new threads start.
        if (breakpoints.length === 0)
            delete this.bps[uri];
        else
            this.bps[uri] = breakpoints;
        let promise;
        for (const thread of this.threads) {
            if (thread.runnable) {
                const result = thread.setBreakpoints(this.logger, uri, breakpoints);
                if (!promise)
                    promise = result;
            }
        }
        if (promise)
            return promise;
        const completer = new utils_1.PromiseCompleter();
        completer.resolve(breakpoints.map(() => true));
        return completer.promise;
    }
    storeData(thread, data) {
        const id = this.nextDataId;
        this.nextDataId++;
        this.storedData[id] = new StoredData(thread, data);
        return id;
    }
    getStoredData(id) {
        return this.storedData[id];
    }
    removeStoredData(thread) {
        for (const id of Object.keys(this.storedData).map((k) => parseInt(k, 10))) {
            if (this.storedData[id].thread.num === thread.num)
                delete this.storedData[id];
        }
    }
    removeAllStoredData() {
        for (const id of Object.keys(this.storedData).map((k) => parseInt(k, 10))) {
            delete this.storedData[id];
        }
    }
    handleIsolateExit(ref) {
        const threadInfo = this.getThreadInfoFromRef(ref);
        if (threadInfo) {
            this.debugSession.sendEvent(new debugadapter_1.ThreadEvent("exited", threadInfo.num));
            this.threads.splice(this.threads.indexOf(threadInfo), 1);
            this.removeStoredData(threadInfo);
        }
    }
}
exports.ThreadManager = ThreadManager;
class StoredData {
    constructor(thread, data) {
        this.thread = thread;
        this.data = data;
    }
}
class ThreadInfo {
    constructor(manager, ref, num) {
        this.manager = manager;
        this.ref = ref;
        this.num = num;
        this.scriptCompleters = {};
        this.runnable = false;
        this.vmBps = {};
        // TODO: Do we need both sets of breakpoints?
        this.breakpoints = {};
        this.atAsyncSuspension = false;
        this.exceptionReference = 0;
        this.paused = false;
        this.gotPauseStart = false;
        this.initialBreakpoints = false;
        this.hasConfigurationDone = false;
        this.hasPendingResume = false;
    }
    removeBreakpointsAtUri(uri) {
        const removeBreakpointPromises = [];
        const breakpoints = this.vmBps[uri];
        if (breakpoints) {
            if (this.manager.debugSession.vmService) {
                for (const bp of breakpoints) {
                    removeBreakpointPromises.push(this.manager.debugSession.vmService.removeBreakpoint(this.ref.id, bp.id));
                }
            }
            delete this.vmBps[uri];
        }
        return Promise.all(removeBreakpointPromises);
    }
    removeAllBreakpoints() {
        const removeBreakpointPromises = [];
        for (const uri of Object.keys(this.vmBps)) {
            removeBreakpointPromises.push(this.removeBreakpointsAtUri(uri));
        }
        return Promise.all(removeBreakpointPromises);
    }
    setBreakpoints(logger, uri, breakpoints) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove all current bps.
            yield this.removeBreakpointsAtUri(uri);
            this.vmBps[uri] = [];
            return Promise.all(breakpoints.map((bp) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    if (!this.manager.debugSession.vmService)
                        return undefined;
                    const result = yield this.manager.debugSession.vmService.addBreakpointWithScriptUri(this.ref.id, uri, bp.line, bp.column);
                    const vmBp = result.result;
                    (_a = this.vmBps[uri]) === null || _a === void 0 ? void 0 : _a.push(vmBp);
                    this.breakpoints[vmBp.id] = bp;
                    return vmBp;
                }
                catch (e) {
                    logger.error(e, enums_1.LogCategory.VmService);
                    return undefined;
                }
            })));
        });
    }
    receivedPauseStart() {
        this.gotPauseStart = true;
        this.paused = true;
        this.checkResume();
    }
    setInitialBreakpoints() {
        this.initialBreakpoints = true;
        this.checkResume();
    }
    receivedConfigurationDone() {
        this.hasConfigurationDone = true;
        this.checkResume();
    }
    checkResume() {
        if (this.paused && this.gotPauseStart && this.initialBreakpoints && this.hasConfigurationDone)
            // tslint:disable-next-line: no-floating-promises
            this.resume();
    }
    handleResumed() {
        this.manager.removeStoredData(this);
        // TODO: Should we be waiting for acknowledgement before doing this?
        this.atAsyncSuspension = false;
        this.exceptionReference = 0;
        this.paused = false;
        this.pauseEvent = undefined;
    }
    resume(step, frameIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.paused || this.hasPendingResume || !this.manager.debugSession.vmService)
                return;
            this.hasPendingResume = true;
            try {
                yield this.manager.debugSession.vmService.resume(this.ref.id, step, frameIndex);
                this.handleResumed();
            }
            finally {
                this.hasPendingResume = false;
            }
        });
    }
    getScript(scriptRef) {
        const scriptId = scriptRef.id;
        if (this.scriptCompleters[scriptId]) {
            const completer = this.scriptCompleters[scriptId];
            return completer.promise;
        }
        else {
            const completer = new utils_1.PromiseCompleter();
            this.scriptCompleters[scriptId] = completer;
            if (this.manager.debugSession.vmService) {
                this.manager.debugSession.vmService.getObject(this.ref.id, scriptRef.id).then((result) => {
                    const script = result.result;
                    completer.resolve(script);
                }).catch((error) => {
                    completer.reject(error);
                });
            }
            else {
                completer.reject(`VM service connection is no longer available`);
            }
            return completer.promise;
        }
    }
    storeData(data) {
        return this.manager.storeData(this, data);
    }
    handlePaused(pauseEvent) {
        this.atAsyncSuspension = pauseEvent.atAsyncSuspension === true;
        if (pauseEvent.exception) {
            const exception = pauseEvent.exception;
            exception.evaluateName = "$_threadException";
            this.exceptionReference = this.storeData(exception);
        }
        this.paused = true;
        this.pauseEvent = pauseEvent;
    }
}
exports.ThreadInfo = ThreadInfo;


/***/ }),

/***/ 4446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatPathForVm = void 0;
const fs_1 = __webpack_require__(300);
function formatPathForVm(file) {
    // Handle drive letter inconsistencies.
    file = (0, fs_1.forceWindowsDriveLetterToUppercase)(file);
    // Convert any Windows backslashes to forward slashes.
    file = file.replace(/\\/g, "/");
    // Remove any existing file:/(//) prefixes.
    file = file.replace(/^file:\/+/, ""); // TODO: Does this case ever get hit? Will it be over-encoded?
    // Remove any remaining leading slashes.
    file = file.replace(/^\/+/, "");
    // Ensure a single slash prefix.
    if (file.startsWith("dart:"))
        return file;
    else
        return `file:///${encodeURI(file)}`;
}
exports.formatPathForVm = formatPathForVm;


/***/ }),

/***/ 2812:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebDebugSession = void 0;
const enums_1 = __webpack_require__(7341);
const processes_1 = __webpack_require__(5837);
const utils_1 = __webpack_require__(4586);
const flutter_debug_impl_1 = __webpack_require__(8384);
const web_run_1 = __webpack_require__(703);
class WebDebugSession extends flutter_debug_impl_1.FlutterDebugSession {
    constructor() {
        super();
        // There is no observatory web app, so we shouldn't send an ObservatoryURI
        // back to the editor, since that enables "Dart: Open Observatory" and friends.
        this.supportsObservatoryWebApp = false;
        this.logCategory = enums_1.LogCategory.WebDaemon;
    }
    spawnRunDaemon(mode, deviceId, args, logger) {
        let allArgs = ["global", "run", "webdev", "daemon"];
        // 	if (this.shouldConnectDebugger) {
        // 		appArgs.push("--start-paused");
        // 	}
        // }
        if (args.toolArgs)
            allArgs = allArgs.concat(args.toolArgs);
        const pubExecution = (0, processes_1.getPubExecutionInfo)(this.dartCapabilities, args.dartSdkPath, allArgs);
        const customTool = {
            replacesArgs: args.customToolReplacesArgs,
            script: args.customTool,
        };
        let execution = (0, utils_1.usingCustomScript)(pubExecution.executable, pubExecution.args, customTool);
        allArgs = execution.args;
        if (args.args)
            allArgs = allArgs.concat(args.args);
        execution = {
            args: allArgs,
            executable: execution.executable,
        };
        // TODO: Attach?
        return new web_run_1.WebRun(mode, this.dartCapabilities, execution, args.cwd, { envOverrides: args.env, toolEnv: this.toolEnv }, args.webDaemonLogFile, logger, (url) => this.exposeUrl(url), this.maxLogLineLength);
    }
}
exports.WebDebugSession = WebDebugSession;


/***/ }),

/***/ 703:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebRun = void 0;
const run_daemon_base_1 = __webpack_require__(2330);
class WebRun extends run_daemon_base_1.RunDaemonBase {
    constructor(mode, dartCapabilties, execution, projectFolder, env, logFile, logger, urlExposer, maxLogLineLength) {
        super(mode, dartCapabilties, logFile, logger, urlExposer, maxLogLineLength, true, true);
        this.createProcess(projectFolder, execution.executable, execution.args, env);
    }
}
exports.WebRun = WebRun;


/***/ }),

/***/ 5760:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebTestDebugSession = void 0;
const dart_test_debug_impl_1 = __webpack_require__(2485);
class WebTestDebugSession extends dart_test_debug_impl_1.DartTestDebugSession {
    spawnProcess(args) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: This!
            throw new Error("NYI");
        });
    }
}
exports.WebTestDebugSession = WebTestDebugSession;


/***/ }),

/***/ 7355:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DartCapabilities = void 0;
const utils_1 = __webpack_require__(4586);
class DartCapabilities {
    constructor(dartVersion) {
        this.version = dartVersion;
    }
    static get empty() { return new DartCapabilities("0.0.0"); }
    get canDefaultLsp() { return (0, utils_1.versionIsAtLeast)(this.version, "2.12.0-0"); }
    // This is also missing in v2.10, but assume it will be back in v2.11.
    // https://github.com/dart-lang/sdk/issues/43207
    get includesSourceForSdkLibs() { return (0, utils_1.versionIsAtLeast)(this.version, "2.2.1") && !this.version.startsWith("2.10."); }
    get hasLspInsertTextModeSupport() { return (0, utils_1.versionIsAtLeast)(this.version, "2.13.0-0"); }
    get supportsSnippetTextEdits() { return (0, utils_1.versionIsAtLeast)(this.version, "2.13.0-150"); }
    get supportsRefactorValidate() { return (0, utils_1.versionIsAtLeast)(this.version, "2.17.0"); }
    get supportsWriteServiceInfo() { return (0, utils_1.versionIsAtLeast)(this.version, "2.7.1"); }
    get supportsDartCreate() { return (0, utils_1.versionIsAtLeast)(this.version, "2.10.0"); }
    get supportsDebugInternalLibraries() { return (0, utils_1.versionIsAtLeast)(this.version, "2.9.0-a"); }
    get supportsDisableDartDev() { return (0, utils_1.versionIsAtLeast)(this.version, "2.12.0-0"); }
    get hasDdsTimingFix() { return (0, utils_1.versionIsAtLeast)(this.version, "2.13.0-117"); }
    get hasZeroParamNoTabStopFix() { return (0, utils_1.versionIsAtLeast)(this.version, "2.17.0-117"); }
    get supportsLanguageServerCommand() { return (0, utils_1.versionIsAtLeast)(this.version, "2.14.4"); }
    get supportsNoServeDevTools() { return (0, utils_1.versionIsAtLeast)(this.version, "2.14.0-172.0"); }
    get supportsPubUpgradeMajorVersions() { return (0, utils_1.versionIsAtLeast)(this.version, "2.12.0"); }
    get supportsPubOutdated() { return (0, utils_1.versionIsAtLeast)(this.version, "2.8.0-a"); }
    get supportsPubDepsJson() { return (0, utils_1.versionIsAtLeast)(this.version, "2.14.0-0"); }
    get supportsPubAddMultiple() { return (0, utils_1.versionIsAtLeast)(this.version, "2.17.0"); }
    get supportsDartPub() { return (0, utils_1.versionIsAtLeast)(this.version, "2.12.0-0"); }
    get supportsDartRunForPub() { return (0, utils_1.versionIsAtLeast)(this.version, "2.16.0-0"); }
    get supportsDartDoc() { return (0, utils_1.versionIsAtLeast)(this.version, "2.16.0"); }
    get supportsDartDevTools() { return (0, utils_1.versionIsAtLeast)(this.version, "2.15.0"); }
    get supportsDartRunTest() { return (0, utils_1.versionIsAtLeast)(this.version, "2.12.0-0"); }
    get supportsNonFileSchemeWorkspaces() { return (0, utils_1.versionIsAtLeast)(this.version, "2.13.0-28"); }
    get supportsServerSnippets() { return (0, utils_1.versionIsAtLeast)(this.version, "2.17.0-258"); }
    get supportsSdkDap() { return (0, utils_1.versionIsAtLeast)(this.version, "2.17.0-0"); }
    // TODO: Update these (along with Flutter) when supported.
    get webSupportsEvaluation() { return false; }
    get webSupportsDebugging() { return true; }
    get webSupportsHotReload() { return false; }
}
exports.DartCapabilities = DartCapabilities;


/***/ }),

/***/ 4790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DaemonCapabilities = exports.FlutterCapabilities = void 0;
const utils_1 = __webpack_require__(4586);
class FlutterCapabilities {
    constructor(flutterVersion) {
        this.version = flutterVersion;
    }
    static get empty() { return new FlutterCapabilities("0.0.0"); }
    get supportsCreateSkeleton() { return (0, utils_1.versionIsAtLeast)(this.version, "2.5.0"); }
    get supportsCreatingSamples() { return (0, utils_1.versionIsAtLeast)(this.version, "1.0.0"); }
    get hasLatestStructuredErrorsWork() { return (0, utils_1.versionIsAtLeast)(this.version, "1.21.0-5.0"); }
    get supportsFlutterCreateListSamples() { return (0, utils_1.versionIsAtLeast)(this.version, "1.3.10"); }
    get supportsWsVmService() { return (0, utils_1.versionIsAtLeast)(this.version, "1.18.0-5"); }
    get supportsWsDebugBackend() { return (0, utils_1.versionIsAtLeast)(this.version, "1.21.0-0"); }
    get supportsWsInjectedClient() { return (0, utils_1.versionIsAtLeast)(this.version, "2.1.0-13.0"); }
    get supportsExposeUrl() { return (0, utils_1.versionIsAtLeast)(this.version, "1.18.0-5"); }
    get supportsDartDefine() { return (0, utils_1.versionIsAtLeast)(this.version, "1.17.0"); }
    get supportsRestartDebounce() { return (0, utils_1.versionIsAtLeast)(this.version, "1.21.0-0"); }
    get supportsRunSkippedTests() { return (0, utils_1.versionIsAtLeast)(this.version, "2.1.0-11"); }
    get supportsShowWebServerDevice() { return (0, utils_1.versionIsAtLeast)(this.version, "1.26.0-0"); }
    get supportsWebRendererOption() { return (0, utils_1.versionIsAtLeast)(this.version, "1.25.0-0"); }
    get supportsDevToolsServerAddress() { return (0, utils_1.versionIsAtLeast)(this.version, "1.26.0-12"); }
    get supportsRunningIntegrationTests() { return (0, utils_1.versionIsAtLeast)(this.version, "2.2.0-10"); }
    // TODO: Set this to a version that includes a fix for both the Env issue (which needs
    //       DDS >= 2.2 in Flutter) and https://github.com/dart-lang/webdev/issues/1627 so web
    //       works, before removing previewSdkDAPs.
    get supportsSdkDap() { return (0, utils_1.versionIsAtLeast)(this.version, "2.13.0-0"); }
    // TODO: Set this to same as above (or remove) once DDS > 2.2 is in Flutter.
    get supportsEnvInSdkDAP() { return false; }
    // TODO: Set this to same as above (or remove) once fixed.
    get supportsWebInSdkDAP() { return false; }
    get requiresDdsDisabledForSdkDapTestRuns() { return !(0, utils_1.versionIsAtLeast)(this.version, "3.1.0"); }
    // TODO: Update these (along with Dart) when supported.
    get webSupportsEvaluation() { return false; }
    get webSupportsDebugging() { return true; }
    get webSupportsHotReload() { return false; }
}
exports.FlutterCapabilities = FlutterCapabilities;
class DaemonCapabilities {
    constructor(daemonProtocolVersion) {
        this.version = daemonProtocolVersion;
    }
    static get empty() { return new DaemonCapabilities("0.0.0"); }
    get canCreateEmulators() { return (0, utils_1.versionIsAtLeast)(this.version, "0.4.0"); }
    get canFlutterAttach() { return (0, utils_1.versionIsAtLeast)(this.version, "0.4.1"); }
    get providesPlatformTypes() { return (0, utils_1.versionIsAtLeast)(this.version, "0.5.2"); }
    get supportsAvdColdBootLaunch() { return (0, utils_1.versionIsAtLeast)(this.version, "0.6.1"); }
}
exports.DaemonCapabilities = DaemonCapabilities;


/***/ }),

/***/ 9947:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VmServiceCapabilities = void 0;
const utils_1 = __webpack_require__(4586);
class VmServiceCapabilities {
    constructor(version) {
        this.version = version;
    }
    static get empty() { return new VmServiceCapabilities("0.0.0"); }
    get hasInvoke() { return (0, utils_1.versionIsAtLeast)(this.version, "3.10.0"); }
    get hasLoggingStream() { return (0, utils_1.versionIsAtLeast)(this.version, "3.17.0"); }
    get serviceStreamIsPublic() { return (0, utils_1.versionIsAtLeast)(this.version, "3.22.0"); }
    get supportsGetStackLimit() { return (0, utils_1.versionIsAtLeast)(this.version, "3.42.0"); }
}
exports.VmServiceCapabilities = VmServiceCapabilities;


/***/ }),

/***/ 5628:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openAction = exports.wantToTryDevToolsPrompt = exports.issueTrackerUri = exports.issueTrackerAction = exports.stagehandInstallationInstructionsUrl = exports.pubGlobalDocsUrl = exports.debugTerminatingProgressId = exports.debugLaunchProgressId = exports.restartReasonSave = exports.restartReasonManual = exports.showLogAction = exports.stopLoggingAction = exports.IS_RUNNING_LOCALLY_CONTEXT = exports.PUB_OUTDATED_SUPPORTED_CONTEXT = exports.DART_IS_CAPTURING_LOGS_CONTEXT = exports.DART_DEP_FILE_NODE_CONTEXT = exports.DART_DEP_FOLDER_NODE_CONTEXT = exports.DART_DEP_TRANSITIVE_DEPENDENCY_PACKAGE_NODE_CONTEXT = exports.DART_DEP_DEV_DEPENDENCY_PACKAGE_NODE_CONTEXT = exports.DART_DEP_DEPENDENCY_PACKAGE_NODE_CONTEXT = exports.DART_DEP_PACKAGE_NODE_CONTEXT = exports.DART_DEP_TRANSITIVE_DEPENDENCIES_NODE_CONTEXT = exports.DART_DEP_DEV_DEPENDENCIES_NODE_CONTEXT = exports.DART_DEP_DEPENDENCIES_NODE_CONTEXT = exports.DART_DEP_PROJECT_NODE_CONTEXT = exports.IS_LSP_CONTEXT = exports.FLUTTER_DOWNLOAD_URL = exports.DART_DOWNLOAD_URL = exports.androidStudioPaths = exports.analyzerSnapshotPath = exports.pubSnapshotPath = exports.flutterPath = exports.pubPath = exports.dartDocPath = exports.dartVMPath = exports.getExecutableName = exports.executableNames = exports.androidStudioExecutableNames = exports.platformEol = exports.platformDisplayName = exports.dartPlatformName = exports.isChromeOS = exports.isLinux = exports.isMac = exports.isWin = exports.isDartCodeTestRun = exports.isCI = exports.debugAdapterPath = exports.flutterExtensionIdentifier = exports.dartCodeExtensionIdentifier = void 0;
exports.validMethodNameRegex = exports.cancelAction = exports.runFlutterCreatePrompt = exports.vmServiceHttpLinkPattern = exports.vmServiceListeningBannerPattern = exports.reactivateDevToolsAction = exports.openSettingsAction = exports.recommendedSettingsUrl = exports.showRecommendedSettingsAction = exports.iUnderstandAction = exports.skipAction = exports.noAction = exports.yesAction = exports.useRecommendedSettingsPromptKey = exports.installFlutterExtensionPromptKey = exports.userPromptContextPrefix = exports.debugAnywayAction = exports.showErrorsAction = exports.isInFlutterReleaseModeDebugSessionContext = exports.isInFlutterProfileModeDebugSessionContext = exports.isInFlutterDebugModeDebugSessionContext = exports.HAS_LAST_TEST_DEBUG_CONFIG = exports.HAS_LAST_DEBUG_CONFIG = exports.REFACTOR_ANYWAY = exports.REFACTOR_FAILED_DOC_MODIFIED = exports.FLUTTER_CREATE_PROJECT_TRIGGER_FILE = exports.DART_CREATE_PROJECT_TRIGGER_FILE = exports.CHROME_OS_VM_SERVICE_PORT = exports.CHROME_OS_DEVTOOLS_PORT = exports.projectSearchCacheTimeInMs = exports.projectSearchProgressNotificationDelayInMs = exports.projectSearchProgressText = exports.pleaseReportBug = exports.longRepeatPromptThreshold = exports.noRepeatPromptThreshold = exports.fortyHoursInMs = exports.twentyHoursInMs = exports.twoHoursInMs = exports.twentyMinutesInMs = exports.tenMinutesInMs = exports.fiveMinutesInMs = exports.initializingFlutterMessage = exports.modifyingFilesOutsideWorkspaceInfoUrl = exports.skipThisSurveyAction = exports.takeSurveyAction = exports.flutterSurveyDataUrl = exports.moreInfoAction = exports.doNotAskAgainAction = exports.notTodayAction = exports.alwaysOpenAction = void 0;
exports.MAX_VERSION = exports.defaultLaunchJson = exports.dartRecommendedConfig = exports.devToolsPages = exports.performancePage = exports.cpuProfilerPage = exports.widgetInspectorPage = exports.validClassNameRegex = void 0;
const fs = __webpack_require__(7147);
const utils_1 = __webpack_require__(4586);
exports.dartCodeExtensionIdentifier = "Dart-Code.dart-code";
exports.flutterExtensionIdentifier = "Dart-Code.flutter";
exports.debugAdapterPath = "out/dist/debug.js";
exports.isCI = !!process.env.CI;
exports.isDartCodeTestRun = !!process.env.DART_CODE_IS_TEST_RUN;
exports.isWin = process.platform.startsWith("win");
exports.isMac = process.platform === "darwin";
exports.isLinux = !exports.isWin && !exports.isMac;
exports.isChromeOS = exports.isLinux && fs.existsSync("/dev/.cros_milestone");
// Used for code checks and in Dart SDK urls so Chrome OS is considered Linux.
exports.dartPlatformName = exports.isWin ? "win" : exports.isMac ? "mac" : "linux";
// Used for display (logs, analytics) so Chrome OS is its own.
exports.platformDisplayName = exports.isWin ? "win" : exports.isMac ? "mac" : exports.isChromeOS ? "chromeos" : "linux";
exports.platformEol = exports.isWin ? "\r\n" : "\n";
exports.androidStudioExecutableNames = exports.isWin ? ["studio64.exe"] : ["studio.sh", "studio"];
exports.executableNames = {
    dart: exports.isWin ? "dart.exe" : "dart",
    dartdoc: exports.isWin ? "dartdoc.bat" : "dartdoc",
    flutter: exports.isWin ? "flutter.bat" : "flutter",
    pub: exports.isWin ? "pub.bat" : "pub",
};
const getExecutableName = (cmd) => { var _a; return (_a = exports.executableNames[cmd]) !== null && _a !== void 0 ? _a : cmd; };
exports.getExecutableName = getExecutableName;
exports.dartVMPath = "bin/" + exports.executableNames.dart;
exports.dartDocPath = "bin/" + exports.executableNames.dartdoc;
exports.pubPath = "bin/" + exports.executableNames.pub;
exports.flutterPath = "bin/" + exports.executableNames.flutter;
exports.pubSnapshotPath = "bin/snapshots/pub.dart.snapshot";
exports.analyzerSnapshotPath = "bin/snapshots/analysis_server.dart.snapshot";
exports.androidStudioPaths = exports.androidStudioExecutableNames.map((s) => "bin/" + s);
exports.DART_DOWNLOAD_URL = "https://dart.dev/get-dart";
exports.FLUTTER_DOWNLOAD_URL = "https://flutter.dev/setup/";
exports.IS_LSP_CONTEXT = "dart-code:isLsp";
exports.DART_DEP_PROJECT_NODE_CONTEXT = "dart-code:depProjectNode";
exports.DART_DEP_DEPENDENCIES_NODE_CONTEXT = "dart-code:depDependenciesNode";
exports.DART_DEP_DEV_DEPENDENCIES_NODE_CONTEXT = "dart-code:depDevDependenciesNode";
exports.DART_DEP_TRANSITIVE_DEPENDENCIES_NODE_CONTEXT = "dart-code:depTransitiveDependenciesNode";
exports.DART_DEP_PACKAGE_NODE_CONTEXT = "dart-code:depPackageNode";
exports.DART_DEP_DEPENDENCY_PACKAGE_NODE_CONTEXT = "dart-code:depDependencyPackageNode";
exports.DART_DEP_DEV_DEPENDENCY_PACKAGE_NODE_CONTEXT = "dart-code:depDevDependencyPackageNode";
exports.DART_DEP_TRANSITIVE_DEPENDENCY_PACKAGE_NODE_CONTEXT = "dart-code:depTransitiveDependencyPackageNode";
exports.DART_DEP_FOLDER_NODE_CONTEXT = "dart-code:depFolderNode";
exports.DART_DEP_FILE_NODE_CONTEXT = "dart-code:depFileNode";
exports.DART_IS_CAPTURING_LOGS_CONTEXT = "dart-code:isCapturingLogs";
exports.PUB_OUTDATED_SUPPORTED_CONTEXT = "dart-code:pubOutdatedSupported";
exports.IS_RUNNING_LOCALLY_CONTEXT = "dart-code:isRunningLocally";
exports.stopLoggingAction = "Stop Logging";
exports.showLogAction = "Show Log";
exports.restartReasonManual = "manual";
exports.restartReasonSave = "save";
exports.debugLaunchProgressId = "launch";
exports.debugTerminatingProgressId = "terminate";
exports.pubGlobalDocsUrl = "https://www.dartlang.org/tools/pub/cmd/pub-global";
exports.stagehandInstallationInstructionsUrl = "https://github.com/dart-lang/stagehand#installation";
exports.issueTrackerAction = "Issue Tracker";
exports.issueTrackerUri = "https://github.com/Dart-Code/Dart-Code/issues";
exports.wantToTryDevToolsPrompt = "Dart DevTools includes additional tools for debugging and profiling Flutter apps, including a Widget Inspector. Try it?";
exports.openAction = "Open";
exports.alwaysOpenAction = "Always Open";
exports.notTodayAction = "Not Now";
exports.doNotAskAgainAction = "Never Ask";
exports.moreInfoAction = "More Info";
exports.flutterSurveyDataUrl = "https://docs.flutter.dev/f/flutter-survey-metadata.json";
exports.takeSurveyAction = "Take Survey";
exports.skipThisSurveyAction = "Skip This Survey";
exports.modifyingFilesOutsideWorkspaceInfoUrl = "https://dartcode.org/docs/modifying-files-outside-workspace/";
exports.initializingFlutterMessage = "Initializing Flutter. This may take a few minutes.";
// Minutes.
exports.fiveMinutesInMs = 1000 * 60 * 5;
exports.tenMinutesInMs = 1000 * 60 * 10;
exports.twentyMinutesInMs = 1000 * 60 * 20;
// Hours.
exports.twoHoursInMs = 1000 * 60 * 60 * 2;
exports.twentyHoursInMs = 1000 * 60 * 60 * 20;
exports.fortyHoursInMs = 1000 * 60 * 60 * 40;
// Duration for not showing a prompt that has been shown before.
exports.noRepeatPromptThreshold = exports.twentyHoursInMs;
exports.longRepeatPromptThreshold = exports.fortyHoursInMs;
exports.pleaseReportBug = "Please raise a bug against the Dart extension for VS Code.";
exports.projectSearchProgressText = "Searching for projects...";
// Search for 2s before showing progress notification.
exports.projectSearchProgressNotificationDelayInMs = 2000;
exports.projectSearchCacheTimeInMs = exports.fiveMinutesInMs;
// Chrome OS exposed ports: 8000, 8008, 8080, 8085, 8888, 9005, 3000, 4200, 5000
exports.CHROME_OS_DEVTOOLS_PORT = 8080;
exports.CHROME_OS_VM_SERVICE_PORT = 8085;
exports.DART_CREATE_PROJECT_TRIGGER_FILE = "dart.sh.create";
exports.FLUTTER_CREATE_PROJECT_TRIGGER_FILE = "flutter.create";
exports.REFACTOR_FAILED_DOC_MODIFIED = "This refactor cannot be applied because the document has changed.";
exports.REFACTOR_ANYWAY = "Refactor Anyway";
exports.HAS_LAST_DEBUG_CONFIG = "dart-code:hasLastDebugConfig";
exports.HAS_LAST_TEST_DEBUG_CONFIG = "dart-code:hasLastTestDebugConfig";
exports.isInFlutterDebugModeDebugSessionContext = "dart-code:isInFlutterDebugModeDebugSession";
exports.isInFlutterProfileModeDebugSessionContext = "dart-code:isInFlutterProfileModeDebugSession";
exports.isInFlutterReleaseModeDebugSessionContext = "dart-code:isInFlutterReleaseModeDebugSession";
exports.showErrorsAction = "Show Errors";
exports.debugAnywayAction = "Debug Anyway";
exports.userPromptContextPrefix = "hasPrompted.";
exports.installFlutterExtensionPromptKey = "install_flutter_extension_3";
exports.useRecommendedSettingsPromptKey = "use_recommended_settings";
exports.yesAction = "Yes";
exports.noAction = "No";
exports.skipAction = "Skip";
exports.iUnderstandAction = "I Understand";
exports.showRecommendedSettingsAction = "Show Recommended Settings";
exports.recommendedSettingsUrl = "https://dartcode.org/docs/recommended-settings/";
exports.openSettingsAction = "Open Settings File";
exports.reactivateDevToolsAction = "Reactivate DevTools";
exports.vmServiceListeningBannerPattern = new RegExp("(?:Observatory|The Dart VM service is) (?:listening on|.* is available at:) (http:.+)");
exports.vmServiceHttpLinkPattern = new RegExp("(http://[\\d\\.:]+/)");
const runFlutterCreatePrompt = (platformType, platformNeedsGloballyEnabling) => platformNeedsGloballyEnabling
    ? `Enable the ${platformType} platform and add it to this project?`
    : `Add the ${platformType} platform to this project?`;
exports.runFlutterCreatePrompt = runFlutterCreatePrompt;
exports.cancelAction = "Cancel";
exports.validMethodNameRegex = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");
exports.validClassNameRegex = exports.validMethodNameRegex;
exports.widgetInspectorPage = { id: "inspector", commandId: "dart.openDevToolsInspector", title: "Widget Inspector" };
exports.cpuProfilerPage = { id: "cpu-profiler", commandId: "dart.openDevToolsCpuProfiler", title: "CPU Profiler" };
exports.performancePage = {
    commandId: "dart.openDevToolsPerformance",
    id: "performance",
    routeId: (flutterVersion) => !flutterVersion || (0, utils_1.versionIsAtLeast)(flutterVersion, "2.3.1" /* 2.3.0-16.0? */) ? "performance" : "legacy-performance",
    title: "Performance",
};
exports.devToolsPages = [
    // First entry is the default page.
    exports.widgetInspectorPage,
    exports.cpuProfilerPage,
    { id: "memory", commandId: "dart.openDevToolsMemory", title: "Memory" },
    exports.performancePage,
    { id: "network", commandId: "dart.openDevToolsNetwork", title: "Network" },
    { id: "logging", commandId: "dart.openDevToolsLogging", title: "Logging" },
];
exports.dartRecommendedConfig = {
    // Automatically format code on save and during typing of certain characters
    // (like `;` and `}`).
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    // Draw a guide line at 80 characters, where Dart's formatting will wrap code.
    "editor.rulers": [80],
    // Disables built-in highlighting of words that match your selection. Without
    // this, all instances of the selected text will be highlighted, interfering
    // with Dart's ability to highlight only exact references to the selected variable.
    "editor.selectionHighlight": false,
    // By default, VS Code prevents code completion from popping open when in
    // "snippet mode" (editing placeholders in inserted code). Setting this option
    // to `false` stops that and allows completion to open as normal, as if you
    // weren't in a snippet placeholder.
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    // By default, VS Code will pre-select the most recently used item from code
    // completion. This is usually not the most relevant item.
    //
    // "first" will always select top item
    // "recentlyUsedByPrefix" will filter the recently used items based on the
    //     text immediately preceeding where completion was invoked.
    "editor.suggestSelection": "first",
    // Allows pressing <TAB> to complete snippets such as `for` even when the
    // completion list is not visible.
    "editor.tabCompletion": "onlySnippets",
    // By default, VS Code will popualte code completion with words found in the
    // current file when a language service does not provide its own completions.
    // This results in code completion suggesting words when editing comments and
    // strings. This setting will prevent that.
    "editor.wordBasedSuggestions": false,
};
exports.defaultLaunchJson = JSON.stringify({
    "configurations": [
        {
            "name": "Dart & Flutter",
            "request": "launch",
            "type": "dart",
        },
    ],
    "version": "0.2.0",
}, undefined, "\t");
// This indicates that a version is the latest possible.
exports.MAX_VERSION = "999.999.999";


/***/ }),

/***/ 7341:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DebugOption = exports.debugOptionNames = exports.LogSeverity = exports.LogCategory = exports.VersionStatus = exports.VmService = exports.VmServiceExtension = exports.TestStatus = exports.DebuggerType = void 0;
var DebuggerType;
(function (DebuggerType) {
    DebuggerType[DebuggerType["Dart"] = 0] = "Dart";
    DebuggerType[DebuggerType["DartTest"] = 1] = "DartTest";
    DebuggerType[DebuggerType["Flutter"] = 2] = "Flutter";
    DebuggerType[DebuggerType["FlutterTest"] = 3] = "FlutterTest";
    DebuggerType[DebuggerType["Web"] = 4] = "Web";
    DebuggerType[DebuggerType["WebTest"] = 5] = "WebTest";
})(DebuggerType = exports.DebuggerType || (exports.DebuggerType = {}));
var TestStatus;
(function (TestStatus) {
    // This should be in order such that the highest number is the one to show
    // when aggregating (eg. from children).
    TestStatus[TestStatus["Waiting"] = 0] = "Waiting";
    TestStatus[TestStatus["Skipped"] = 1] = "Skipped";
    TestStatus[TestStatus["Passed"] = 2] = "Passed";
    TestStatus[TestStatus["Unknown"] = 3] = "Unknown";
    TestStatus[TestStatus["Failed"] = 4] = "Failed";
    TestStatus[TestStatus["Running"] = 5] = "Running";
})(TestStatus = exports.TestStatus || (exports.TestStatus = {}));
/// The service extensions we know about.
var VmServiceExtension;
(function (VmServiceExtension) {
    VmServiceExtension["PlatformOverride"] = "ext.flutter.platformOverride";
    VmServiceExtension["DebugBanner"] = "ext.flutter.debugAllowBanner";
    VmServiceExtension["DebugPaint"] = "ext.flutter.debugPaint";
    VmServiceExtension["Driver"] = "ext.flutter.driver";
    VmServiceExtension["PaintBaselines"] = "ext.flutter.debugPaintBaselinesEnabled";
    VmServiceExtension["InspectorSelectMode"] = "ext.flutter.inspector.show";
    VmServiceExtension["InspectorSetPubRootDirectories"] = "ext.flutter.inspector.setPubRootDirectories";
    VmServiceExtension["BrightnessOverride"] = "ext.flutter.brightnessOverride";
    VmServiceExtension["RepaintRainbow"] = "ext.flutter.repaintRainbow";
    VmServiceExtension["PerformanceOverlay"] = "ext.flutter.showPerformanceOverlay";
    VmServiceExtension["SlowAnimations"] = "ext.flutter.timeDilation";
})(VmServiceExtension = exports.VmServiceExtension || (exports.VmServiceExtension = {}));
/// The service extensions we know about and allow toggling via commands.
var VmService;
(function (VmService) {
    VmService["HotReload"] = "reloadSources";
    VmService["HotRestart"] = "hotRestart";
    VmService["LaunchDevTools"] = "launchDevTools";
})(VmService = exports.VmService || (exports.VmService = {}));
var VersionStatus;
(function (VersionStatus) {
    VersionStatus[VersionStatus["NotInstalled"] = 0] = "NotInstalled";
    VersionStatus[VersionStatus["UpdateRequired"] = 1] = "UpdateRequired";
    VersionStatus[VersionStatus["UpdateAvailable"] = 2] = "UpdateAvailable";
    VersionStatus[VersionStatus["Valid"] = 3] = "Valid";
})(VersionStatus = exports.VersionStatus || (exports.VersionStatus = {}));
var LogCategory;
(function (LogCategory) {
    LogCategory[LogCategory["General"] = 0] = "General";
    LogCategory[LogCategory["CI"] = 1] = "CI";
    LogCategory[LogCategory["CommandProcesses"] = 2] = "CommandProcesses";
    LogCategory[LogCategory["DAP"] = 3] = "DAP";
    LogCategory[LogCategory["DevTools"] = 4] = "DevTools";
    LogCategory[LogCategory["Analyzer"] = 5] = "Analyzer";
    LogCategory[LogCategory["AnalyzerTiming"] = 6] = "AnalyzerTiming";
    LogCategory[LogCategory["DartTest"] = 7] = "DartTest";
    LogCategory[LogCategory["FlutterDaemon"] = 8] = "FlutterDaemon";
    LogCategory[LogCategory["FlutterRun"] = 9] = "FlutterRun";
    LogCategory[LogCategory["FlutterTest"] = 10] = "FlutterTest";
    LogCategory[LogCategory["VmService"] = 11] = "VmService";
    LogCategory[LogCategory["WebDaemon"] = 12] = "WebDaemon";
})(LogCategory = exports.LogCategory || (exports.LogCategory = {}));
var LogSeverity;
(function (LogSeverity) {
    LogSeverity[LogSeverity["Info"] = 0] = "Info";
    LogSeverity[LogSeverity["Warn"] = 1] = "Warn";
    LogSeverity[LogSeverity["Error"] = 2] = "Error";
})(LogSeverity = exports.LogSeverity || (exports.LogSeverity = {}));
exports.debugOptionNames = ["my code", "my code + packages", "my code + packages + SDK", "my code + SDK"];
var DebugOption;
(function (DebugOption) {
    DebugOption[DebugOption["MyCode"] = 0] = "MyCode";
    DebugOption[DebugOption["MyCodePackages"] = 1] = "MyCodePackages";
    DebugOption[DebugOption["MyCodePackagesSdk"] = 2] = "MyCodePackagesSdk";
    DebugOption[DebugOption["MyCodeSdk"] = 3] = "MyCodeSdk";
})(DebugOption = exports.DebugOption || (exports.DebugOption = {}));


/***/ }),

/***/ 6581:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagnosticsNodeStyle = exports.DiagnosticsNodeLevel = exports.DiagnosticsNodeType = void 0;
// If we have per-type properties, handle them like this.
// export interface DescriptionDiagnosticsNode {
// 	type: DiagnosticsNodeType.ErrorDescription;
// }
var DiagnosticsNodeType;
(function (DiagnosticsNodeType) {
    DiagnosticsNodeType["ErrorDescription"] = "ErrorDescription";
    DiagnosticsNodeType["ErrorSummary"] = "ErrorSummary";
    DiagnosticsNodeType["ErrorSpacer"] = "ErrorSpacer";
    DiagnosticsNodeType["DiagnosticsStackTrace"] = "DiagnosticsStackTrace";
    DiagnosticsNodeType["DevToolsDeepLinkProperty"] = "DevToolsDeepLinkProperty";
})(DiagnosticsNodeType = exports.DiagnosticsNodeType || (exports.DiagnosticsNodeType = {}));
var DiagnosticsNodeLevel;
(function (DiagnosticsNodeLevel) {
    DiagnosticsNodeLevel["Error"] = "error";
    DiagnosticsNodeLevel["Summary"] = "summary";
    DiagnosticsNodeLevel["Hint"] = "hint";
})(DiagnosticsNodeLevel = exports.DiagnosticsNodeLevel || (exports.DiagnosticsNodeLevel = {}));
var DiagnosticsNodeStyle;
(function (DiagnosticsNodeStyle) {
    DiagnosticsNodeStyle["Flat"] = "flat";
    DiagnosticsNodeStyle["Shallow"] = "shallow";
})(DiagnosticsNodeStyle = exports.DiagnosticsNodeStyle || (exports.DiagnosticsNodeStyle = {}));


/***/ }),

/***/ 8323:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RingLog = exports.captureLogs = exports.logToConsole = exports.logProcess = exports.nullLogger = exports.CategoryLogger = exports.EmittingLogger = void 0;
const events_1 = __webpack_require__(2361);
const fs = __webpack_require__(7147);
const os = __webpack_require__(2037);
const path = __webpack_require__(1017);
const constants_1 = __webpack_require__(5628);
const enums_1 = __webpack_require__(7341);
const utils_1 = __webpack_require__(4586);
class LogEmitter extends events_1.EventEmitter {
    fire(msg) {
        this.emit("log", msg);
    }
    onLog(listener) {
        this.on("log", listener);
        return {
            dispose: () => { this.removeListener("log", listener); },
        };
    }
}
class EmittingLogger {
    constructor() {
        this.onLogEmitter = new LogEmitter();
        this.onLog = (listener) => this.onLogEmitter.onLog(listener);
    }
    log(message, severity, category = enums_1.LogCategory.General) {
        this.onLogEmitter.fire(new LogMessageImpl(message, severity, category));
    }
    info(message, category) {
        this.log(message, enums_1.LogSeverity.Info, category);
    }
    warn(errorOrMessage, category) {
        this.log((0, utils_1.errorString)(errorOrMessage), enums_1.LogSeverity.Warn, category);
    }
    error(errorOrMessage, category) {
        this.log((0, utils_1.errorString)(errorOrMessage), enums_1.LogSeverity.Error, category);
    }
    dispose() {
        this.onLogEmitter.removeAllListeners();
    }
}
exports.EmittingLogger = EmittingLogger;
class LogMessageImpl {
    constructor(message, severity, category) {
        this.message = message;
        this.severity = severity;
        this.category = category;
    }
    toLine(maxLength) {
        const logMessage = (maxLength && this.message && this.message.length > maxLength
            ? this.message.substring(0, maxLength) + "…"
            : (this.message || "<empty message>")).trimRight();
        const time = `[${(new Date()).toLocaleTimeString()}]`;
        const prefix = `[${enums_1.LogCategory[this.category]}] [${enums_1.LogSeverity[this.severity]}]`;
        return `${time} ${prefix} ${logMessage}`;
    }
}
class CategoryLogger {
    constructor(base, defaultCategory) {
        this.base = base;
        this.defaultCategory = defaultCategory;
    }
    info(message, category = this.defaultCategory) {
        this.base.info(message, category);
    }
    warn(errorOrMessage, category = this.defaultCategory) {
        this.base.warn(errorOrMessage, category);
    }
    error(errorOrMessage, category = this.defaultCategory) {
        this.base.error(errorOrMessage, category);
    }
}
exports.CategoryLogger = CategoryLogger;
class NullLogger {
    // tslint:disable-next-line: no-empty
    info(message, category) { }
    // tslint:disable-next-line: no-empty
    warn(message, category) { }
    // tslint:disable-next-line: no-empty
    error(error, category) { }
}
exports.nullLogger = new NullLogger();
function logProcess(logger, category, process) {
    const prefix = `(PROC ${process.pid})`;
    logger.info(`${prefix} Logging data for process...`, category);
    process.stdout.on("data", (data) => logger.info(`${prefix} ${data}`, category));
    process.stderr.on("data", (data) => logger.info(`${prefix} ${data}`, category));
    process.on("close", (code, signal) => logger.info(`${prefix} closed (${code}, ${signal})`, category));
    process.on("exit", (code, signal) => logger.info(`${prefix} exited (${code}, ${signal})`, category));
}
exports.logProcess = logProcess;
function logToConsole(logger) {
    return logger.onLog((m) => {
        if (m.severity === enums_1.LogSeverity.Error)
            console.error(m.toLine(1000));
        else if (m.severity === enums_1.LogSeverity.Warn)
            console.warn(m.toLine(1000));
    });
}
exports.logToConsole = logToConsole;
function captureLogs(logger, file, header, maxLogLineLength, logCategories, excludeLogCategories = false) {
    if (!file || !path.isAbsolute(file))
        throw new Error("Path passed to logTo must be an absolute path");
    const time = (detailed = false) => detailed ? `[${(new Date()).toTimeString()}] ` : `[${(new Date()).toLocaleTimeString()}] `;
    let logStream = fs.createWriteStream(file);
    if (header)
        logStream.write(header);
    const categoryNames = logCategories.map((c) => enums_1.LogCategory[c]);
    logStream.write(`Logging Categories:${constants_1.platformEol}    ${categoryNames.join(", ")}${constants_1.platformEol}${constants_1.platformEol}`);
    logStream.write(`${(new Date()).toDateString()} ${time(true)}Log file started${constants_1.platformEol}`);
    let fileLogger = logger.onLog((e) => {
        if (!logStream)
            return;
        // We should log this event if:
        // - We don't have a category filter; or
        // - The category filter includes this category; or
        // - The log is WARN/ERROR (they get logged everywhere).
        const shouldLog = (excludeLogCategories
            ? logCategories.indexOf(e.category) === -1
            : logCategories.indexOf(e.category) !== -1)
            || e.severity === enums_1.LogSeverity.Warn
            || e.severity === enums_1.LogSeverity.Error;
        if (!shouldLog)
            return;
        logStream.write(`${e.toLine(maxLogLineLength)}${os.EOL}`);
    });
    return {
        dispose() {
            if (fileLogger) {
                fileLogger.dispose();
                fileLogger = undefined;
            }
            return new Promise((resolve) => {
                if (logStream) {
                    logStream.write(`${(new Date()).toDateString()} ${time(true)}Log file ended${os.EOL}`);
                    logStream.end(resolve);
                    logStream = undefined;
                }
            });
        },
    };
}
exports.captureLogs = captureLogs;
class RingLog {
    constructor(size) {
        this.size = size;
        this.pointer = 0;
        this.lines = new Array(this.size);
    }
    get rawLines() { return this.lines; }
    log(message) {
        this.lines[this.pointer] = message;
        this.pointer = (this.pointer + 1) % this.size;
    }
    toString() {
        return this.lines.slice(this.pointer, this.size).concat(this.lines.slice(0, this.pointer)).filter((l) => l).join("\n");
    }
}
exports.RingLog = RingLog;


/***/ }),

/***/ 5837:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPubExecutionInfo = exports.runProcess = exports.RunProcessResult = exports.safeSpawn = void 0;
const child_process = __webpack_require__(2081);
const path = __webpack_require__(1017);
const constants_1 = __webpack_require__(5628);
const enums_1 = __webpack_require__(7341);
const logging_1 = __webpack_require__(8323);
const utils_1 = __webpack_require__(4586);
function safeSpawn(workingDirectory, binPath, args, env) {
    const quotedArgs = args.map(quoteAndEscapeArg);
    const customEnv = Object.assign({}, process.env, env);
    return child_process.spawn(`"${binPath}"`, quotedArgs, { cwd: workingDirectory, env: customEnv, shell: true });
}
exports.safeSpawn = safeSpawn;
function quoteAndEscapeArg(arg) {
    // Spawning processes on Windows with funny symbols in the path requires quoting. However if you quote an
    // executable with a space in its path and an argument also has a space, you have to then quote _all_ of the
    // arguments!
    // https://github.com/nodejs/node/issues/7367
    let escaped = arg.replace(/"/g, `\\"`);
    // Additionally, on Windows escape redirection symbols with ^
    if (constants_1.isWin)
        escaped = escaped.replace(/([<>])/g, "^$1");
    return `"${escaped}"`;
}
class RunProcessResult {
    constructor(exitCode, stdout, stderr) {
        this.exitCode = exitCode;
        this.stdout = stdout;
        this.stderr = stderr;
    }
}
exports.RunProcessResult = RunProcessResult;
function runProcess(logger, binPath, args, workingDirectory, env, spawn) {
    return new Promise((resolve) => {
        logger.info(`Spawning ${binPath} with args ${JSON.stringify(args)} in ${workingDirectory} with env ${JSON.stringify(env)}`);
        const proc = spawn(workingDirectory, binPath, args, env);
        (0, logging_1.logProcess)(logger, enums_1.LogCategory.CommandProcesses, proc);
        const out = [];
        const err = [];
        proc.stdout.on("data", (data) => out.push(data.toString()));
        proc.stderr.on("data", (data) => err.push(data.toString()));
        proc.on("exit", (code) => {
            resolve(new RunProcessResult((0, utils_1.nullToUndefined)(code), out.join(""), err.join("")));
        });
    });
}
exports.runProcess = runProcess;
function getPubExecutionInfo(dartCapabilities, dartSdkPath, args) {
    if (dartCapabilities.supportsDartPub) {
        return {
            args: ["pub", ...args],
            executable: path.join(dartSdkPath, constants_1.dartVMPath),
        };
    }
    else {
        return {
            args,
            executable: path.join(dartSdkPath, constants_1.pubPath),
        };
    }
}
exports.getPubExecutionInfo = getPubExecutionInfo;


/***/ }),

/***/ 143:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackageMap = void 0;
const fs = __webpack_require__(7147);
const path = __webpack_require__(1017);
const url = __webpack_require__(7310);
const utils_1 = __webpack_require__(4586);
const fs_1 = __webpack_require__(300);
class PackageMap {
    static findPackagesFile(entryPoint) {
        if (!entryPoint)
            return undefined;
        const file = (0, utils_1.findFileInAncestor)([path.join(".dart_tool/package_config.json"), ".packages"], entryPoint);
        return file;
    }
    static loadForProject(logger, projectFolder) {
        const paths = [
            ".dart_tool/package_config.json",
            ".packages",
        ];
        for (const p of paths) {
            const fullP = path.join(projectFolder, p);
            if (fs.existsSync(fullP))
                return this.load(logger, fullP);
        }
        return new MissingPackageMap();
    }
    static load(logger, file) {
        if (!file)
            return new MissingPackageMap();
        try {
            if (path.basename(file).toLowerCase() === ".packages")
                return new DotPackagesPackageMap(file);
            else
                return new PackageConfigJsonPackageMap(logger, file);
        }
        catch (e) {
            logger.error(e);
            return new MissingPackageMap();
        }
    }
    getPackagePath(name) {
        return this.packages[name];
    }
    resolvePackageUri(uri) {
        if (!uri)
            return undefined;
        let name = uri;
        if (name.startsWith("package:"))
            name = name.substring(8);
        const index = name.indexOf("/");
        if (index === -1)
            return undefined;
        const rest = name.substring(index + 1);
        name = name.substring(0, index);
        const location = this.getPackagePath(name);
        if (location)
            return path.join(location, rest);
        else
            return undefined;
    }
}
exports.PackageMap = PackageMap;
class MissingPackageMap extends PackageMap {
    get packages() {
        return {};
    }
    getPackagePath(name) {
        return undefined;
    }
    resolvePackageUri(uri) {
        return undefined;
    }
}
class DotPackagesPackageMap extends PackageMap {
    constructor(file) {
        super();
        this.map = {};
        if (!file)
            return;
        this.localPackageRoot = path.dirname(file);
        const lines = fs.readFileSync(file, { encoding: "utf8" }).split("\n");
        for (let line of lines) {
            line = line.trim();
            if (line.length === 0 || line.startsWith("#"))
                continue;
            const index = line.indexOf(":");
            if (index !== -1) {
                const name = line.substr(0, index);
                const rest = line.substring(index + 1);
                if (rest.startsWith("file:"))
                    this.map[name] = (0, utils_1.uriToFilePath)(rest);
                else
                    this.map[name] = path.join(this.localPackageRoot, rest);
            }
        }
    }
    get packages() { return Object.assign({}, this.map); }
}
class PackageConfigJsonPackageMap extends PackageMap {
    constructor(logger, packageConfigPath) {
        super();
        this.logger = logger;
        this.packageConfigPath = packageConfigPath;
        this.map = {};
        const json = fs.readFileSync(this.packageConfigPath, "utf8");
        this.config = JSON.parse(json);
        for (const pkg of this.config.packages) {
            try {
                const packageConfigFolderPath = path.dirname(this.packageConfigPath);
                const packageRootPath = this.getPathForUri(pkg.rootUri);
                const packageLibPath = this.getPathForUri(pkg.packageUri);
                this.map[pkg.name] = path.resolve(packageConfigFolderPath, packageRootPath !== null && packageRootPath !== void 0 ? packageRootPath : "", packageLibPath !== null && packageLibPath !== void 0 ? packageLibPath : "");
            }
            catch (e) {
                logger.error(`Failed to resolve path for package ${pkg.name}: ${e}`);
            }
        }
    }
    getPathForUri(uri) {
        if (!uri)
            return undefined;
        const parsedPath = (0, fs_1.normalizeSlashes)(uri.startsWith("file:")
            ? url.fileURLToPath(uri)
            : unescape(uri));
        return parsedPath.endsWith(path.sep) ? parsedPath : `${parsedPath}${path.sep}`;
    }
    get packages() { return Object.assign({}, this.map); }
    getPackagePath(name) {
        return this.map[name];
    }
}


/***/ }),

/***/ 3058:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StdIOService = void 0;
const fs = __webpack_require__(7147);
const processes_1 = __webpack_require__(5837);
// Reminder: This class is used in the debug adapter as well as the main Code process!
class StdIOService {
    constructor(logger, maxLogLineLength, messagesWrappedInBrackets = false, treatHandlingErrorsAsUnhandledMessages = false, treatCarriageReturnsAsNewlines = false, logFile) {
        this.logger = logger;
        this.maxLogLineLength = maxLogLineLength;
        this.messagesWrappedInBrackets = messagesWrappedInBrackets;
        this.treatHandlingErrorsAsUnhandledMessages = treatHandlingErrorsAsUnhandledMessages;
        this.treatCarriageReturnsAsNewlines = treatCarriageReturnsAsNewlines;
        this.logFile = logFile;
        this.disposables = [];
        this.additionalPidsToTerminate = [];
        this.nextRequestID = 1;
        this.activeRequests = {};
        this.messageBuffers = [];
        this.requestErrorSubscriptions = [];
        this.processExited = false;
    }
    createProcess(workingDirectory, binPath, args, envOverrides) {
        this.logTraffic(`Spawning ${binPath} with args ${JSON.stringify(args)}`);
        this.description = binPath;
        if (workingDirectory)
            this.logTraffic(`..  in ${workingDirectory}`);
        if (envOverrides.envOverrides || envOverrides.toolEnv)
            this.logTraffic(`..  with ${JSON.stringify(envOverrides)}`);
        const env = Object.assign({}, envOverrides.toolEnv, envOverrides.envOverrides);
        this.process = (0, processes_1.safeSpawn)(workingDirectory, binPath, args, env);
        this.logTraffic(`    PID: ${process.pid}`);
        this.process.stdout.on("data", (data) => this.handleStdOut(data));
        this.process.stderr.on("data", (data) => this.handleStdErr(data));
        this.process.on("exit", (code, signal) => this.handleExit(code, signal));
        this.process.on("error", (error) => this.handleError(error));
    }
    /// Flutter may send only \r as a line terminator for improved terminal output
    /// but we should always treat this as a standard newline (eg. terminating a message)
    /// so all \r's can be replaced with \n immediately. Blank lines (from \n\n)
    /// are already handled gracefully.
    ///
    /// https://github.com/flutter/flutter/pull/57590
    normalizeNewlines(data) {
        const normalised = this.treatCarriageReturnsAsNewlines
            ? Buffer.from(data.toString().replace(/\r/g, "\n"))
            : data;
        return Buffer.from(normalised);
    }
    handleStdOut(data) {
        data = this.normalizeNewlines(data);
        // Add this message to the buffer for processing.
        this.messageBuffers.push(data);
        // Kick off processing if we have a full message.
        if (data.indexOf("\n") >= 0)
            this.processMessageBuffer();
    }
    handleStdErr(data) {
        this.logTraffic(`${data.toString()}`, true);
    }
    handleExit(code, signal) {
        this.logTraffic(`Process ${this.description} terminated! ${code}, ${signal}`);
        this.processExited = true;
    }
    handleError(error) {
        this.logTraffic(`Process errored! ${error}`);
    }
    buildRequest(id, method, params) {
        return {
            id: id.toString(),
            method,
            params,
        };
    }
    sendRequest(method, params) {
        // Generate an ID for this request so we can match up the response.
        const id = this.nextRequestID++;
        return new Promise((resolve, reject) => {
            // Stash the callbacks so we can call them later.
            this.activeRequests[id.toString()] = [resolve, reject, method];
            const req = this.buildRequest(id, method, params);
            const json = this.messagesWrappedInBrackets
                ? "[" + JSON.stringify(req) + "]\r\n"
                : JSON.stringify(req) + "\r\n";
            this.sendMessage(json);
        });
    }
    cancelAllRequests() {
        Object.keys(this.activeRequests).forEach((key) => this.activeRequests[key] = "CANCELLED");
    }
    sendMessage(json) {
        this.logTraffic(`==> ${json}`);
        if (this.process)
            this.process.stdin.write(json);
        else
            this.logTraffic(`  (not sent: no process)`);
    }
    processMessageBuffer() {
        let fullBuffer = Buffer.concat(this.messageBuffers);
        this.messageBuffers = [];
        // If the message doesn't end with \n then put the last part back into the buffer.
        const lastNewline = fullBuffer.lastIndexOf("\n");
        if (lastNewline !== fullBuffer.length - 1) {
            const incompleteMessage = fullBuffer.slice(lastNewline + 1);
            fullBuffer = fullBuffer.slice(0, lastNewline);
            this.messageBuffers.push(incompleteMessage);
        }
        // Process the complete messages in the buffer.
        fullBuffer.toString().split("\n").filter((m) => m.trim() !== "").forEach((m) => this.handleMessage(`${m}\n`));
    }
    // tslint:disable-next-line:no-empty
    processUnhandledMessage(message) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logTraffic(`<== ${message.trimRight()}\r\n`);
            if (!this.shouldHandleMessage(message.trim())) {
                return this.processUnhandledMessage(message);
            }
            let msg;
            try {
                msg = JSON.parse(message);
                if (this.messagesWrappedInBrackets && msg && msg.length === 1)
                    msg = msg[0];
            }
            catch (e) {
                if (this.treatHandlingErrorsAsUnhandledMessages) {
                    this.logger.error(`Unexpected non-JSON message, assuming normal stdout (${e})\n\n${e.stack}\n\n${message}`);
                    return this.processUnhandledMessage(message);
                }
                else {
                    throw e;
                }
            }
            try {
                if (msg && this.isNotification(msg))
                    // tslint:disable-next-line: no-floating-promises
                    this.handleNotification(msg).catch((e) => this.logger.error(e));
                else if (msg && this.isRequest(msg))
                    this.processServerRequest(msg).catch((e) => this.logger.error(e));
                else if (msg && this.isResponse(msg))
                    this.handleResponse(msg).catch((e) => this.logger.error(e));
                else {
                    this.logger.error(`Unexpected JSON message, assuming normal stdout : ${message}`);
                    this.processUnhandledMessage(message).catch((e) => this.logger.error(e));
                }
            }
            catch (e) {
                if (this.treatHandlingErrorsAsUnhandledMessages) {
                    this.logger.error(`Failed to handle JSON message, assuming normal stdout (${e})\n\n${e.stack}\n\n${message}`);
                    this.processUnhandledMessage(message).catch((e) => this.logger.error(e));
                }
                else {
                    throw e;
                }
            }
        });
    }
    // tslint:disable-next-line: no-empty
    handleRequest(method, args) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    isNotification(msg) { return !!msg.event; }
    isRequest(msg) { return !!msg.method && !!msg.id; }
    isResponse(msg) { return !!msg.id; }
    processServerRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            let error;
            try {
                result = yield this.handleRequest(request.method, request.params);
            }
            catch (e) {
                error = e;
            }
            const resp = { id: request.id, result, error };
            const json = this.messagesWrappedInBrackets
                ? "[" + JSON.stringify(resp) + "]\r\n"
                : JSON.stringify(resp) + "\r\n";
            this.sendMessage(json);
        });
    }
    handleResponse(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = this.activeRequests[evt.id];
            delete this.activeRequests[evt.id];
            if (handler === "CANCELLED") {
                this.logger.info(`Ignoring response to ${evt.id} because it was cancelled:\n\n${JSON.stringify(evt, undefined, 4)}`);
                return;
            }
            else if (!handler) {
                this.logger.error(`Unable to handle response with ID ${evt.id} because its handler is not available`);
                return;
            }
            const method = handler[2];
            const error = evt.error;
            if (error && error.code === "SERVER_ERROR") {
                error.method = method;
                this.notify(this.requestErrorSubscriptions, error).catch((e) => this.logger.error(e));
            }
            if (error) {
                yield handler[1](error);
            }
            else {
                yield handler[0](evt.result);
            }
        });
    }
    notify(subscriptions, notification) {
        return Promise.all(subscriptions.slice().map((sub) => sub(notification))).catch((e) => console.error(e));
    }
    subscribe(subscriptions, subscriber) {
        subscriptions.push(subscriber);
        const disposable = {
            dispose: () => {
                // Remove from the subscription list.
                let index = subscriptions.indexOf(subscriber);
                if (index >= 0) {
                    subscriptions.splice(index, 1);
                }
                // Also remove from our disposables (else we'll leak it).
                index = this.disposables.indexOf(disposable);
                if (index >= 0) {
                    this.disposables.splice(index, 1);
                }
            },
        };
        this.disposables.push(disposable);
        return disposable;
    }
    registerForRequestError(subscriber) {
        return this.subscribe(this.requestErrorSubscriptions, subscriber);
    }
    logTraffic(message, isError = false) {
        if (isError)
            this.logger.error(message);
        else
            this.logger.info(message);
        if (this.openLogFile !== this.logFile && this.logStream) {
            this.logStream.end();
            this.logStream = undefined;
            this.openLogFile = undefined;
        }
        if (!this.logFile)
            return;
        if (!this.logStream) {
            this.logStream = fs.createWriteStream(this.logFile);
            this.openLogFile = this.logFile;
        }
        this.logStream.write(`[${(new Date()).toLocaleTimeString()}]: `);
        if (this.maxLogLineLength && message.length > this.maxLogLineLength)
            this.logStream.write(message.substring(0, this.maxLogLineLength) + "…\r\n");
        else
            this.logStream.write(message.trim() + "\r\n");
    }
    dispose() {
        for (const pid of this.additionalPidsToTerminate) {
            try {
                process.kill(pid);
            }
            catch (e) {
                // TODO: Logger knows the category!
                this.logger.error({ message: e.toString() });
            }
        }
        this.additionalPidsToTerminate.length = 0;
        try {
            if (!this.processExited && this.process && !this.process.killed)
                this.process.kill();
        }
        catch (e) {
            // This tends to throw a lot because the shell process quit when we terminated the related
            // process above, so just swallow the error.
        }
        this.process = undefined;
        this.disposables.forEach((d) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield d.dispose();
            }
            catch (e) {
                this.logger.error({ message: e.toString() });
            }
        }));
        this.disposables.length = 0;
        // Clear log file so if any more log events come through later, we don't
        // create a new log file and overwrite what we had.
        this.logFile = undefined;
        if (this.logStream) {
            this.logStream.end();
            this.logStream = undefined;
            this.openLogFile = undefined;
        }
    }
}
exports.StdIOService = StdIOService;


/***/ }),

/***/ 4586:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.disposeAll = exports.isWebDevice = exports.escapeDartString = exports.generateTestNameFromFileName = exports.clamp = exports.asHex = exports.asHexColor = exports.notNullOrUndefined = exports.notNull = exports.notUndefined = exports.nullToUndefined = exports.BufferedLogger = exports.errorString = exports.usingCustomScript = exports.isStableSdk = exports.pubVersionIsAtLeast = exports.versionIsAtLeast = exports.isDartSdkFromFlutter = exports.uriToFilePath = exports.findFileInAncestor = exports.PromiseCompleter = exports.escapeRegExp = exports.filenameSafe = exports.flatMapAsync = exports.flatMap = exports.uniq = void 0;
const fs = __webpack_require__(7147);
const path = __webpack_require__(1017);
const semver = __webpack_require__(1249);
const constants_1 = __webpack_require__(5628);
function uniq(array) {
    return array.filter((value, index) => array.indexOf(value) === index);
}
exports.uniq = uniq;
function flatMap(input, f) {
    return input.reduce((acc, x) => acc.concat(f(x)), []);
}
exports.flatMap = flatMap;
function flatMapAsync(input, f) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = [];
        for (const x of input)
            res = res.concat(yield f(x));
        return res;
    });
}
exports.flatMapAsync = flatMapAsync;
function filenameSafe(input) {
    return input.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
}
exports.filenameSafe = filenameSafe;
function escapeRegExp(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
exports.escapeRegExp = escapeRegExp;
class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
exports.PromiseCompleter = PromiseCompleter;
function findFileInAncestor(files, startLocation) {
    let lastParent;
    let parent = startLocation;
    while (parent && parent.length > 1 && parent !== lastParent) {
        for (const file of files) {
            const child = path.join(parent, file);
            if (fs.existsSync(child))
                return child;
        }
        lastParent = parent;
        parent = path.dirname(parent);
    }
    return undefined;
}
exports.findFileInAncestor = findFileInAncestor;
/// Converts a file URI to file path without a dependency on vs.Uri.
function uriToFilePath(uri, returnWindowsPath = constants_1.isWin) {
    let filePath = uri;
    if (uri.startsWith("file://"))
        filePath = decodeURI(uri.substring(7));
    else if (uri.startsWith("file:"))
        filePath = decodeURI(uri.substring(5)); // TODO: Does this case ever get hit? Will it be over-decoded?
    // Windows fixup.
    if (returnWindowsPath) {
        filePath = filePath.replace(/\//g, "\\");
        if (filePath.startsWith("\\"))
            filePath = filePath.substring(1);
    }
    else {
        if (!filePath.startsWith("/"))
            filePath = `/${filePath}`;
    }
    return filePath;
}
exports.uriToFilePath = uriToFilePath;
function isDartSdkFromFlutter(dartSdkPath) {
    const possibleFlutterSdkPath = path.join(path.dirname(path.dirname(path.dirname(dartSdkPath))), "bin");
    return fs.existsSync(path.join(possibleFlutterSdkPath, constants_1.executableNames.flutter));
}
exports.isDartSdkFromFlutter = isDartSdkFromFlutter;
function versionIsAtLeast(inputVersion, requiredVersion) {
    return semver.gte(inputVersion, requiredVersion);
}
exports.versionIsAtLeast = versionIsAtLeast;
function pubVersionIsAtLeast(inputVersion, requiredVersion) {
    // Standard semver gt/lt
    if (semver.gt(inputVersion, requiredVersion))
        return true;
    else if (semver.lt(inputVersion, requiredVersion))
        return false;
    // If the versions are equal, we need to handle build metadata like pub does.
    // https://github.com/dart-lang/pub_semver/
    // If only one of them has build metadata, it's newest.
    if (inputVersion.indexOf("+") !== -1 && requiredVersion.indexOf("+") === -1)
        return true;
    if (inputVersion.indexOf("+") === -1 && requiredVersion.indexOf("+") !== -1)
        return false;
    // Otherwise, since they're both otherwise equal and both have build
    // metadata we can treat the build metadata like pre-release by converting
    // it to pre-release (with -) or appending it to existing pre-release.
    inputVersion = inputVersion.replace("+", inputVersion.indexOf("-") === -1 ? "-" : ".");
    requiredVersion = requiredVersion.replace("+", requiredVersion.indexOf("-") === -1 ? "-" : ".");
    return versionIsAtLeast(inputVersion, requiredVersion);
}
exports.pubVersionIsAtLeast = pubVersionIsAtLeast;
function isStableSdk(sdkVersion) {
    // We'll consider empty versions as dev; stable versions will likely always
    // be shipped with valid version files.
    return !!(sdkVersion && !semver.prerelease(sdkVersion));
}
exports.isStableSdk = isStableSdk;
function usingCustomScript(binPath, binArgs, customScript) {
    if (customScript === null || customScript === void 0 ? void 0 : customScript.script) {
        binPath = customScript.script;
        if (customScript.replacesArgs)
            binArgs = binArgs.slice(customScript.replacesArgs);
    }
    return { executable: binPath, args: binArgs };
}
exports.usingCustomScript = usingCustomScript;
function errorString(error) {
    if (!error)
        return "<empty error>";
    else if (error instanceof Error)
        return error.message + (error.stack ? `\n${error.stack}` : "");
    else if (error.message)
        return error.message;
    else if (typeof error === "string")
        return error;
    else
        return `${error}`;
}
exports.errorString = errorString;
class BufferedLogger {
    constructor() {
        this.buffer = [];
    }
    info(message, category) {
        this.buffer.push({ type: "info", message, category });
    }
    warn(message, category) {
        this.buffer.push({ type: "warn", message, category });
    }
    error(error, category) {
        this.buffer.push({ type: "error", message: error, category });
    }
    flushTo(logger) {
        if (!this.buffer.length)
            return;
        logger.info("Flushing log messages...");
        for (const log of this.buffer) {
            switch (log.type) {
                case "info":
                    logger.info(log.message, log.category);
                    break;
                case "warn":
                    logger.warn(log.message, log.category);
                    break;
                case "error":
                    logger.error(log.message, log.category);
                    break;
            }
        }
        logger.info("Done flushing log messages...");
    }
}
exports.BufferedLogger = BufferedLogger;
function nullToUndefined(value) {
    return (value === null ? undefined : value);
}
exports.nullToUndefined = nullToUndefined;
function notUndefined(x) {
    return x !== undefined;
}
exports.notUndefined = notUndefined;
function notNull(x) {
    return x !== null;
}
exports.notNull = notNull;
function notNullOrUndefined(x) {
    return notUndefined(x) && notNull(x);
}
exports.notNullOrUndefined = notNullOrUndefined;
function asHexColor({ r, g, b, a }) {
    r = clamp(r, 0, 255);
    g = clamp(g, 0, 255);
    b = clamp(b, 0, 255);
    a = clamp(a, 0, 255);
    return `${asHex(a)}${asHex(r)}${asHex(g)}${asHex(b)}`.toLowerCase();
}
exports.asHexColor = asHexColor;
function asHex(v) {
    return Math.round(v).toString(16).padStart(2, "0");
}
exports.asHex = asHex;
function clamp(v, min, max) {
    return Math.min(Math.max(min, v), max);
}
exports.clamp = clamp;
function generateTestNameFromFileName(input) {
    return path.basename(input).replace("_test.dart", "").replace(/_/g, " ");
}
exports.generateTestNameFromFileName = generateTestNameFromFileName;
function escapeDartString(input) {
    return input.replace(/(['"\\])/g, "\\$1");
}
exports.escapeDartString = escapeDartString;
function isWebDevice(deviceId) {
    return !!((deviceId === null || deviceId === void 0 ? void 0 : deviceId.startsWith("web")) || deviceId === "chrome" || deviceId === "edge");
}
exports.isWebDevice = isWebDevice;
function disposeAll(disposables) {
    const toDispose = disposables.slice();
    disposables.length = 0;
    for (const d of toDispose) {
        try {
            d.dispose();
        }
        catch (e) {
            console.warn(e);
        }
    }
}
exports.disposeAll = disposeAll;


/***/ }),

/***/ 7434:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.arrayContainsArray = exports.arrayStartsWith = exports.arraysEqual = exports.unique = exports.not = exports.sortBy = void 0;
function sortBy(items, f) {
    return items.sort((item1, item2) => {
        const r1 = f(item1);
        const r2 = f(item2);
        if (r1 < r2)
            return -1;
        if (r1 > r2)
            return 1;
        return 0;
    });
}
exports.sortBy = sortBy;
function not(f) {
    return (x) => !f(x);
}
exports.not = not;
function unique(items) {
    return Array.from(new Set(items));
}
exports.unique = unique;
function arraysEqual(items1, items2) {
    return items1.length === items2.length && items1.every((val, i) => val === items2[i]);
}
exports.arraysEqual = arraysEqual;
function arrayStartsWith(items1, items2) {
    return items1.length >= items2.length && arraysEqual(items1.slice(0, items2.length), items2);
}
exports.arrayStartsWith = arrayStartsWith;
function arrayContainsArray(haystack, needle) {
    // Loop over valid starting points for the subarray
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        // Check if the relevant length sublist equals the other array.
        if (arraysEqual(haystack.slice(i, i + needle.length), needle))
            return true;
    }
    return false;
}
exports.arrayContainsArray = arrayContainsArray;


/***/ }),

/***/ 4951:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyColor = exports.brightWhiteBackground = exports.brightCyanBackground = exports.brightMagentaBackground = exports.brightBlueBackground = exports.brightYellowBackground = exports.brightGreenBackground = exports.brightRedBackground = exports.brightBlackBackground = exports.whiteBackground = exports.cyanBackground = exports.magentaBackground = exports.blueBackground = exports.yellowBackground = exports.greenBackground = exports.redBackground = exports.blackBackground = exports.brightWhite = exports.brightCyan = exports.brightMagenta = exports.brightBlue = exports.brightYellow = exports.brightGreen = exports.brightRed = exports.brightBlack = exports.white = exports.cyan = exports.magenta = exports.blue = exports.yellow = exports.green = exports.red = exports.black = exports.faint = exports.bold = exports.defaultForeground = void 0;
const codeDefautForeground = 39;
const codeReset = 0;
const codeBold = 1;
const codeFaint = 2;
const brightOffset = 8;
const codeFg = "38;5";
const codeBg = "48;5";
const codeBlack = 0;
const codeRed = 1;
const codeGreen = 2;
const codeYellow = 3;
const codeBlue = 4;
const codeMagenta = 5;
const codeCyan = 6;
const codeWhite = 7;
const esc = (...code) => `\u001B[${code.join(";")}m`;
const defaultForeground = (msg) => `${esc(codeDefautForeground)}${msg}${esc(codeReset)}`;
exports.defaultForeground = defaultForeground;
const bold = (msg) => `${esc(codeBold)}${msg}${esc(codeReset)}`;
exports.bold = bold;
const faint = (msg) => `${esc(codeFaint)}${msg}${esc(codeReset)}`;
exports.faint = faint;
const black = (msg) => `${esc(codeFg, codeBlack)}${msg}${esc(codeReset)}`;
exports.black = black;
const red = (msg) => `${esc(codeFg, codeRed)}${msg}${esc(codeReset)}`;
exports.red = red;
const green = (msg) => `${esc(codeFg, codeGreen)}${msg}${esc(codeReset)}`;
exports.green = green;
const yellow = (msg) => `${esc(codeFg, codeYellow)}${msg}${esc(codeReset)}`;
exports.yellow = yellow;
const blue = (msg) => `${esc(codeFg, codeBlue)}${msg}${esc(codeReset)}`;
exports.blue = blue;
const magenta = (msg) => `${esc(codeFg, codeMagenta)}${msg}${esc(codeReset)}`;
exports.magenta = magenta;
const cyan = (msg) => `${esc(codeFg, codeCyan)}${msg}${esc(codeReset)}`;
exports.cyan = cyan;
const white = (msg) => `${esc(codeFg, codeWhite)}${msg}${esc(codeReset)}`;
exports.white = white;
const brightBlack = (msg) => `${esc(codeFg, codeBlack + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightBlack = brightBlack;
const brightRed = (msg) => `${esc(codeFg, codeRed + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightRed = brightRed;
const brightGreen = (msg) => `${esc(codeFg, codeGreen + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightGreen = brightGreen;
const brightYellow = (msg) => `${esc(codeFg, codeYellow + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightYellow = brightYellow;
const brightBlue = (msg) => `${esc(codeFg, codeBlue + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightBlue = brightBlue;
const brightMagenta = (msg) => `${esc(codeFg, codeMagenta + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightMagenta = brightMagenta;
const brightCyan = (msg) => `${esc(codeFg, codeCyan + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightCyan = brightCyan;
const brightWhite = (msg) => `${esc(codeFg, codeWhite + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightWhite = brightWhite;
const blackBackground = (msg) => `${esc(codeBg, codeBlack + brightOffset)}${msg}${esc(codeReset)}`;
exports.blackBackground = blackBackground;
const redBackground = (msg) => `${esc(codeBg, codeRed)}${msg}${esc(codeReset)}`;
exports.redBackground = redBackground;
const greenBackground = (msg) => `${esc(codeBg, codeGreen)}${msg}${esc(codeReset)}`;
exports.greenBackground = greenBackground;
const yellowBackground = (msg) => `${esc(codeBg, codeYellow)}${msg}${esc(codeReset)}`;
exports.yellowBackground = yellowBackground;
const blueBackground = (msg) => `${esc(codeBg, codeBlue)}${msg}${esc(codeReset)}`;
exports.blueBackground = blueBackground;
const magentaBackground = (msg) => `${esc(codeBg, codeMagenta)}${msg}${esc(codeReset)}`;
exports.magentaBackground = magentaBackground;
const cyanBackground = (msg) => `${esc(codeBg, codeCyan)}${msg}${esc(codeReset)}`;
exports.cyanBackground = cyanBackground;
const whiteBackground = (msg) => `${esc(codeBg, codeWhite)}${msg}${esc(codeReset)}`;
exports.whiteBackground = whiteBackground;
const brightBlackBackground = (msg) => `${esc(codeBg, codeBlack + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightBlackBackground = brightBlackBackground;
const brightRedBackground = (msg) => `${esc(codeBg, codeRed + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightRedBackground = brightRedBackground;
const brightGreenBackground = (msg) => `${esc(codeBg, codeGreen + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightGreenBackground = brightGreenBackground;
const brightYellowBackground = (msg) => `${esc(codeBg, codeYellow + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightYellowBackground = brightYellowBackground;
const brightBlueBackground = (msg) => `${esc(codeBg, codeBlue + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightBlueBackground = brightBlueBackground;
const brightMagentaBackground = (msg) => `${esc(codeBg, codeMagenta + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightMagentaBackground = brightMagentaBackground;
const brightCyanBackground = (msg) => `${esc(codeBg, codeCyan + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightCyanBackground = brightCyanBackground;
const brightWhiteBackground = (msg) => `${esc(codeBg, codeWhite + brightOffset)}${msg}${esc(codeReset)}`;
exports.brightWhiteBackground = brightWhiteBackground;
const whitespacePattern = new RegExp(`^(\\s*)(\\S.*\\S)(\\s*)$`);
/// Applies a color function to a string, but leaves leading/trailing whitespace outside
/// of the color codes. This is mainly used because if trailing newlines fall inside the message
/// when sending OutputEvents() to VS Code, it won't allow source locations to be attached (since
/// they can only be attached to single-line messages).
function applyColor(text, color) {
    const match = text && whitespacePattern.exec(text);
    if (!match)
        return color(text);
    return `${match[1]}${color(match[2])}${match[3]}`;
}
exports.applyColor = applyColor;


/***/ }),

/***/ 300:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nextAvailableFilename = exports.normalizeSlashes = exports.areSameFolder = exports.mkDirRecursive = exports.getRandomInt = exports.tryDeleteFile = exports.getSdkVersion = exports.findProjectFolders = exports.resolveTildePaths = exports.extractFlutterSdkPathFromPackagesFile = exports.referencesBuildRunner = exports.pubspecContentReferencesFlutterSdk = exports.projectReferencesFlutterSdk = exports.isFlutterProjectFolder = exports.isFlutterRepoAsync = exports.hasCreateTriggerFileAsync = exports.hasPubspecAsync = exports.hasPubspec = exports.hasPackageMapFile = exports.readDirAsync = exports.getChildFolders = exports.isEqualOrWithinPath = exports.isWithinPathOrEqual = exports.isWithinPath = exports.forceWindowsDriveLetterToUppercase = exports.fsPath = void 0;
const fs = __webpack_require__(7147);
const os = __webpack_require__(2037);
const path = __webpack_require__(1017);
const semver = __webpack_require__(1249);
const constants_1 = __webpack_require__(5628);
const logging_1 = __webpack_require__(8323);
const package_map_1 = __webpack_require__(143);
const utils_1 = __webpack_require__(4586);
const array_1 = __webpack_require__(7434);
function fsPath(uri, { useRealCasing = false } = {}) {
    // tslint:disable-next-line:disallow-fspath
    let newPath = typeof uri === "string" ? uri : uri.fsPath;
    if (useRealCasing) {
        const realPath = fs.existsSync(newPath) && fs.realpathSync.native(newPath);
        // Since realpathSync.native will resolve symlinks, only do anything if the paths differ
        // _only_ by case.
        // when there was no symlink (eg. the lowercase version of both paths match).
        if (realPath && realPath.toLowerCase() === newPath.toLowerCase() && realPath !== newPath) {
            console.warn(`Rewriting path:\n  ${newPath}\nto:\n  ${realPath} because the casing appears munged`);
            newPath = realPath;
        }
    }
    newPath = forceWindowsDriveLetterToUppercase(newPath);
    return newPath;
}
exports.fsPath = fsPath;
function forceWindowsDriveLetterToUppercase(p) {
    if (typeof p !== "string")
        return undefined;
    if (p && constants_1.isWin && path.isAbsolute(p) && p.startsWith(p.charAt(0).toLowerCase()))
        return p.substr(0, 1).toUpperCase() + p.substr(1);
    return p;
}
exports.forceWindowsDriveLetterToUppercase = forceWindowsDriveLetterToUppercase;
function isWithinPath(file, folder) {
    const relative = path.relative(folder.toLowerCase(), file.toLowerCase());
    return !!relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}
exports.isWithinPath = isWithinPath;
function isWithinPathOrEqual(file, folder) {
    const relative = path.relative(folder, file);
    return !relative || isWithinPath(file, folder);
}
exports.isWithinPathOrEqual = isWithinPathOrEqual;
function isEqualOrWithinPath(file, folder) {
    const relative = path.relative(folder.toLowerCase(), file.toLowerCase());
    return relative === "" || (!!relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}
exports.isEqualOrWithinPath = isEqualOrWithinPath;
function getChildFolders(logger, parent, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(parent))
            return [];
        const files = yield readDirAsync(logger, parent);
        return files.filter((f) => f.isDirectory())
            .filter((f) => f.name !== "bin" || (options && options.allowBin)) // Don't look in bin folders
            .filter((f) => f.name !== "cache" || (options && options.allowCache)) // Don't look in cache folders
            .map((item) => path.join(parent, item.name));
    });
}
exports.getChildFolders = getChildFolders;
function readDirAsync(logger, folder) {
    return new Promise((resolve) => fs.readdir(folder, { withFileTypes: true }, (err, files) => {
        // We will generate errors if we don't have access to this folder
        // so just skip over it.
        if (err) {
            logger.warn(`Skipping folder ${folder} due to error: ${err}`);
            resolve([]);
        }
        else {
            resolve(files);
        }
    }));
}
exports.readDirAsync = readDirAsync;
function hasPackageMapFile(folder) {
    return fs.existsSync(path.join(folder, ".dart_tool", "package_config.json")) || fs.existsSync(path.join(folder, ".packages"));
}
exports.hasPackageMapFile = hasPackageMapFile;
function hasPubspec(folder) {
    return fs.existsSync(path.join(folder, "pubspec.yaml"));
}
exports.hasPubspec = hasPubspec;
function hasPubspecAsync(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fileExists(path.join(folder, "pubspec.yaml"));
    });
}
exports.hasPubspecAsync = hasPubspecAsync;
function hasCreateTriggerFileAsync(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fileExists(path.join(folder, constants_1.FLUTTER_CREATE_PROJECT_TRIGGER_FILE));
    });
}
exports.hasCreateTriggerFileAsync = hasCreateTriggerFileAsync;
function isFlutterRepoAsync(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield fileExists(path.join(folder, "bin/flutter"))) && (yield fileExists(path.join(folder, "bin/cache/dart-sdk")));
    });
}
exports.isFlutterRepoAsync = isFlutterRepoAsync;
function isFlutterProjectFolder(folder) {
    return projectReferencesFlutterSdk(folder);
}
exports.isFlutterProjectFolder = isFlutterProjectFolder;
function projectReferencesFlutterSdk(folder) {
    if (folder && hasPubspec(folder)) {
        return pubspecContentReferencesFlutterSdk(fs.readFileSync(path.join(folder, "pubspec.yaml")).toString());
    }
    return false;
}
exports.projectReferencesFlutterSdk = projectReferencesFlutterSdk;
function pubspecContentReferencesFlutterSdk(content) {
    const regex = new RegExp("sdk\\s*:\\s*[\"']?flutter[\"']?", "i");
    return regex.test(content);
}
exports.pubspecContentReferencesFlutterSdk = pubspecContentReferencesFlutterSdk;
function referencesBuildRunner(folder) {
    if (folder && hasPubspec(folder)) {
        const regex = new RegExp("build_runner\\s*:", "i");
        return regex.test(fs.readFileSync(path.join(folder, "pubspec.yaml")).toString());
    }
    return false;
}
exports.referencesBuildRunner = referencesBuildRunner;
function extractFlutterSdkPathFromPackagesFile(projectFolder) {
    if (!fs.existsSync(projectFolder))
        return undefined;
    let packagePath = package_map_1.PackageMap.loadForProject(logging_1.nullLogger, projectFolder).getPackagePath("flutter");
    if (!packagePath)
        return undefined;
    // Set windows slashes to / while manipulating.
    if (constants_1.isWin) {
        packagePath = packagePath.replace(/\\/g, "/");
    }
    // Make sure ends with a slash.
    if (!packagePath.endsWith("/"))
        packagePath = packagePath + "/";
    // Trim suffix we don't need.
    const pathSuffix = "/packages/flutter/lib/";
    if (packagePath.endsWith(pathSuffix)) {
        packagePath = packagePath.substr(0, packagePath.length - pathSuffix.length);
    }
    // Make sure ends with a slash.
    if (!packagePath.endsWith("/"))
        packagePath = packagePath + "/";
    // Append bin if required.
    if (!packagePath.endsWith("/bin/")) {
        packagePath = packagePath + "bin/";
    }
    // Set windows paths back.
    if (constants_1.isWin) {
        packagePath = packagePath.replace(/\//g, "\\");
        if (packagePath.startsWith("\\"))
            packagePath = packagePath.substring(1);
    }
    return packagePath;
}
exports.extractFlutterSdkPathFromPackagesFile = extractFlutterSdkPathFromPackagesFile;
function fileExists(p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs.promises.access(p);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function resolveTildePaths(p) {
    if (typeof p !== "string")
        return undefined;
    if (p.startsWith("~/"))
        return path.join(os.homedir(), p.substr(2));
    return p;
}
exports.resolveTildePaths = resolveTildePaths;
// Walks a few levels down and returns all folders that look like project
// folders, such as:
// - have a pubspec.yaml
// - have a project create trigger file
// - are the Flutter repo root
function findProjectFolders(logger, roots, excludedFolders, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dartToolFolderName = `${path.sep}.dart_tool${path.sep}`;
        let previousLevelFolders = roots.slice();
        let allPossibleFolders = previousLevelFolders.slice();
        // Start at 1, as we already added the roots.
        for (let i = 1; i < options.searchDepth; i++) {
            let nextLevelFolders = [];
            for (const folder of previousLevelFolders) {
                if (token.isCancellationRequested)
                    break;
                nextLevelFolders = nextLevelFolders.concat(yield getChildFolders(logger, folder));
            }
            allPossibleFolders = allPossibleFolders.concat(nextLevelFolders);
            previousLevelFolders = nextLevelFolders;
        }
        allPossibleFolders = allPossibleFolders
            .filter((f) => !f.includes(dartToolFolderName) && excludedFolders.every((ef) => !isEqualOrWithinPath(f, ef)));
        const projectFolderPromises = allPossibleFolders.map((folder) => __awaiter(this, void 0, void 0, function* () {
            return ({
                exists: options && options.requirePubspec
                    ? yield hasPubspecAsync(folder)
                    : (yield hasPubspecAsync(folder)) || (yield hasCreateTriggerFileAsync(folder)) || (yield isFlutterRepoAsync(folder)),
                folder,
            });
        }));
        const projectFoldersChecks = yield Promise.all(projectFolderPromises);
        const projectFolders = projectFoldersChecks
            .filter((res) => res.exists)
            .map((res) => res.folder);
        return options && options.sort
            ? (0, array_1.sortBy)(projectFolders, (p) => p.toLowerCase())
            : projectFolders;
    });
}
exports.findProjectFolders = findProjectFolders;
function getSdkVersion(logger, { sdkRoot }) {
    if (!sdkRoot)
        return undefined;
    const versionFile = path.join(sdkRoot, "version");
    if (!fs.existsSync(versionFile))
        return undefined;
    try {
        return (0, utils_1.nullToUndefined)(semver.valid(fs
            .readFileSync(versionFile, "utf8")
            .trim()
            .split("\n")
            .filter((l) => l)
            .filter((l) => l.trim().substr(0, 1) !== "#")
            .join("\n")
            .trim()));
    }
    catch (e) {
        logger.error(e);
        return undefined;
    }
}
exports.getSdkVersion = getSdkVersion;
function tryDeleteFile(filePath) {
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
        }
        catch (_a) {
            console.warn(`Failed to delete file ${path}.`);
        }
    }
}
exports.tryDeleteFile = tryDeleteFile;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRandomInt = getRandomInt;
function mkDirRecursive(folder) {
    const parent = path.dirname(folder);
    if (!fs.existsSync(parent))
        mkDirRecursive(parent);
    if (!fs.existsSync(folder))
        fs.mkdirSync(folder);
}
exports.mkDirRecursive = mkDirRecursive;
function areSameFolder(folder1, folder2) {
    // Trim any trailing path separators of either direction.
    folder1 = folder1.replace(/[\\/]+$/, "");
    folder2 = folder2.replace(/[\\/]+$/, "");
    return folder1 === folder2;
}
exports.areSameFolder = areSameFolder;
function normalizeSlashes(p) {
    return p.replace(/[\\/]/g, path.sep);
}
exports.normalizeSlashes = normalizeSlashes;
/**
 * Gets a unique path or filename for the specified {folderUri} location, appending a numerical value
 * between {prefix} and suffix, as required.
 *
 * A directory/file location will be generated from {prefix} with a trailing number (eg. `mydir1`) and
 * its existence will be checked; if it already exists, the number will be incremented and checked again.
 *
 * This will continue until a non-existent directory/file is available, or until the maxiumum search
 * limit (of 128) is reached.
 *
 * @param folder directory to check for existing directories or files.
 * @param prefix prefix of the directory/file
 * @param suffix suffix of the directory/file
 */
function nextAvailableFilename(folder, prefix, suffix = "") {
    // Set an upper bound on how many attempts we should make in getting a non-existent name.
    const maxSearchLimit = 128;
    for (let index = 1; index <= maxSearchLimit; index++) {
        const name = `${prefix}${index}${suffix}`;
        const fullPath = path.join(folder, name);
        if (!fs.existsSync(fullPath)) {
            // Name doesn't appear to exist on-disk and thus can be used - return it.
            return name;
        }
    }
    // We hit the search limit, so return {prefix}{index} (eg. mydir1) and allow the extension to
    // handle the already-exists condition if user doesn't change it manually.
    return `${prefix}1${suffix}`;
}
exports.nextAvailableFilename = nextAvailableFilename;


/***/ }),

/***/ 564:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseStackFrame = exports.mayContainStackFrame = exports.maxStackFrameMessageLength = void 0;
exports.maxStackFrameMessageLength = 1000;
const containsStackFramePattern = new RegExp(`(?:dart:|package:|\\.dart)`);
const stackFramePattern = new RegExp(`\\(?(?:\\w+:)??((?:(?:dart:|package:)[\\w\\-]+\\/|file:\\/\\/(?:\\/?\\w:\\/)?)?[^\\s:'"]+\\.dart)(?:[: ](\\d+):(\\d+))?\\)*(.*)?$`, "m");
const linePattern = new RegExp(`line (\\d+)`);
const colPattern = new RegExp(`(?:col|pos) (\\d+)`);
function mayContainStackFrame(message) {
    return containsStackFramePattern.test(message);
}
exports.mayContainStackFrame = mayContainStackFrame;
function parseStackFrame(message) {
    // Messages over 1000 characters are unlikely to be stack frames, so short-cut
    // and assume no match.
    if (!message || message.length > exports.maxStackFrameMessageLength)
        return undefined;
    const match = stackFramePattern.exec(message);
    if (match) {
        const prefix = message.substr(0, match.index).trim();
        const suffix = (match[4] || "").trim();
        let col = match[3] !== undefined ? parseInt(match[3]) : undefined;
        let line = match[2] !== undefined ? parseInt(match[2]) : undefined;
        // Handle some common line/col in text that are not in the usual format we can extract, for ex.
        //     Failed assertion: line ${line} pos ${col}
        if (!line) {
            const lineMatch = linePattern.exec(message);
            if (lineMatch)
                line = parseInt(lineMatch[1]);
        }
        if (!col) {
            const colMatch = colPattern.exec(message);
            if (colMatch)
                col = parseInt(colMatch[1]);
        }
        // Only consider this a stack frame if this has either a prefix or suffix, otherwise
        // it's likely just a printed filename or a line like "Launching lib/foo.dart on ...".
        const isStackFrame = !!prefix !== !!suffix;
        // Text should only be replaced if there was a line/col and only one of prefix/suffix, to avoid
        // replacing user prints of filenames or text like "Launching lib/foo.dart on Chrome".
        const textReplacement = (isStackFrame && line && col)
            ? (prefix || suffix)
            : undefined;
        const text = `${textReplacement || message}`.trim();
        return {
            col,
            isStackFrame,
            line,
            sourceUri: match[1],
            text,
        };
    }
    return undefined;
}
exports.parseStackFrame = parseStackFrame;


/***/ }),

/***/ 137:
/***/ ((module) => {

"use strict";


/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0x00) {  // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {  // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0  // overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {  // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80 ||  // overlong
        buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0  // surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {  // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80 ||  // overlong
        buf[i] === 0xf4 && buf[i + 1] > 0x8f || buf[i] > 0xf4  // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

module.exports = isValidUTF8;


/***/ }),

/***/ 311:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


try {
  module.exports = __webpack_require__(9516)(__dirname);
} catch (e) {
  module.exports = __webpack_require__(137);
}


/***/ }),

/***/ 8777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const WebSocket = __webpack_require__(8762);

WebSocket.createWebSocketStream = __webpack_require__(404);
WebSocket.Server = __webpack_require__(9284);
WebSocket.Receiver = __webpack_require__(2957);
WebSocket.Sender = __webpack_require__(7330);

WebSocket.WebSocket = WebSocket;
WebSocket.WebSocketServer = WebSocket.Server;

module.exports = WebSocket;


/***/ }),

/***/ 977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { EMPTY_BUFFER } = __webpack_require__(1872);

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer(data) {
  toBuffer.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

try {
  const bufferUtil = __webpack_require__(1891);

  module.exports = {
    concat,
    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bufferUtil.mask(source, mask, output, offset, length);
    },
    toArrayBuffer,
    toBuffer,
    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bufferUtil.unmask(buffer, mask);
    }
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = {
    concat,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
}


/***/ }),

/***/ 1872:
/***/ ((module) => {

"use strict";


module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};


/***/ }),

/***/ 62:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { kForOnEventAttribute, kListener } = __webpack_require__(1872);

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');

/**
 * Class representing an event.
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }

  /**
   * @type {*}
   */
  get target() {
    return this[kTarget];
  }

  /**
   * @type {String}
   */
  get type() {
    return this[kType];
  }
}

Object.defineProperty(Event.prototype, 'target', { enumerable: true });
Object.defineProperty(Event.prototype, 'type', { enumerable: true });

/**
 * Class representing a close event.
 *
 * @extends Event
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);

    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }

  /**
   * @type {Number}
   */
  get code() {
    return this[kCode];
  }

  /**
   * @type {String}
   */
  get reason() {
    return this[kReason];
  }

  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[kWasClean];
  }
}

Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

/**
 * Class representing an error event.
 *
 * @extends Event
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);

    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }

  /**
   * @type {*}
   */
  get error() {
    return this[kError];
  }

  /**
   * @type {String}
   */
  get message() {
    return this[kMessage];
  }
}

Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

/**
 * Class representing a message event.
 *
 * @extends Event
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);

    this[kData] = options.data === undefined ? null : options.data;
  }

  /**
   * @type {*}
   */
  get data() {
    return this[kData];
  }
}

Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, listener, options = {}) {
    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');

        event[kTarget] = this;
        listener.call(this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
    wrapper[kListener] = listener;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {Function} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }
};

module.exports = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};


/***/ }),

/***/ 1503:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { tokenChars } = __webpack_require__(6746);

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (
        i !== 0 &&
        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = { format, parse };


/***/ }),

/***/ 305:
/***/ ((module) => {

"use strict";


const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
}

module.exports = Limiter;


/***/ }),

/***/ 5196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const zlib = __webpack_require__(9796);

const bufferUtil = __webpack_require__(977);
const Limiter = __webpack_require__(305);
const { kStatusCode } = __webpack_require__(1872);

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) data = data.slice(0, data.length - 4);

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
}

module.exports = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}


/***/ }),

/***/ 2957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { Writable } = __webpack_require__(2781);

const PerMessageDeflate = __webpack_require__(5196);
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  kStatusCode,
  kWebSocket
} = __webpack_require__(1872);
const { concat, toArrayBuffer, unmask } = __webpack_require__(977);
const { isValidStatusCode, isValidUTF8 } = __webpack_require__(6746);

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._binaryType = options.binaryType || BINARY_TYPES[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      }
    } else {
      this._loop = false;
      return error(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );
      }
    } else if (this._masked) {
      this._loop = false;
      return error(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(
              RangeError,
              'Max payload size exceeded',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
            )
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER);
        this.end();
      } else if (data.length === 1) {
        return error(
          RangeError,
          'invalid payload length 1',
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );
        }

        const buf = data.slice(2);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

module.exports = Receiver;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode] = statusCode;
  return err;
}


/***/ }),

/***/ 7330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls$" }] */



const net = __webpack_require__(1808);
const tls = __webpack_require__(4404);
const { randomFillSync } = __webpack_require__(6113);

const PerMessageDeflate = __webpack_require__(5196);
const { EMPTY_BUFFER } = __webpack_require__(1872);
const { isValidStatusCode } = __webpack_require__(6746);
const { mask: applyMask, toBuffer } = __webpack_require__(977);

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        randomFillSync(mask, 0, 4);
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        [kByteLength]: byteLength,
        fin: options.fin,
        generateMask: this._generateMask,
        mask: options.mask,
        maskBuffer: this._maskBuffer,
        opcode,
        readOnly,
        rsv1
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(data, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;


/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { Duplex } = __webpack_require__(2781);

/**
 * Emits the `'close'` event on a stream.
 *
 * @param {Duplex} stream The stream.
 * @private
 */
function emitClose(stream) {
  stream.emit('close');
}

/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}

/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */
function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();
  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}

/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
  let terminateOnDestroy = true;

  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  ws.on('message', function message(msg, isBinary) {
    const data =
      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

    if (!duplex.push(data)) ws.pause();
  });

  ws.once('error', function error(err) {
    if (duplex.destroyed) return;

    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
    //
    // - If the `'error'` event is emitted before the `'open'` event, then
    //   `ws.terminate()` is a noop as no socket is assigned.
    // - Otherwise, the error is re-emitted by the listener of the `'error'`
    //   event of the `Receiver` object. The listener already closes the
    //   connection by calling `ws.close()`. This allows a close frame to be
    //   sent to the other peer. If `ws.terminate()` is called right after this,
    //   then the close frame might not be sent.
    terminateOnDestroy = false;
    duplex.destroy(err);
  });

  ws.once('close', function close() {
    if (duplex.destroyed) return;

    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    let called = false;

    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });

    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });

    if (terminateOnDestroy) ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    }

    // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.
    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });
      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.isPaused) ws.resume();
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;


/***/ }),

/***/ 640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { tokenChars } = __webpack_require__(6746);

/**
 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
 *
 * @param {String} header The field value of the header
 * @return {Set} The subprotocol names
 * @public
 */
function parse(header) {
  const protocols = new Set();
  let start = -1;
  let end = -1;
  let i = 0;

  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1) start = i;
    } else if (
      i !== 0 &&
      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
    ) {
      if (end === -1 && start !== -1) end = i;
    } else if (code === 0x2c /* ',' */) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }

      if (end === -1) end = i;

      const protocol = header.slice(start, end);

      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }

      protocols.add(protocol);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  if (start === -1 || end !== -1) {
    throw new SyntaxError('Unexpected end of input');
  }

  const protocol = header.slice(start, i);

  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }

  protocols.add(protocol);
  return protocols;
}

module.exports = { parse };


/***/ }),

/***/ 6746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

try {
  const isValidUTF8 = __webpack_require__(311);

  module.exports = {
    isValidStatusCode,
    isValidUTF8(buf) {
      return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
    },
    tokenChars
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = {
    isValidStatusCode,
    isValidUTF8: _isValidUTF8,
    tokenChars
  };
}


/***/ }),

/***/ 9284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls|https$" }] */



const EventEmitter = __webpack_require__(2361);
const http = __webpack_require__(3685);
const https = __webpack_require__(5687);
const net = __webpack_require__(1808);
const tls = __webpack_require__(4404);
const { createHash } = __webpack_require__(6113);

const extension = __webpack_require__(1503);
const PerMessageDeflate = __webpack_require__(5196);
const subprotocol = __webpack_require__(640);
const WebSocket = __webpack_require__(8762);
const { GUID, kWebSocket } = __webpack_require__(1872);

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      process.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);

    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //
      server.close(() => {
        emitClose(this);
      });
    }
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key =
      req.headers['sec-websocket-key'] !== undefined
        ? req.headers['sec-websocket-key']
        : false;
    const version = +req.headers['sec-websocket-version'];

    if (
      req.method !== 'GET' ||
      req.headers.upgrade.toLowerCase() !== 'websocket' ||
      !key ||
      !keyRegex.test(key) ||
      (version !== 8 && version !== 13) ||
      !this.shouldHandle(req)
    ) {
      return abortHandshake(socket, 400);
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (
      this.options.perMessageDeflate &&
      secWebSocketExtensions !== undefined
    ) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(
            extensions,
            key,
            protocols,
            req,
            socket,
            head,
            cb
          );
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new this.options.WebSocket(null);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols
        ? this.options.handleProtocols(protocols, req)
        : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, {
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          process.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }
}

module.exports = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}

/**
 * Handle premature socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || http.STATUS_CODES[code];
    headers = {
      Connection: 'close',
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(message),
      ...headers
    };

    socket.write(
      `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
        Object.keys(headers)
          .map((h) => `${h}: ${headers[h]}`)
          .join('\r\n') +
        '\r\n\r\n' +
        message
    );
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}


/***/ }),

/***/ 8762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Readable$" }] */



const EventEmitter = __webpack_require__(2361);
const https = __webpack_require__(5687);
const http = __webpack_require__(3685);
const net = __webpack_require__(1808);
const tls = __webpack_require__(4404);
const { randomBytes, createHash } = __webpack_require__(6113);
const { Readable } = __webpack_require__(2781);
const { URL } = __webpack_require__(7310);

const PerMessageDeflate = __webpack_require__(5196);
const Receiver = __webpack_require__(2957);
const Sender = __webpack_require__(7330);
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket,
  NOOP
} = __webpack_require__(1872);
const {
  EventTarget: { addEventListener, removeEventListener }
} = __webpack_require__(62);
const { format, parse } = __webpack_require__(1503);
const { toBuffer } = __webpack_require__(977);

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver = new Receiver({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    this._sender = new Sender(socket, this._extensions, options.generateMask);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';
  let invalidURLMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isUnixSocket) {
    invalidURLMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
  } else if (isUnixSocket && !parsedUrl.pathname) {
    invalidURLMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidURLMessage = 'The URL contains a fragment identifier';
  }

  if (invalidURLMessage) {
    const err = new SyntaxError(invalidURLMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket',
    ...opts.headers
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalHost = parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (
      websocket.listenerCount('redirect') === 0 &&
      parsedUrl.host !== websocket._originalHost
    ) {
      //
      // Match curl 7.77.0 behavior and drop the following headers. These
      // headers are also dropped when following a redirect to a subdomain.
      //
      delete opts.headers.authorization;
      delete opts.headers.cookie;
      delete opts.headers.host;
      opts.auth = undefined;
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== PerMessageDeflate.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  req.end();
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket.CLOSING;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    process.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    cb(err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  process.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  if (websocket._socket[kWebSocket] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    process.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode]);
  }

  websocket.emit('error', err);
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket._readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}


/***/ }),

/***/ 9602:
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 4411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(9602)(Yallist)
} catch (er) {}


/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const debugadapter_1 = __webpack_require__(9955);
const dart_debug_impl_1 = __webpack_require__(2372);
const dart_test_debug_impl_1 = __webpack_require__(2485);
const flutter_debug_impl_1 = __webpack_require__(8384);
const flutter_test_debug_impl_1 = __webpack_require__(2651);
const web_debug_impl_1 = __webpack_require__(2812);
const web_test_debug_impl_1 = __webpack_require__(5760);
const args = process.argv.slice(2);
const debugType = args.length ? args[0] : undefined;
const debuggers = {
    "dart": dart_debug_impl_1.DartDebugSession,
    "dart_test": dart_test_debug_impl_1.DartTestDebugSession,
    "flutter": flutter_debug_impl_1.FlutterDebugSession,
    "flutter_test": flutter_test_debug_impl_1.FlutterTestDebugSession,
    "web": web_debug_impl_1.WebDebugSession,
    "web_test": web_test_debug_impl_1.WebTestDebugSession,
};
const dbg = debugType ? debuggers[debugType] : undefined;
if (dbg) {
    debugadapter_1.DebugSession.run(dbg);
}
else {
    throw new Error(`Debugger type must be one of ${Object.keys(debuggers).join(", ")} but got ${debugType}.\n  argv: ${process.argv.join("    ")}`);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=debug.js.map