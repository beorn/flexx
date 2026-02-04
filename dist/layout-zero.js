var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// ../../node_modules/.bun/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS((exports, module) => {
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// ../../node_modules/.bun/debug@4.4.3/node_modules/debug/src/common.js
var require_common = __commonJS((exports, module) => {
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0;i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self = debug;
        const curr = Number(new Date);
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const ns of split) {
        if (ns[0] === "-") {
          createDebug.skips.push(ns.slice(1));
        } else {
          createDebug.names.push(ns);
        }
      }
    }
    function matchesTemplate(search, template) {
      let searchIndex = 0;
      let templateIndex = 0;
      let starIndex = -1;
      let matchIndex = 0;
      while (searchIndex < search.length) {
        if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
          if (template[templateIndex] === "*") {
            starIndex = templateIndex;
            matchIndex = searchIndex;
            templateIndex++;
          } else {
            searchIndex++;
            templateIndex++;
          }
        } else if (starIndex !== -1) {
          templateIndex = starIndex + 1;
          matchIndex++;
          searchIndex = matchIndex;
        } else {
          return false;
        }
      }
      while (templateIndex < template.length && template[templateIndex] === "*") {
        templateIndex++;
      }
      return templateIndex === template.length;
    }
    function disable() {
      const namespaces = [
        ...createDebug.names,
        ...createDebug.skips.map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      for (const skip of createDebug.skips) {
        if (matchesTemplate(name, skip)) {
          return false;
        }
      }
      for (const ns of createDebug.names) {
        if (matchesTemplate(name, ns)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  module.exports = setup;
});

// ../../node_modules/.bun/debug@4.4.3/node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module) => {
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    let m;
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  exports.log = console.debug || console.log || (() => {});
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error) {}
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
    } catch (error) {}
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {}
  }
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
});

// ../../node_modules/.bun/picocolors@1.1.1/node_modules/picocolors/picocolors.browser.js
var require_picocolors_browser = __commonJS((exports, module) => {
  var x = String;
  var create = function() {
    return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x, blackBright: x, redBright: x, greenBright: x, yellowBright: x, blueBright: x, magentaBright: x, cyanBright: x, whiteBright: x, bgBlackBright: x, bgRedBright: x, bgGreenBright: x, bgYellowBright: x, bgBlueBright: x, bgMagentaBright: x, bgCyanBright: x, bgWhiteBright: x };
  };
  module.exports = create();
  module.exports.createColors = create;
});

// ../beorn-logger/src/index.ts
var exports_src = {};
__export(exports_src, {
  stopCollecting: () => stopCollecting,
  startCollecting: () => startCollecting,
  spansAreEnabled: () => spansAreEnabled,
  setTraceFilter: () => setTraceFilter,
  setLogLevel: () => setLogLevel,
  resetIds: () => resetIds,
  getTraceFilter: () => getTraceFilter,
  getLogLevel: () => getLogLevel,
  getCollectedSpans: () => getCollectedSpans,
  enableSpans: () => enableSpans,
  disableSpans: () => disableSpans,
  createLogger: () => createLogger,
  createConditionalLogger: () => createConditionalLogger,
  clearCollectedSpans: () => clearCollectedSpans
});
function setLogLevel(level) {
  currentLogLevel = level;
}
function getLogLevel() {
  return currentLogLevel;
}
function enableSpans() {
  spansEnabled = true;
}
function disableSpans() {
  spansEnabled = false;
}
function spansAreEnabled() {
  return spansEnabled;
}
function setTraceFilter(namespaces) {
  if (namespaces === null || namespaces.length === 0) {
    traceFilter = null;
  } else {
    traceFilter = new Set(namespaces);
    spansEnabled = true;
  }
}
function getTraceFilter() {
  return traceFilter ? [...traceFilter] : null;
}
function generateSpanId() {
  return `sp_${(++spanIdCounter).toString(36)}`;
}
function generateTraceId() {
  return `tr_${(++traceIdCounter).toString(36)}`;
}
function resetIds() {
  spanIdCounter = 0;
  traceIdCounter = 0;
}
function shouldLog(level) {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLogLevel];
}
function shouldTraceNamespace(namespace) {
  if (!spansEnabled)
    return false;
  if (!traceFilter)
    return true;
  for (const filter of traceFilter) {
    if (namespace === filter || namespace.startsWith(filter + ":")) {
      return true;
    }
  }
  return false;
}
function formatConsole(namespace, level, message, data) {
  const time = import_picocolors.default.dim(new Date().toISOString().split("T")[1]?.split(".")[0] || "");
  let levelStr = "";
  switch (level) {
    case "trace":
      levelStr = import_picocolors.default.dim("TRACE");
      break;
    case "debug":
      levelStr = import_picocolors.default.dim("DEBUG");
      break;
    case "info":
      levelStr = import_picocolors.default.blue("INFO");
      break;
    case "warn":
      levelStr = import_picocolors.default.yellow("WARN");
      break;
    case "error":
      levelStr = import_picocolors.default.red("ERROR");
      break;
    case "span":
      levelStr = import_picocolors.default.magenta("SPAN");
      break;
  }
  const ns = import_picocolors.default.cyan(namespace);
  let output = `${time} ${levelStr} ${ns} ${message}`;
  if (data && Object.keys(data).length > 0) {
    output += ` ${import_picocolors.default.dim(JSON.stringify(data))}`;
  }
  return output;
}
function formatJSON(namespace, level, message, data) {
  const entry = {
    time: new Date().toISOString(),
    level,
    name: namespace,
    msg: message,
    ...data
  };
  const seen = new WeakSet;
  return JSON.stringify(entry, (_key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value))
        return "[Circular]";
      seen.add(value);
    }
    return value;
  });
}
function writeLog(namespace, level, message, data) {
  if (!shouldLog(level))
    return;
  const formatted = process.env.TRACE_FORMAT === "json" ? formatJSON(namespace, level, message, data) : formatConsole(namespace, level, message, data);
  switch (level) {
    case "trace":
    case "debug":
      console.debug(formatted);
      break;
    case "info":
      console.info(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "error":
      console.error(formatted);
      break;
  }
}
function writeSpan(namespace, duration, attrs) {
  if (!shouldTraceNamespace(namespace))
    return;
  const message = `(${duration}ms)`;
  const formatted = process.env.TRACE_FORMAT === "json" ? formatJSON(namespace, "span", message, { duration, ...attrs }) : formatConsole(namespace, "span", message, { duration, ...attrs });
  console.error(formatted);
}
function createLoggerImpl(name, props, spanMeta, parentSpanId, traceId) {
  const log = (level, msgOrError, data) => {
    if (msgOrError instanceof Error) {
      const err = msgOrError;
      writeLog(name, level, err.message, {
        ...props,
        ...data,
        error_type: err.name,
        error_stack: err.stack,
        error_code: err.code
      });
    } else {
      writeLog(name, level, msgOrError, { ...props, ...data });
    }
  };
  const logger = {
    name,
    props: Object.freeze({ ...props }),
    get spanData() {
      if (!spanMeta)
        return null;
      return new Proxy(spanMeta.attrs, {
        get(_target, prop) {
          if (prop === "id")
            return spanMeta.id;
          if (prop === "traceId")
            return spanMeta.traceId;
          if (prop === "parentId")
            return spanMeta.parentId;
          if (prop === "startTime")
            return spanMeta.startTime;
          if (prop === "endTime")
            return spanMeta.endTime;
          if (prop === "duration") {
            if (spanMeta.endTime !== null) {
              return spanMeta.endTime - spanMeta.startTime;
            }
            return Date.now() - spanMeta.startTime;
          }
          return spanMeta.attrs[prop];
        },
        set(_target, prop, value) {
          if (prop !== "id" && prop !== "traceId" && prop !== "parentId" && prop !== "startTime" && prop !== "endTime" && prop !== "duration") {
            spanMeta.attrs[prop] = value;
            return true;
          }
          return false;
        }
      });
    },
    trace: (msg, data) => log("trace", msg, data),
    debug: (msg, data) => log("debug", msg, data),
    info: (msg, data) => log("info", msg, data),
    warn: (msg, data) => log("warn", msg, data),
    error: (msgOrError, data) => log("error", msgOrError, data),
    logger(namespace, childProps) {
      const childName = namespace ? `${name}:${namespace}` : name;
      const mergedProps = { ...props, ...childProps };
      return createLoggerImpl(childName, mergedProps, null, parentSpanId, traceId);
    },
    span(namespace, childProps) {
      const childName = namespace ? `${name}:${namespace}` : name;
      const mergedProps = { ...props, ...childProps };
      const newSpanId = generateSpanId();
      const newTraceId = traceId || generateTraceId();
      const newSpanData = {
        id: newSpanId,
        traceId: newTraceId,
        parentId: parentSpanId,
        startTime: Date.now(),
        endTime: null,
        duration: null,
        attrs: {}
      };
      const spanLogger = createLoggerImpl(childName, mergedProps, newSpanData, newSpanId, newTraceId);
      spanLogger[Symbol.dispose] = () => {
        if (newSpanData.endTime !== null)
          return;
        newSpanData.endTime = Date.now();
        newSpanData.duration = newSpanData.endTime - newSpanData.startTime;
        writeSpan(childName, newSpanData.duration, {
          span_id: newSpanData.id,
          trace_id: newSpanData.traceId,
          parent_id: newSpanData.parentId,
          ...mergedProps,
          ...newSpanData.attrs
        });
      };
      return spanLogger;
    },
    child(context) {
      return this.logger(context);
    },
    end() {
      if (spanMeta && spanMeta.endTime === null) {
        this[Symbol.dispose]?.();
      }
    }
  };
  return logger;
}
function createLogger(name, props) {
  return createLoggerImpl(name, props || {}, null, null, null);
}
function startCollecting() {
  collectSpans = true;
  collectedSpans.length = 0;
}
function stopCollecting() {
  collectSpans = false;
  return [...collectedSpans];
}
function getCollectedSpans() {
  return [...collectedSpans];
}
function clearCollectedSpans() {
  collectedSpans.length = 0;
}
function createConditionalLogger(name, props) {
  const baseLog = createLogger(name, props);
  return new Proxy(baseLog, {
    get(target, prop) {
      if (prop in LOG_LEVEL_PRIORITY && prop !== "silent") {
        const current = LOG_LEVEL_PRIORITY[currentLogLevel];
        if (LOG_LEVEL_PRIORITY[prop] < current) {
          return;
        }
      }
      return target[prop];
    }
  });
}
var import_picocolors, LOG_LEVEL_PRIORITY, envLogLevel, currentLogLevel, traceEnv, spansEnabled, traceFilter = null, spanIdCounter = 0, traceIdCounter = 0, collectedSpans, collectSpans = false;
var init_src = __esm(() => {
  import_picocolors = __toESM(require_picocolors_browser(), 1);
  LOG_LEVEL_PRIORITY = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    silent: 5
  };
  envLogLevel = process.env.LOG_LEVEL?.toLowerCase();
  currentLogLevel = envLogLevel === "trace" || envLogLevel === "debug" || envLogLevel === "info" || envLogLevel === "warn" || envLogLevel === "error" || envLogLevel === "silent" ? envLogLevel : "info";
  traceEnv = process.env.TRACE;
  spansEnabled = traceEnv === "1" || traceEnv === "true";
  if (traceEnv && traceEnv !== "1" && traceEnv !== "true") {
    traceFilter = new Set(traceEnv.split(",").map((s) => s.trim()));
    spansEnabled = true;
  }
  collectedSpans = [];
});

// src/constants.ts
var FLEX_DIRECTION_COLUMN_REVERSE = 1;
var FLEX_DIRECTION_ROW = 2;
var FLEX_DIRECTION_ROW_REVERSE = 3;
var WRAP_NO_WRAP = 0;
var WRAP_WRAP_REVERSE = 2;
var ALIGN_AUTO = 0;
var ALIGN_CENTER = 2;
var ALIGN_FLEX_END = 3;
var ALIGN_STRETCH = 4;
var ALIGN_BASELINE = 5;
var ALIGN_SPACE_BETWEEN = 6;
var ALIGN_SPACE_AROUND = 7;
var JUSTIFY_CENTER = 1;
var JUSTIFY_FLEX_END = 2;
var JUSTIFY_SPACE_BETWEEN = 3;
var JUSTIFY_SPACE_AROUND = 4;
var JUSTIFY_SPACE_EVENLY = 5;
var DISPLAY_NONE = 1;
var POSITION_TYPE_STATIC = 0;
var POSITION_TYPE_RELATIVE = 1;
var POSITION_TYPE_ABSOLUTE = 2;
var DIRECTION_LTR = 1;
var DIRECTION_RTL = 2;
var MEASURE_MODE_UNDEFINED = 0;
var MEASURE_MODE_EXACTLY = 1;
var MEASURE_MODE_AT_MOST = 2;
var UNIT_UNDEFINED = 0;
var UNIT_POINT = 1;
var UNIT_PERCENT = 2;
var UNIT_AUTO = 3;

// src/utils.ts
var traversalStack = [];
function resolveValue(value, availableSize) {
  switch (value.unit) {
    case UNIT_POINT:
      return value.value;
    case UNIT_PERCENT:
      if (Number.isNaN(availableSize)) {
        return 0;
      }
      return availableSize * (value.value / 100);
    default:
      return 0;
  }
}
function applyMinMax(size, min, max, available) {
  let result = size;
  if (min.unit !== UNIT_UNDEFINED) {
    const minValue = resolveValue(min, available);
    if (!Number.isNaN(minValue)) {
      if (Number.isNaN(result)) {
        result = minValue;
      } else {
        result = Math.max(result, minValue);
      }
    }
  }
  if (max.unit !== UNIT_UNDEFINED) {
    const maxValue = resolveValue(max, available);
    if (!Number.isNaN(maxValue)) {
      if (!Number.isNaN(result)) {
        result = Math.min(result, maxValue);
      }
    }
  }
  return result;
}

// src/logger.ts
var _logger = null;
function createFallbackLogger(namespace) {
  try {
    const createDebug = require_browser();
    const debug = createDebug(namespace);
    return { debug: debug.enabled ? debug : undefined };
  } catch {
    return { debug: undefined };
  }
}
async function detectLogger(namespace) {
  try {
    const { createConditionalLogger: createConditionalLogger2 } = await Promise.resolve().then(() => (init_src(), exports_src));
    const logger = createConditionalLogger2(namespace);
    if (logger.debug) {
      const originalDebug = logger.debug;
      return {
        debug: (msg, ...args) => {
          let i = 0;
          const formatted = msg.replace(/%[sdOo]/g, () => {
            const arg = args[i++];
            if (arg === undefined)
              return "";
            if (arg === null)
              return "null";
            if (typeof arg === "object")
              return JSON.stringify(arg);
            return String(arg);
          });
          originalDebug(formatted);
        }
      };
    }
    return { debug: undefined };
  } catch {
    return createFallbackLogger(namespace);
  }
}
_logger = await detectLogger("flexx:layout");
var log = {
  get debug() {
    return _logger?.debug;
  }
};

// src/layout-zero.ts
function isRowDirection(flexDirection) {
  return flexDirection === FLEX_DIRECTION_ROW || flexDirection === FLEX_DIRECTION_ROW_REVERSE;
}
function isReverseDirection(flexDirection) {
  return flexDirection === FLEX_DIRECTION_ROW_REVERSE || flexDirection === FLEX_DIRECTION_COLUMN_REVERSE;
}
function getLogicalEdgeValue(arr, physicalIndex, flexDirection, direction = DIRECTION_LTR) {
  const isRow = isRowDirection(flexDirection);
  const isReverse = isReverseDirection(flexDirection);
  const isRTL = direction === DIRECTION_RTL;
  const effectiveReverse = isRow ? isRTL !== isReverse : isReverse;
  if (isRow) {
    if (physicalIndex === 0) {
      return effectiveReverse ? arr[5] : arr[4];
    } else if (physicalIndex === 2) {
      return effectiveReverse ? arr[4] : arr[5];
    }
  } else {
    if (physicalIndex === 1) {
      return effectiveReverse ? arr[5] : arr[4];
    } else if (physicalIndex === 3) {
      return effectiveReverse ? arr[4] : arr[5];
    }
  }
  return;
}
function resolveEdgeValue(arr, physicalIndex, flexDirection, availableSize, direction = DIRECTION_LTR) {
  const logicalValue = getLogicalEdgeValue(arr, physicalIndex, flexDirection, direction);
  if (logicalValue && logicalValue.unit !== UNIT_UNDEFINED) {
    return resolveValue(logicalValue, availableSize);
  }
  return resolveValue(arr[physicalIndex], availableSize);
}
function isEdgeAuto(arr, physicalIndex, flexDirection, direction = DIRECTION_LTR) {
  const logicalValue = getLogicalEdgeValue(arr, physicalIndex, flexDirection, direction);
  if (logicalValue && logicalValue.unit !== UNIT_UNDEFINED) {
    return logicalValue.unit === UNIT_AUTO;
  }
  return arr[physicalIndex].unit === UNIT_AUTO;
}
function markSubtreeLayoutSeen(node) {
  traversalStack.length = 0;
  traversalStack.push(node);
  while (traversalStack.length > 0) {
    const current = traversalStack.pop();
    current["_isDirty"] = false;
    current["_hasNewLayout"] = true;
    for (const child of current.children) {
      traversalStack.push(child);
    }
  }
}
function countNodes(node) {
  let count = 0;
  traversalStack.length = 0;
  traversalStack.push(node);
  while (traversalStack.length > 0) {
    const current = traversalStack.pop();
    count++;
    for (const child of current.children) {
      traversalStack.push(child);
    }
  }
  return count;
}
var EPSILON_FLOAT = 0.001;
var MAX_FLEX_LINES = 32;
var _lineCrossSizes = new Float64Array(MAX_FLEX_LINES);
var _lineCrossOffsets = new Float64Array(MAX_FLEX_LINES);
var _lineLengths = new Uint16Array(MAX_FLEX_LINES);
var _lineChildren = Array.from({ length: MAX_FLEX_LINES }, () => []);
var _lineJustifyStarts = new Float64Array(MAX_FLEX_LINES);
var _lineItemSpacings = new Float64Array(MAX_FLEX_LINES);
function growLineArrays(needed) {
  const newSize = Math.max(needed, MAX_FLEX_LINES * 2);
  MAX_FLEX_LINES = newSize;
  _lineCrossSizes = new Float64Array(newSize);
  _lineCrossOffsets = new Float64Array(newSize);
  _lineLengths = new Uint16Array(newSize);
  _lineJustifyStarts = new Float64Array(newSize);
  _lineItemSpacings = new Float64Array(newSize);
  while (_lineChildren.length < newSize) {
    _lineChildren.push([]);
  }
}
function breakIntoLines(parent, relativeCount, mainAxisSize, mainGap, wrap) {
  if (wrap === WRAP_NO_WRAP || Number.isNaN(mainAxisSize) || relativeCount === 0) {
    const lineArr = _lineChildren[0];
    let idx = 0;
    for (const child of parent.children) {
      if (child.flex.relativeIndex >= 0) {
        child.flex.lineIndex = 0;
        lineArr[idx++] = child;
      }
    }
    lineArr.length = idx;
    _lineLengths[0] = relativeCount;
    _lineCrossSizes[0] = 0;
    _lineCrossOffsets[0] = 0;
    return 1;
  }
  let lineIndex = 0;
  let lineMainSize = 0;
  let lineChildCount = 0;
  let lineChildIdx = 0;
  for (const child of parent.children) {
    if (child.flex.relativeIndex < 0)
      continue;
    const flex = child.flex;
    const childMainSize = flex.baseSize + flex.mainMargin;
    const gapIfNotFirst = lineChildCount > 0 ? mainGap : 0;
    if (lineChildCount > 0 && lineMainSize + gapIfNotFirst + childMainSize > mainAxisSize) {
      _lineChildren[lineIndex].length = lineChildIdx;
      _lineLengths[lineIndex] = lineChildCount;
      lineIndex++;
      if (lineIndex >= MAX_FLEX_LINES) {
        growLineArrays(lineIndex + 16);
      }
      lineChildIdx = 0;
      lineMainSize = childMainSize;
      lineChildCount = 1;
    } else {
      lineMainSize += gapIfNotFirst + childMainSize;
      lineChildCount++;
    }
    flex.lineIndex = lineIndex;
    _lineChildren[lineIndex][lineChildIdx++] = child;
  }
  if (lineChildCount > 0) {
    _lineChildren[lineIndex].length = lineChildIdx;
    _lineLengths[lineIndex] = lineChildCount;
    lineIndex++;
  }
  const numLines = lineIndex;
  for (let i = 0;i < numLines; i++) {
    _lineCrossSizes[i] = 0;
    _lineCrossOffsets[i] = 0;
  }
  if (wrap === WRAP_WRAP_REVERSE && numLines > 1) {
    for (let i = 0;i < Math.floor(numLines / 2); i++) {
      const j = numLines - 1 - i;
      const lineI = _lineChildren[i];
      const lineJ = _lineChildren[j];
      const lenI = lineI.length;
      const lenJ = lineJ.length;
      const maxLen = Math.max(lenI, lenJ);
      for (let k = 0;k < maxLen; k++) {
        const hasI = k < lenI;
        const hasJ = k < lenJ;
        const tmpI = hasI ? lineI[k] : null;
        const tmpJ = hasJ ? lineJ[k] : null;
        if (hasJ)
          lineI[k] = tmpJ;
        if (hasI)
          lineJ[k] = tmpI;
      }
      lineI.length = lenJ;
      lineJ.length = lenI;
    }
    for (let i = 0;i < numLines; i++) {
      const lc = _lineChildren[i];
      for (let c = 0;c < lc.length; c++) {
        lc[c].flex.lineIndex = i;
      }
    }
  }
  return numLines;
}
function distributeFlexSpaceForLine(lineChildren, initialFreeSpace) {
  const isGrowing = initialFreeSpace > 0;
  if (initialFreeSpace === 0)
    return;
  const childCount = lineChildren.length;
  if (childCount === 0)
    return;
  if (childCount === 1) {
    const flex = lineChildren[0].flex;
    const canFlex = isGrowing ? flex.flexGrow > 0 : flex.flexShrink > 0;
    if (canFlex) {
      const target = flex.baseSize + initialFreeSpace;
      flex.mainSize = Math.max(flex.minMain, Math.min(flex.maxMain, target));
    }
    return;
  }
  let totalBase = 0;
  for (let i = 0;i < childCount; i++) {
    totalBase += lineChildren[i].flex.baseSize;
  }
  const containerInner = initialFreeSpace + totalBase;
  for (let i = 0;i < childCount; i++) {
    lineChildren[i].flex.frozen = false;
  }
  let freeSpace = initialFreeSpace;
  let iterations = 0;
  const maxIterations = childCount + 1;
  while (iterations++ < maxIterations) {
    let totalFlex = 0;
    for (let i = 0;i < childCount; i++) {
      const flex = lineChildren[i].flex;
      if (flex.frozen)
        continue;
      if (isGrowing) {
        totalFlex += flex.flexGrow;
      } else {
        totalFlex += flex.flexShrink * flex.baseSize;
      }
    }
    if (totalFlex === 0)
      break;
    let effectiveFreeSpace = freeSpace;
    if (isGrowing && totalFlex < 1) {
      effectiveFreeSpace = freeSpace * totalFlex;
    }
    let totalViolation = 0;
    for (let i = 0;i < childCount; i++) {
      const flex = lineChildren[i].flex;
      if (flex.frozen)
        continue;
      const flexFactor = isGrowing ? flex.flexGrow : flex.flexShrink * flex.baseSize;
      const ratio = totalFlex > 0 ? flexFactor / totalFlex : 0;
      const target = flex.baseSize + effectiveFreeSpace * ratio;
      const clamped = Math.max(flex.minMain, Math.min(flex.maxMain, target));
      totalViolation += clamped - target;
      flex.mainSize = clamped;
    }
    let anyFrozen = false;
    if (Math.abs(totalViolation) < EPSILON_FLOAT) {
      for (let i = 0;i < childCount; i++) {
        lineChildren[i].flex.frozen = true;
      }
      break;
    } else if (totalViolation > 0) {
      for (let i = 0;i < childCount; i++) {
        const flex = lineChildren[i].flex;
        if (flex.frozen)
          continue;
        const target = flex.baseSize + (isGrowing ? flex.flexGrow : flex.flexShrink * flex.baseSize) / totalFlex * effectiveFreeSpace;
        if (flex.mainSize > target + EPSILON_FLOAT) {
          flex.frozen = true;
          anyFrozen = true;
        }
      }
    } else {
      for (let i = 0;i < childCount; i++) {
        const flex = lineChildren[i].flex;
        if (flex.frozen)
          continue;
        const flexFactor = isGrowing ? flex.flexGrow : flex.flexShrink * flex.baseSize;
        const target = flex.baseSize + flexFactor / totalFlex * effectiveFreeSpace;
        if (flex.mainSize < target - EPSILON_FLOAT) {
          flex.frozen = true;
          anyFrozen = true;
        }
      }
    }
    if (!anyFrozen)
      break;
    let frozenSpace = 0;
    let unfrozenBase = 0;
    for (let i = 0;i < childCount; i++) {
      const flex = lineChildren[i].flex;
      if (flex.frozen) {
        frozenSpace += flex.mainSize;
      } else {
        unfrozenBase += flex.baseSize;
      }
    }
    freeSpace = containerInner - frozenSpace - unfrozenBase;
  }
}
function propagatePositionDelta(node, deltaX, deltaY) {
  traversalStack.length = 0;
  for (const child of node.children) {
    traversalStack.push(child);
  }
  while (traversalStack.length > 0) {
    const current = traversalStack.pop();
    current.flex.lastOffsetX += deltaX;
    current.flex.lastOffsetY += deltaY;
    for (const child of current.children) {
      traversalStack.push(child);
    }
  }
}
var layoutNodeCalls = 0;
var measureNodeCalls = 0;
var resolveEdgeCalls = 0;
var layoutSizingCalls = 0;
var layoutPositioningCalls = 0;
var layoutCacheHits = 0;
function resetLayoutStats() {
  layoutNodeCalls = 0;
  measureNodeCalls = 0;
  resolveEdgeCalls = 0;
  layoutSizingCalls = 0;
  layoutPositioningCalls = 0;
  layoutCacheHits = 0;
}
function measureNode(node, availableWidth, availableHeight, direction = DIRECTION_LTR) {
  measureNodeCalls++;
  const style = node.style;
  const layout = node.layout;
  if (style.display === DISPLAY_NONE) {
    layout.width = 0;
    layout.height = 0;
    return;
  }
  const marginLeft = resolveEdgeValue(style.margin, 0, style.flexDirection, availableWidth, direction);
  const marginTop = resolveEdgeValue(style.margin, 1, style.flexDirection, availableWidth, direction);
  const marginRight = resolveEdgeValue(style.margin, 2, style.flexDirection, availableWidth, direction);
  const marginBottom = resolveEdgeValue(style.margin, 3, style.flexDirection, availableWidth, direction);
  const paddingLeft = resolveEdgeValue(style.padding, 0, style.flexDirection, availableWidth, direction);
  const paddingTop = resolveEdgeValue(style.padding, 1, style.flexDirection, availableWidth, direction);
  const paddingRight = resolveEdgeValue(style.padding, 2, style.flexDirection, availableWidth, direction);
  const paddingBottom = resolveEdgeValue(style.padding, 3, style.flexDirection, availableWidth, direction);
  const borderLeft = style.border[0];
  const borderTop = style.border[1];
  const borderRight = style.border[2];
  const borderBottom = style.border[3];
  let nodeWidth;
  if (style.width.unit === UNIT_POINT) {
    nodeWidth = style.width.value;
  } else if (style.width.unit === UNIT_PERCENT) {
    nodeWidth = resolveValue(style.width, availableWidth);
  } else if (Number.isNaN(availableWidth)) {
    nodeWidth = NaN;
  } else {
    nodeWidth = availableWidth - marginLeft - marginRight;
  }
  nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
  let nodeHeight;
  if (style.height.unit === UNIT_POINT) {
    nodeHeight = style.height.value;
  } else if (style.height.unit === UNIT_PERCENT) {
    nodeHeight = resolveValue(style.height, availableHeight);
  } else if (Number.isNaN(availableHeight)) {
    nodeHeight = NaN;
  } else {
    nodeHeight = availableHeight - marginTop - marginBottom;
  }
  const aspectRatio = style.aspectRatio;
  if (!Number.isNaN(aspectRatio) && aspectRatio > 0) {
    const widthIsAuto = Number.isNaN(nodeWidth) || style.width.unit === UNIT_AUTO;
    const heightIsAuto = Number.isNaN(nodeHeight) || style.height.unit === UNIT_AUTO;
    if (widthIsAuto && !heightIsAuto && !Number.isNaN(nodeHeight)) {
      nodeWidth = nodeHeight * aspectRatio;
    } else if (heightIsAuto && !widthIsAuto && !Number.isNaN(nodeWidth)) {
      nodeHeight = nodeWidth / aspectRatio;
    }
  }
  nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
  const innerLeft = borderLeft + paddingLeft;
  const innerTop = borderTop + paddingTop;
  const innerRight = borderRight + paddingRight;
  const innerBottom = borderBottom + paddingBottom;
  const minInnerWidth = innerLeft + innerRight;
  const minInnerHeight = innerTop + innerBottom;
  if (!Number.isNaN(nodeWidth) && nodeWidth < minInnerWidth) {
    nodeWidth = minInnerWidth;
  }
  if (!Number.isNaN(nodeHeight) && nodeHeight < minInnerHeight) {
    nodeHeight = minInnerHeight;
  }
  const contentWidth = Number.isNaN(nodeWidth) ? NaN : Math.max(0, nodeWidth - innerLeft - innerRight);
  const contentHeight = Number.isNaN(nodeHeight) ? NaN : Math.max(0, nodeHeight - innerTop - innerBottom);
  if (node.hasMeasureFunc() && node.children.length === 0) {
    const widthIsAuto = style.width.unit === UNIT_AUTO || style.width.unit === UNIT_UNDEFINED || Number.isNaN(nodeWidth);
    const heightIsAuto = style.height.unit === UNIT_AUTO || style.height.unit === UNIT_UNDEFINED || Number.isNaN(nodeHeight);
    const widthMode = widthIsAuto ? MEASURE_MODE_AT_MOST : MEASURE_MODE_EXACTLY;
    const heightMode = heightIsAuto ? MEASURE_MODE_UNDEFINED : MEASURE_MODE_EXACTLY;
    const measureWidth = Number.isNaN(contentWidth) ? Infinity : contentWidth;
    const measureHeight = Number.isNaN(contentHeight) ? Infinity : contentHeight;
    const measured = node.cachedMeasure(measureWidth, widthMode, measureHeight, heightMode);
    if (widthIsAuto) {
      nodeWidth = measured.width + innerLeft + innerRight;
    }
    if (heightIsAuto) {
      nodeHeight = measured.height + innerTop + innerBottom;
    }
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    return;
  }
  if (node.children.length === 0) {
    if (Number.isNaN(nodeWidth)) {
      nodeWidth = innerLeft + innerRight;
    }
    if (Number.isNaN(nodeHeight)) {
      nodeHeight = innerTop + innerBottom;
    }
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    return;
  }
  let relativeChildCount = 0;
  for (const c of node.children) {
    if (c.style.display === DISPLAY_NONE)
      continue;
    if (c.style.positionType !== POSITION_TYPE_ABSOLUTE) {
      relativeChildCount++;
    }
  }
  if (relativeChildCount === 0) {
    if (Number.isNaN(nodeWidth))
      nodeWidth = minInnerWidth;
    if (Number.isNaN(nodeHeight))
      nodeHeight = minInnerHeight;
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    return;
  }
  const isRow = isRowDirection(style.flexDirection);
  const mainAxisSize = isRow ? contentWidth : contentHeight;
  const crossAxisSize = isRow ? contentHeight : contentWidth;
  const mainGap = isRow ? style.gap[0] : style.gap[1];
  let totalMainSize = 0;
  let maxCrossSize = 0;
  let itemCount = 0;
  for (const child of node.children) {
    if (child.style.display === DISPLAY_NONE)
      continue;
    if (child.style.positionType === POSITION_TYPE_ABSOLUTE)
      continue;
    const childStyle = child.style;
    const childMarginMain = isRow ? resolveEdgeValue(childStyle.margin, 0, style.flexDirection, contentWidth, direction) + resolveEdgeValue(childStyle.margin, 2, style.flexDirection, contentWidth, direction) : resolveEdgeValue(childStyle.margin, 1, style.flexDirection, contentWidth, direction) + resolveEdgeValue(childStyle.margin, 3, style.flexDirection, contentWidth, direction);
    const childMarginCross = isRow ? resolveEdgeValue(childStyle.margin, 1, style.flexDirection, contentWidth, direction) + resolveEdgeValue(childStyle.margin, 3, style.flexDirection, contentWidth, direction) : resolveEdgeValue(childStyle.margin, 0, style.flexDirection, contentWidth, direction) + resolveEdgeValue(childStyle.margin, 2, style.flexDirection, contentWidth, direction);
    const childAvailW = isRow ? NaN : crossAxisSize;
    const childAvailH = isRow ? crossAxisSize : NaN;
    const cached = child.getCachedLayout(childAvailW, childAvailH);
    if (cached) {
      layoutCacheHits++;
    } else {
      measureNode(child, childAvailW, childAvailH, direction);
      child.setCachedLayout(childAvailW, childAvailH, child.layout.width, child.layout.height);
    }
    const childMainSize = cached ? isRow ? cached.width : cached.height : isRow ? child.layout.width : child.layout.height;
    const childCrossSize = cached ? isRow ? cached.height : cached.width : isRow ? child.layout.height : child.layout.width;
    totalMainSize += childMainSize + childMarginMain;
    maxCrossSize = Math.max(maxCrossSize, childCrossSize + childMarginCross);
    itemCount++;
  }
  if (itemCount > 1) {
    totalMainSize += mainGap * (itemCount - 1);
  }
  if (Number.isNaN(nodeWidth)) {
    nodeWidth = (isRow ? totalMainSize : maxCrossSize) + innerLeft + innerRight;
  }
  if (Number.isNaN(nodeHeight)) {
    nodeHeight = (isRow ? maxCrossSize : totalMainSize) + innerTop + innerBottom;
  }
  nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
  nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
  layout.width = Math.round(nodeWidth);
  layout.height = Math.round(nodeHeight);
}
function computeLayout(root, availableWidth, availableHeight, direction = DIRECTION_LTR) {
  resetLayoutStats();
  root.resetLayoutCache();
  layoutNode(root, availableWidth, availableHeight, 0, 0, 0, 0, direction);
}
function layoutNode(node, availableWidth, availableHeight, offsetX, offsetY, absX, absY, direction = DIRECTION_LTR) {
  layoutNodeCalls++;
  const isSizingPass = offsetX === 0 && offsetY === 0 && absX === 0 && absY === 0;
  if (isSizingPass && node.children.length > 0) {
    layoutSizingCalls++;
  } else {
    layoutPositioningCalls++;
  }
  log.debug?.("layoutNode called: availW=%d, availH=%d, offsetX=%d, offsetY=%d, absX=%d, absY=%d, children=%d", availableWidth, availableHeight, offsetX, offsetY, absX, absY, node.children.length);
  const style = node.style;
  const layout = node.layout;
  if (style.display === DISPLAY_NONE) {
    layout.left = 0;
    layout.top = 0;
    layout.width = 0;
    layout.height = 0;
    return;
  }
  const flex = node.flex;
  if (flex.layoutValid && !node.isDirty() && Object.is(flex.lastAvailW, availableWidth) && Object.is(flex.lastAvailH, availableHeight) && flex.lastDir === direction) {
    layoutCacheHits++;
    const deltaX = offsetX - flex.lastOffsetX;
    const deltaY = offsetY - flex.lastOffsetY;
    if (deltaX !== 0 || deltaY !== 0) {
      layout.left += deltaX;
      layout.top += deltaY;
      flex.lastOffsetX = offsetX;
      flex.lastOffsetY = offsetY;
      propagatePositionDelta(node, deltaX, deltaY);
    }
    return;
  }
  const marginLeft = resolveEdgeValue(style.margin, 0, style.flexDirection, availableWidth, direction);
  const marginTop = resolveEdgeValue(style.margin, 1, style.flexDirection, availableWidth, direction);
  const marginRight = resolveEdgeValue(style.margin, 2, style.flexDirection, availableWidth, direction);
  const marginBottom = resolveEdgeValue(style.margin, 3, style.flexDirection, availableWidth, direction);
  const paddingLeft = resolveEdgeValue(style.padding, 0, style.flexDirection, availableWidth, direction);
  const paddingTop = resolveEdgeValue(style.padding, 1, style.flexDirection, availableWidth, direction);
  const paddingRight = resolveEdgeValue(style.padding, 2, style.flexDirection, availableWidth, direction);
  const paddingBottom = resolveEdgeValue(style.padding, 3, style.flexDirection, availableWidth, direction);
  const borderLeft = style.border[0];
  const borderTop = style.border[1];
  const borderRight = style.border[2];
  const borderBottom = style.border[3];
  let nodeWidth;
  if (style.width.unit === UNIT_POINT) {
    nodeWidth = style.width.value;
  } else if (style.width.unit === UNIT_PERCENT) {
    nodeWidth = resolveValue(style.width, availableWidth);
  } else if (Number.isNaN(availableWidth)) {
    nodeWidth = NaN;
  } else {
    nodeWidth = availableWidth - marginLeft - marginRight;
  }
  nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
  let nodeHeight;
  if (style.height.unit === UNIT_POINT) {
    nodeHeight = style.height.value;
  } else if (style.height.unit === UNIT_PERCENT) {
    nodeHeight = resolveValue(style.height, availableHeight);
  } else if (Number.isNaN(availableHeight)) {
    nodeHeight = NaN;
  } else {
    nodeHeight = availableHeight - marginTop - marginBottom;
  }
  const aspectRatio = style.aspectRatio;
  if (!Number.isNaN(aspectRatio) && aspectRatio > 0) {
    const widthIsAuto = Number.isNaN(nodeWidth) || style.width.unit === UNIT_AUTO;
    const heightIsAuto = Number.isNaN(nodeHeight) || style.height.unit === UNIT_AUTO;
    if (widthIsAuto && !heightIsAuto && !Number.isNaN(nodeHeight)) {
      nodeWidth = nodeHeight * aspectRatio;
    } else if (heightIsAuto && !widthIsAuto && !Number.isNaN(nodeWidth)) {
      nodeHeight = nodeWidth / aspectRatio;
    }
  }
  nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
  const innerLeft = borderLeft + paddingLeft;
  const innerTop = borderTop + paddingTop;
  const innerRight = borderRight + paddingRight;
  const innerBottom = borderBottom + paddingBottom;
  const minInnerWidth = innerLeft + innerRight;
  const minInnerHeight = innerTop + innerBottom;
  if (!Number.isNaN(nodeWidth) && nodeWidth < minInnerWidth) {
    nodeWidth = minInnerWidth;
  }
  if (!Number.isNaN(nodeHeight) && nodeHeight < minInnerHeight) {
    nodeHeight = minInnerHeight;
  }
  const contentWidth = Number.isNaN(nodeWidth) ? NaN : Math.max(0, nodeWidth - innerLeft - innerRight);
  const contentHeight = Number.isNaN(nodeHeight) ? NaN : Math.max(0, nodeHeight - innerTop - innerBottom);
  let parentPosOffsetX = 0;
  let parentPosOffsetY = 0;
  if (style.positionType === POSITION_TYPE_STATIC || style.positionType === POSITION_TYPE_RELATIVE) {
    const leftPos = style.position[0];
    const topPos = style.position[1];
    const rightPos = style.position[2];
    const bottomPos = style.position[3];
    if (leftPos.unit !== UNIT_UNDEFINED) {
      parentPosOffsetX = resolveValue(leftPos, availableWidth);
    } else if (rightPos.unit !== UNIT_UNDEFINED) {
      parentPosOffsetX = -resolveValue(rightPos, availableWidth);
    }
    if (topPos.unit !== UNIT_UNDEFINED) {
      parentPosOffsetY = resolveValue(topPos, availableHeight);
    } else if (bottomPos.unit !== UNIT_UNDEFINED) {
      parentPosOffsetY = -resolveValue(bottomPos, availableHeight);
    }
  }
  if (node.hasMeasureFunc() && node.children.length === 0) {
    const widthIsAuto = style.width.unit === UNIT_AUTO || style.width.unit === UNIT_UNDEFINED || Number.isNaN(nodeWidth);
    const heightIsAuto = style.height.unit === UNIT_AUTO || style.height.unit === UNIT_UNDEFINED || Number.isNaN(nodeHeight);
    const widthMode = widthIsAuto ? MEASURE_MODE_AT_MOST : MEASURE_MODE_EXACTLY;
    const heightMode = heightIsAuto ? MEASURE_MODE_UNDEFINED : MEASURE_MODE_EXACTLY;
    const measureWidth = Number.isNaN(contentWidth) ? Infinity : contentWidth;
    const measureHeight = Number.isNaN(contentHeight) ? Infinity : contentHeight;
    const measured = node.cachedMeasure(measureWidth, widthMode, measureHeight, heightMode);
    if (widthIsAuto) {
      nodeWidth = measured.width + innerLeft + innerRight;
    }
    if (heightIsAuto) {
      nodeHeight = measured.height + innerTop + innerBottom;
    }
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    layout.left = Math.round(offsetX + marginLeft);
    layout.top = Math.round(offsetY + marginTop);
    return;
  }
  if (node.children.length === 0) {
    if (Number.isNaN(nodeWidth)) {
      nodeWidth = innerLeft + innerRight;
    }
    if (Number.isNaN(nodeHeight)) {
      nodeHeight = innerTop + innerBottom;
    }
    layout.width = Math.round(nodeWidth);
    layout.height = Math.round(nodeHeight);
    layout.left = Math.round(offsetX + marginLeft);
    layout.top = Math.round(offsetY + marginTop);
    return;
  }
  const isRow = isRowDirection(style.flexDirection);
  const isReverse = isReverseDirection(style.flexDirection);
  const isRTL = direction === DIRECTION_RTL;
  const effectiveReverse = isRow ? isRTL !== isReverse : isReverse;
  const mainAxisSize = isRow ? contentWidth : contentHeight;
  const crossAxisSize = isRow ? contentHeight : contentWidth;
  const mainGap = isRow ? style.gap[0] : style.gap[1];
  let totalBaseMain = 0;
  let relativeCount = 0;
  let totalAutoMargins = 0;
  let hasBaselineAlignment = style.alignItems === ALIGN_BASELINE;
  for (const child of node.children) {
    if (child.style.display === DISPLAY_NONE || child.style.positionType === POSITION_TYPE_ABSOLUTE) {
      child.flex.relativeIndex = -1;
      continue;
    }
    child.flex.relativeIndex = relativeCount++;
    const childStyle = child.style;
    const flex2 = child.flex;
    const mainStartIndex = isRow ? effectiveReverse ? 2 : 0 : isReverse ? 3 : 1;
    const mainEndIndex = isRow ? effectiveReverse ? 0 : 2 : isReverse ? 1 : 3;
    flex2.mainStartMarginAuto = isEdgeAuto(childStyle.margin, mainStartIndex, style.flexDirection, direction);
    flex2.mainEndMarginAuto = isEdgeAuto(childStyle.margin, mainEndIndex, style.flexDirection, direction);
    flex2.marginL = resolveEdgeValue(childStyle.margin, 0, style.flexDirection, contentWidth, direction);
    flex2.marginT = resolveEdgeValue(childStyle.margin, 1, style.flexDirection, contentWidth, direction);
    flex2.marginR = resolveEdgeValue(childStyle.margin, 2, style.flexDirection, contentWidth, direction);
    flex2.marginB = resolveEdgeValue(childStyle.margin, 3, style.flexDirection, contentWidth, direction);
    flex2.mainStartMarginValue = flex2.mainStartMarginAuto ? 0 : isRow ? effectiveReverse ? flex2.marginR : flex2.marginL : isReverse ? flex2.marginB : flex2.marginT;
    flex2.mainEndMarginValue = flex2.mainEndMarginAuto ? 0 : isRow ? effectiveReverse ? flex2.marginL : flex2.marginR : isReverse ? flex2.marginT : flex2.marginB;
    flex2.mainMargin = flex2.mainStartMarginValue + flex2.mainEndMarginValue;
    let baseSize = 0;
    if (childStyle.flexBasis.unit === UNIT_POINT) {
      baseSize = childStyle.flexBasis.value;
    } else if (childStyle.flexBasis.unit === UNIT_PERCENT) {
      baseSize = Number.isNaN(mainAxisSize) ? 0 : mainAxisSize * (childStyle.flexBasis.value / 100);
    } else {
      const sizeVal = isRow ? childStyle.width : childStyle.height;
      if (sizeVal.unit === UNIT_POINT) {
        baseSize = sizeVal.value;
      } else if (sizeVal.unit === UNIT_PERCENT) {
        baseSize = Number.isNaN(mainAxisSize) ? 0 : mainAxisSize * (sizeVal.value / 100);
      } else if (child.hasMeasureFunc() && childStyle.flexGrow === 0) {
        const crossMargin = isRow ? flex2.marginT + flex2.marginB : flex2.marginL + flex2.marginR;
        const availCross = crossAxisSize - crossMargin;
        const measured = child.cachedMeasure(mainAxisSize, MEASURE_MODE_AT_MOST, availCross, MEASURE_MODE_UNDEFINED);
        baseSize = isRow ? measured.width : measured.height;
      } else if (child.children.length > 0) {
        const sizingW = isRow ? NaN : crossAxisSize;
        const sizingH = isRow ? crossAxisSize : NaN;
        const cached = child.getCachedLayout(sizingW, sizingH);
        if (cached) {
          layoutCacheHits++;
          baseSize = isRow ? cached.width : cached.height;
        } else {
          measureNode(child, sizingW, sizingH);
          baseSize = isRow ? child.layout.width : child.layout.height;
          child.setCachedLayout(sizingW, sizingH, child.layout.width, child.layout.height);
        }
      } else {
        const parentWidth = isRow ? mainAxisSize : crossAxisSize;
        const childPadding = isRow ? resolveEdgeValue(childStyle.padding, 0, childStyle.flexDirection, parentWidth, direction) + resolveEdgeValue(childStyle.padding, 2, childStyle.flexDirection, parentWidth, direction) : resolveEdgeValue(childStyle.padding, 1, childStyle.flexDirection, parentWidth, direction) + resolveEdgeValue(childStyle.padding, 3, childStyle.flexDirection, parentWidth, direction);
        const childBorder = isRow ? childStyle.border[0] + childStyle.border[2] : childStyle.border[1] + childStyle.border[3];
        baseSize = childPadding + childBorder;
      }
    }
    const minVal = isRow ? childStyle.minWidth : childStyle.minHeight;
    const maxVal = isRow ? childStyle.maxWidth : childStyle.maxHeight;
    flex2.minMain = minVal.unit !== UNIT_UNDEFINED ? resolveValue(minVal, mainAxisSize) : 0;
    flex2.maxMain = maxVal.unit !== UNIT_UNDEFINED ? resolveValue(maxVal, mainAxisSize) : Infinity;
    flex2.flexGrow = childStyle.flexGrow;
    flex2.flexShrink = childStyle.flexShrink;
    flex2.baseSize = baseSize;
    flex2.mainSize = baseSize;
    flex2.frozen = false;
    totalBaseMain += baseSize + flex2.mainMargin;
    if (flex2.mainStartMarginAuto)
      totalAutoMargins++;
    if (flex2.mainEndMarginAuto)
      totalAutoMargins++;
    if (!hasBaselineAlignment && childStyle.alignSelf === ALIGN_BASELINE) {
      hasBaselineAlignment = true;
    }
  }
  log.debug?.("layoutNode: node.children=%d, relativeCount=%d", node.children.length, relativeCount);
  if (relativeCount > 0) {
    const numLines = breakIntoLines(node, relativeCount, mainAxisSize, mainGap, style.flexWrap);
    const crossGap = isRow ? style.gap[1] : style.gap[0];
    for (let lineIdx = 0;lineIdx < numLines; lineIdx++) {
      const lineChildren = _lineChildren[lineIdx];
      const lineLength = lineChildren.length;
      if (lineLength === 0)
        continue;
      let lineTotalBaseMain = 0;
      for (let i = 0;i < lineLength; i++) {
        const c = lineChildren[i];
        lineTotalBaseMain += c.flex.baseSize + c.flex.mainMargin;
      }
      const lineTotalGaps = lineLength > 1 ? mainGap * (lineLength - 1) : 0;
      let effectiveMainSize = mainAxisSize;
      if (Number.isNaN(mainAxisSize)) {
        const maxMainVal = isRow ? style.maxWidth : style.maxHeight;
        if (maxMainVal.unit !== UNIT_UNDEFINED) {
          const maxMain = resolveValue(maxMainVal, isRow ? availableWidth : availableHeight);
          if (!Number.isNaN(maxMain) && lineTotalBaseMain + lineTotalGaps > maxMain) {
            const innerMain = isRow ? innerLeft + innerRight : innerTop + innerBottom;
            effectiveMainSize = maxMain - innerMain;
          }
        }
      }
      if (!Number.isNaN(effectiveMainSize)) {
        const adjustedFreeSpace = effectiveMainSize - lineTotalBaseMain - lineTotalGaps;
        distributeFlexSpaceForLine(lineChildren, adjustedFreeSpace);
      }
      for (let i = 0;i < lineLength; i++) {
        const flex2 = lineChildren[i].flex;
        flex2.mainSize = Math.max(flex2.minMain, Math.min(flex2.maxMain, flex2.mainSize));
      }
    }
    for (let lineIdx = 0;lineIdx < numLines; lineIdx++) {
      const lineChildren = _lineChildren[lineIdx];
      const lineLength = lineChildren.length;
      if (lineLength === 0) {
        _lineJustifyStarts[lineIdx] = 0;
        _lineItemSpacings[lineIdx] = mainGap;
        continue;
      }
      let lineUsedMain = 0;
      let lineAutoMargins = 0;
      for (let i = 0;i < lineLength; i++) {
        const c = lineChildren[i];
        lineUsedMain += c.flex.mainSize + c.flex.mainMargin;
        if (c.flex.mainStartMarginAuto)
          lineAutoMargins++;
        if (c.flex.mainEndMarginAuto)
          lineAutoMargins++;
      }
      const lineGaps = lineLength > 1 ? mainGap * (lineLength - 1) : 0;
      lineUsedMain += lineGaps;
      const lineRemainingSpace = Number.isNaN(mainAxisSize) ? 0 : mainAxisSize - lineUsedMain;
      const lineHasAutoMargins = lineAutoMargins > 0;
      if (lineHasAutoMargins) {
        const positiveRemaining = Math.max(0, lineRemainingSpace);
        const autoMarginValue = positiveRemaining / lineAutoMargins;
        for (let i = 0;i < lineLength; i++) {
          const child = lineChildren[i];
          if (child.flex.mainStartMarginAuto) {
            child.flex.mainStartMarginValue = autoMarginValue;
          }
          if (child.flex.mainEndMarginAuto) {
            child.flex.mainEndMarginValue = autoMarginValue;
          }
        }
      }
      let lineStartOffset = 0;
      let lineItemSpacing = mainGap;
      if (!lineHasAutoMargins) {
        switch (style.justifyContent) {
          case JUSTIFY_FLEX_END:
            lineStartOffset = lineRemainingSpace;
            break;
          case JUSTIFY_CENTER:
            lineStartOffset = lineRemainingSpace / 2;
            break;
          case JUSTIFY_SPACE_BETWEEN:
            if (lineLength > 1 && lineRemainingSpace > 0) {
              lineItemSpacing = mainGap + lineRemainingSpace / (lineLength - 1);
            }
            break;
          case JUSTIFY_SPACE_AROUND:
            if (lineLength > 0 && lineRemainingSpace > 0) {
              const extraSpace = lineRemainingSpace / lineLength;
              lineStartOffset = extraSpace / 2;
              lineItemSpacing = mainGap + extraSpace;
            }
            break;
          case JUSTIFY_SPACE_EVENLY:
            if (lineLength > 0 && lineRemainingSpace > 0) {
              const extraSpace = lineRemainingSpace / (lineLength + 1);
              lineStartOffset = extraSpace;
              lineItemSpacing = mainGap + extraSpace;
            }
            break;
        }
      }
      _lineJustifyStarts[lineIdx] = lineStartOffset;
      _lineItemSpacings[lineIdx] = lineItemSpacing;
    }
    const startOffset = _lineJustifyStarts[0];
    const itemSpacing = _lineItemSpacings[0];
    let maxBaseline = 0;
    if (hasBaselineAlignment && isRow) {
      for (const child of node.children) {
        if (child.flex.relativeIndex < 0)
          continue;
        const childStyle = child.style;
        const topMargin = child.flex.marginT;
        let childWidth;
        let childHeight;
        const widthDim = childStyle.width;
        const heightDim = childStyle.height;
        if (widthDim.unit === UNIT_POINT) {
          childWidth = widthDim.value;
        } else if (widthDim.unit === UNIT_PERCENT && !Number.isNaN(mainAxisSize)) {
          childWidth = mainAxisSize * (widthDim.value / 100);
        } else {
          childWidth = child.flex.mainSize;
        }
        if (heightDim.unit === UNIT_POINT) {
          childHeight = heightDim.value;
        } else if (heightDim.unit === UNIT_PERCENT && !Number.isNaN(crossAxisSize)) {
          childHeight = crossAxisSize * (heightDim.value / 100);
        } else {
          const cached = child.getCachedLayout(child.flex.mainSize, NaN);
          if (cached) {
            layoutCacheHits++;
            childWidth = cached.width;
            childHeight = cached.height;
          } else {
            measureNode(child, child.flex.mainSize, NaN);
            childWidth = child.layout.width;
            childHeight = child.layout.height;
            child.setCachedLayout(child.flex.mainSize, NaN, child.layout.width, child.layout.height);
          }
        }
        if (child.baselineFunc !== null) {
          child.flex.baseline = topMargin + child.baselineFunc(childWidth, childHeight);
        } else {
          child.flex.baseline = topMargin + childHeight;
        }
        maxBaseline = Math.max(maxBaseline, child.flex.baseline);
      }
    }
    let cumulativeCrossOffset = 0;
    const isWrapReverse = style.flexWrap === WRAP_WRAP_REVERSE;
    for (let lineIdx = 0;lineIdx < numLines; lineIdx++) {
      _lineCrossOffsets[lineIdx] = cumulativeCrossOffset;
      const lineChildren = _lineChildren[lineIdx];
      const lineLength = lineChildren.length;
      let maxLineCross = 0;
      for (let i = 0;i < lineLength; i++) {
        const child = lineChildren[i];
        const childStyle = child.style;
        const crossDim = isRow ? childStyle.height : childStyle.width;
        const crossMarginStart = isRow ? child.flex.marginT : child.flex.marginL;
        const crossMarginEnd = isRow ? child.flex.marginB : child.flex.marginR;
        let childCross = 0;
        if (crossDim.unit === UNIT_POINT) {
          childCross = crossDim.value;
        } else if (crossDim.unit === UNIT_PERCENT && !Number.isNaN(crossAxisSize)) {
          childCross = crossAxisSize * (crossDim.value / 100);
        } else {
          childCross = 0;
        }
        maxLineCross = Math.max(maxLineCross, childCross + crossMarginStart + crossMarginEnd);
      }
      const fallbackCross = numLines > 0 && !Number.isNaN(crossAxisSize) ? crossAxisSize / numLines : 0;
      const lineCrossSize = maxLineCross > 0 ? maxLineCross : fallbackCross;
      _lineCrossSizes[lineIdx] = lineCrossSize;
      cumulativeCrossOffset += lineCrossSize + crossGap;
    }
    if (!Number.isNaN(crossAxisSize) && numLines > 0) {
      const totalLineCrossSize = cumulativeCrossOffset - crossGap;
      const freeSpace = crossAxisSize - totalLineCrossSize;
      const alignContent = style.alignContent;
      if (freeSpace > 0 || alignContent === ALIGN_STRETCH) {
        switch (alignContent) {
          case ALIGN_FLEX_END:
            for (let i = 0;i < numLines; i++) {
              _lineCrossOffsets[i] += freeSpace;
            }
            break;
          case ALIGN_CENTER:
            const centerOffset = freeSpace / 2;
            for (let i = 0;i < numLines; i++) {
              _lineCrossOffsets[i] += centerOffset;
            }
            break;
          case ALIGN_SPACE_BETWEEN:
            if (numLines > 1) {
              const gap = freeSpace / (numLines - 1);
              for (let i = 1;i < numLines; i++) {
                _lineCrossOffsets[i] += gap * i;
              }
            }
            break;
          case ALIGN_SPACE_AROUND:
            const halfGap = freeSpace / (numLines * 2);
            for (let i = 0;i < numLines; i++) {
              _lineCrossOffsets[i] += halfGap + halfGap * 2 * i;
            }
            break;
          case ALIGN_STRETCH:
            if (freeSpace > 0 && numLines > 0) {
              const extraPerLine = freeSpace / numLines;
              for (let i = 0;i < numLines; i++) {
                _lineCrossSizes[i] += extraPerLine;
                if (i > 0) {
                  _lineCrossOffsets[i] = _lineCrossOffsets[i - 1] + _lineCrossSizes[i - 1] + crossGap;
                }
              }
            }
            break;
        }
      }
      if (isWrapReverse) {
        let totalLineCrossSize2 = 0;
        for (let i = 0;i < numLines; i++) {
          totalLineCrossSize2 += _lineCrossSizes[i];
        }
        totalLineCrossSize2 += crossGap * (numLines - 1);
        const crossStartOffset = crossAxisSize - totalLineCrossSize2;
        for (let i = 0;i < numLines; i++) {
          _lineCrossOffsets[i] += crossStartOffset;
        }
      }
    }
    let effectiveMainAxisSize = mainAxisSize;
    const mainIsAuto = isRow ? style.width.unit !== UNIT_POINT && style.width.unit !== UNIT_PERCENT : style.height.unit !== UNIT_POINT && style.height.unit !== UNIT_PERCENT;
    const totalGaps = relativeCount > 1 ? mainGap * (relativeCount - 1) : 0;
    if (effectiveReverse && mainIsAuto) {
      let totalContent = 0;
      for (const child of node.children) {
        if (child.flex.relativeIndex < 0)
          continue;
        totalContent += child.flex.mainSize + child.flex.mainStartMarginValue + child.flex.mainEndMarginValue;
      }
      totalContent += totalGaps;
      effectiveMainAxisSize = totalContent;
    }
    let mainPos = effectiveReverse ? effectiveMainAxisSize - startOffset : startOffset;
    let currentLineIdx = -1;
    let relIdx = 0;
    let lineChildIdx = 0;
    let currentLineLength = 0;
    let currentItemSpacing = itemSpacing;
    log.debug?.("positioning children: isRow=%s, startOffset=%d, relativeCount=%d, effectiveReverse=%s, numLines=%d", isRow, startOffset, relativeCount, effectiveReverse, numLines);
    for (const child of node.children) {
      if (child.flex.relativeIndex < 0)
        continue;
      const flex2 = child.flex;
      const childStyle = child.style;
      const childLineIdx = flex2.lineIndex;
      if (childLineIdx !== currentLineIdx) {
        currentLineIdx = childLineIdx;
        lineChildIdx = 0;
        currentLineLength = _lineChildren[childLineIdx].length;
        const lineOffset = _lineJustifyStarts[childLineIdx];
        currentItemSpacing = _lineItemSpacings[childLineIdx];
        mainPos = effectiveReverse ? effectiveMainAxisSize - lineOffset : lineOffset;
      }
      const lineCrossOffset = childLineIdx < MAX_FLEX_LINES ? _lineCrossOffsets[childLineIdx] : 0;
      let childMarginLeft;
      let childMarginTop;
      let childMarginRight;
      let childMarginBottom;
      if (isRow) {
        childMarginLeft = flex2.mainStartMarginAuto && !effectiveReverse ? flex2.mainStartMarginValue : flex2.mainEndMarginAuto && effectiveReverse ? flex2.mainEndMarginValue : flex2.marginL;
        childMarginRight = flex2.mainEndMarginAuto && !effectiveReverse ? flex2.mainEndMarginValue : flex2.mainStartMarginAuto && effectiveReverse ? flex2.mainStartMarginValue : flex2.marginR;
        childMarginTop = flex2.marginT;
        childMarginBottom = flex2.marginB;
      } else {
        childMarginTop = flex2.mainStartMarginAuto && !isReverse ? flex2.mainStartMarginValue : flex2.mainEndMarginAuto && isReverse ? flex2.mainEndMarginValue : flex2.marginT;
        childMarginBottom = flex2.mainEndMarginAuto && !isReverse ? flex2.mainEndMarginValue : flex2.mainStartMarginAuto && isReverse ? flex2.mainStartMarginValue : flex2.marginB;
        childMarginLeft = flex2.marginL;
        childMarginRight = flex2.marginR;
      }
      const childMainSize = flex2.mainSize;
      let alignment = style.alignItems;
      if (childStyle.alignSelf !== ALIGN_AUTO) {
        alignment = childStyle.alignSelf;
      }
      let childCrossSize;
      const crossDim = isRow ? childStyle.height : childStyle.width;
      const crossMargin = isRow ? childMarginTop + childMarginBottom : childMarginLeft + childMarginRight;
      const parentCrossDim = isRow ? style.height : style.width;
      const parentHasDefiniteCrossStyle = parentCrossDim.unit === UNIT_POINT || parentCrossDim.unit === UNIT_PERCENT;
      const parentHasDefiniteCross = parentHasDefiniteCrossStyle || !Number.isNaN(crossAxisSize);
      if (crossDim.unit === UNIT_POINT) {
        childCrossSize = crossDim.value;
      } else if (crossDim.unit === UNIT_PERCENT) {
        childCrossSize = resolveValue(crossDim, crossAxisSize);
      } else if (parentHasDefiniteCross && alignment === ALIGN_STRETCH) {
        childCrossSize = crossAxisSize - crossMargin;
      } else {
        childCrossSize = NaN;
      }
      const crossMinVal = isRow ? childStyle.minHeight : childStyle.minWidth;
      const crossMaxVal = isRow ? childStyle.maxHeight : childStyle.maxWidth;
      const crossMin = crossMinVal.unit !== UNIT_UNDEFINED ? resolveValue(crossMinVal, crossAxisSize) : 0;
      const crossMax = crossMaxVal.unit !== UNIT_UNDEFINED ? resolveValue(crossMaxVal, crossAxisSize) : Infinity;
      if (Number.isNaN(childCrossSize)) {
        if (crossMin > 0) {
          childCrossSize = crossMin;
        }
      } else {
        childCrossSize = Math.max(crossMin, Math.min(crossMax, childCrossSize));
      }
      const mainDim = isRow ? childStyle.width : childStyle.height;
      const mainIsAuto2 = mainDim.unit === UNIT_AUTO || mainDim.unit === UNIT_UNDEFINED;
      const hasFlexGrow = flex2.flexGrow > 0;
      const parentMainDim = isRow ? style.width : style.height;
      const parentHasDefiniteMain = parentMainDim.unit === UNIT_POINT || parentMainDim.unit === UNIT_PERCENT;
      let effectiveMainSize;
      if (hasFlexGrow) {
        effectiveMainSize = childMainSize;
      } else if (mainIsAuto2) {
        effectiveMainSize = childMainSize;
      } else {
        effectiveMainSize = childMainSize;
      }
      let childWidth = isRow ? effectiveMainSize : childCrossSize;
      let childHeight = isRow ? childCrossSize : effectiveMainSize;
      const shouldMeasure = child.hasMeasureFunc() && child.children.length === 0 && !hasFlexGrow;
      if (shouldMeasure) {
        const widthAuto = childStyle.width.unit === UNIT_AUTO || childStyle.width.unit === UNIT_UNDEFINED;
        const heightAuto = childStyle.height.unit === UNIT_AUTO || childStyle.height.unit === UNIT_UNDEFINED;
        if (widthAuto || heightAuto) {
          const widthMode = widthAuto ? MEASURE_MODE_AT_MOST : MEASURE_MODE_EXACTLY;
          const heightMode = heightAuto ? MEASURE_MODE_UNDEFINED : MEASURE_MODE_EXACTLY;
          const rawAvailW = widthAuto ? isRow ? mainAxisSize - mainPos : crossAxisSize - crossMargin : childStyle.width.value;
          const rawAvailH = heightAuto ? isRow ? crossAxisSize - crossMargin : mainAxisSize - mainPos : childStyle.height.value;
          const availW = Number.isNaN(rawAvailW) ? Infinity : rawAvailW;
          const availH = Number.isNaN(rawAvailH) ? Infinity : rawAvailH;
          const measured = child.cachedMeasure(availW, widthMode, availH, heightMode);
          if (widthAuto) {
            childWidth = measured.width;
          }
          if (heightAuto) {
            childHeight = measured.height;
          }
        }
      }
      let childX;
      let childY;
      if (effectiveReverse) {
        if (isRow) {
          childX = mainPos - childMainSize - childMarginRight;
          childY = lineCrossOffset + childMarginTop;
        } else {
          childX = lineCrossOffset + childMarginLeft;
          childY = mainPos - childMainSize - childMarginTop;
        }
      } else {
        childX = isRow ? mainPos + childMarginLeft : lineCrossOffset + childMarginLeft;
        childY = isRow ? lineCrossOffset + childMarginTop : mainPos + childMarginTop;
      }
      const fractionalLeft = innerLeft + childX;
      const fractionalTop = innerTop + childY;
      let posOffsetX = 0;
      let posOffsetY = 0;
      if (childStyle.positionType === POSITION_TYPE_RELATIVE || childStyle.positionType === POSITION_TYPE_STATIC) {
        const relLeftPos = childStyle.position[0];
        const relTopPos = childStyle.position[1];
        const relRightPos = childStyle.position[2];
        const relBottomPos = childStyle.position[3];
        if (relLeftPos.unit !== UNIT_UNDEFINED) {
          posOffsetX = resolveValue(relLeftPos, contentWidth);
        } else if (relRightPos.unit !== UNIT_UNDEFINED) {
          posOffsetX = -resolveValue(relRightPos, contentWidth);
        }
        if (relTopPos.unit !== UNIT_UNDEFINED) {
          posOffsetY = resolveValue(relTopPos, contentHeight);
        } else if (relBottomPos.unit !== UNIT_UNDEFINED) {
          posOffsetY = -resolveValue(relBottomPos, contentHeight);
        }
      }
      const absChildLeft = absX + marginLeft + parentPosOffsetX + fractionalLeft + posOffsetX;
      const absChildTop = absY + marginTop + parentPosOffsetY + fractionalTop + posOffsetY;
      let roundedAbsMainStart;
      let roundedAbsMainEnd;
      let edgeBasedMainSize;
      const useEdgeBasedRounding = childMainSize > 0;
      const childPaddingL = resolveEdgeValue(childStyle.padding, 0, childStyle.flexDirection, contentWidth, direction);
      const childPaddingT = resolveEdgeValue(childStyle.padding, 1, childStyle.flexDirection, contentWidth, direction);
      const childPaddingR = resolveEdgeValue(childStyle.padding, 2, childStyle.flexDirection, contentWidth, direction);
      const childPaddingB = resolveEdgeValue(childStyle.padding, 3, childStyle.flexDirection, contentWidth, direction);
      const childBorderL = childStyle.border[0];
      const childBorderT = childStyle.border[1];
      const childBorderR = childStyle.border[2];
      const childBorderB = childStyle.border[3];
      const childMinW = childPaddingL + childPaddingR + childBorderL + childBorderR;
      const childMinH = childPaddingT + childPaddingB + childBorderT + childBorderB;
      const childMinMain = isRow ? childMinW : childMinH;
      const constrainedMainSize = Math.max(childMainSize, childMinMain);
      if (useEdgeBasedRounding) {
        if (isRow) {
          roundedAbsMainStart = Math.round(absChildLeft);
          roundedAbsMainEnd = Math.round(absChildLeft + constrainedMainSize);
          edgeBasedMainSize = roundedAbsMainEnd - roundedAbsMainStart;
        } else {
          roundedAbsMainStart = Math.round(absChildTop);
          roundedAbsMainEnd = Math.round(absChildTop + constrainedMainSize);
          edgeBasedMainSize = roundedAbsMainEnd - roundedAbsMainStart;
        }
      } else {
        roundedAbsMainStart = isRow ? Math.round(absChildLeft) : Math.round(absChildTop);
        edgeBasedMainSize = childMinMain;
      }
      const childLeft = Math.round(fractionalLeft + posOffsetX);
      const childTop = Math.round(fractionalTop + posOffsetY);
      const crossDimForLayoutCall = isRow ? childStyle.height : childStyle.width;
      const crossIsAutoForLayoutCall = crossDimForLayoutCall.unit === UNIT_AUTO || crossDimForLayoutCall.unit === UNIT_UNDEFINED;
      const mainDimForLayoutCall = isRow ? childStyle.width : childStyle.height;
      const mainIsPercentForLayoutCall = mainDimForLayoutCall.unit === UNIT_PERCENT;
      const crossIsPercentForLayoutCall = crossDimForLayoutCall.unit === UNIT_PERCENT;
      const passWidthToChild = isRow && mainIsAuto2 && !hasFlexGrow ? NaN : !isRow && crossIsAutoForLayoutCall && !parentHasDefiniteCross ? NaN : isRow && mainIsPercentForLayoutCall ? mainAxisSize : !isRow && crossIsPercentForLayoutCall ? crossAxisSize : childWidth;
      const passHeightToChild = !isRow && mainIsAuto2 && !hasFlexGrow ? NaN : isRow && crossIsAutoForLayoutCall && !parentHasDefiniteCross ? NaN : !isRow && mainIsPercentForLayoutCall ? mainAxisSize : isRow && crossIsPercentForLayoutCall ? crossAxisSize : childHeight;
      const childAbsX = absChildLeft - childMarginLeft;
      const childAbsY = absChildTop - childMarginTop;
      layoutNode(child, passWidthToChild, passHeightToChild, childLeft, childTop, childAbsX, childAbsY, direction);
      if (childWidth < childMinW)
        childWidth = childMinW;
      if (childHeight < childMinH)
        childHeight = childMinH;
      const hasMeasure = child.hasMeasureFunc() && child.children.length === 0;
      const parentDidFlexDistribution = !Number.isNaN(effectiveMainSize);
      if (!mainIsAuto2 || hasFlexGrow || hasMeasure || parentDidFlexDistribution) {
        if (isRow) {
          child.layout.width = edgeBasedMainSize;
        } else {
          child.layout.height = edgeBasedMainSize;
        }
      }
      const crossDimForCheck = isRow ? childStyle.height : childStyle.width;
      const crossIsAuto = crossDimForCheck.unit === UNIT_AUTO || crossDimForCheck.unit === UNIT_UNDEFINED;
      const parentCrossIsAuto = !parentHasDefiniteCross;
      const hasCrossMinMax = crossMinVal.unit !== UNIT_UNDEFINED || crossMaxVal.unit !== UNIT_UNDEFINED;
      const shouldOverrideCross = !crossIsAuto || !parentCrossIsAuto && alignment === ALIGN_STRETCH || hasCrossMinMax && !Number.isNaN(childCrossSize);
      if (shouldOverrideCross) {
        if (isRow) {
          child.layout.height = Math.round(childHeight);
        } else {
          child.layout.width = Math.round(childWidth);
        }
      }
      child.layout.left = childLeft;
      child.layout.top = childTop;
      childWidth = child.layout.width;
      childHeight = child.layout.height;
      const finalCrossSize = isRow ? child.layout.height : child.layout.width;
      let crossOffset = 0;
      const crossStartIndex = isRow ? 1 : 0;
      const crossEndIndex = isRow ? 3 : 2;
      const hasAutoStartMargin = isEdgeAuto(childStyle.margin, crossStartIndex, style.flexDirection, direction);
      const hasAutoEndMargin = isEdgeAuto(childStyle.margin, crossEndIndex, style.flexDirection, direction);
      const availableCrossSpace = crossAxisSize - finalCrossSize - crossMargin;
      if (hasAutoStartMargin && hasAutoEndMargin) {
        crossOffset = Math.max(0, availableCrossSpace) / 2;
      } else if (hasAutoStartMargin) {
        crossOffset = Math.max(0, availableCrossSpace);
      } else if (hasAutoEndMargin) {
        crossOffset = 0;
      } else {
        switch (alignment) {
          case ALIGN_FLEX_END:
            crossOffset = availableCrossSpace;
            break;
          case ALIGN_CENTER:
            crossOffset = availableCrossSpace / 2;
            break;
          case ALIGN_BASELINE:
            if (isRow && hasBaselineAlignment) {
              crossOffset = maxBaseline - child.flex.baseline;
            }
            break;
        }
      }
      if (crossOffset > 0) {
        if (isRow) {
          child.layout.top += Math.round(crossOffset);
        } else {
          child.layout.left += Math.round(crossOffset);
        }
      }
      const fractionalMainSize = constrainedMainSize;
      const totalMainMargin = flex2.mainStartMarginValue + flex2.mainEndMarginValue;
      log.debug?.("  child %d: mainPos=%d → top=%d (fractionalMainSize=%d, totalMainMargin=%d)", relIdx, mainPos, child.layout.top, fractionalMainSize, totalMainMargin);
      if (effectiveReverse) {
        mainPos -= fractionalMainSize + totalMainMargin;
        if (lineChildIdx < currentLineLength - 1) {
          mainPos -= currentItemSpacing;
        }
      } else {
        mainPos += fractionalMainSize + totalMainMargin;
        if (lineChildIdx < currentLineLength - 1) {
          mainPos += currentItemSpacing;
        }
      }
      relIdx++;
      lineChildIdx++;
    }
    let actualUsedMain = 0;
    for (const child of node.children) {
      if (child.flex.relativeIndex < 0)
        continue;
      const childMainSize = isRow ? child.layout.width : child.layout.height;
      const totalMainMargin = child.flex.mainStartMarginValue + child.flex.mainEndMarginValue;
      actualUsedMain += childMainSize + totalMainMargin;
    }
    actualUsedMain += totalGaps;
    if (isRow && style.width.unit !== UNIT_POINT && style.width.unit !== UNIT_PERCENT) {
      nodeWidth = actualUsedMain + innerLeft + innerRight;
    }
    if (!isRow && style.height.unit !== UNIT_POINT && style.height.unit !== UNIT_PERCENT) {
      nodeHeight = actualUsedMain + innerTop + innerBottom;
    }
    let maxCrossSize = 0;
    for (const child of node.children) {
      if (child.flex.relativeIndex < 0)
        continue;
      const childCross = isRow ? child.layout.height : child.layout.width;
      const childMargin = isRow ? resolveEdgeValue(child.style.margin, 1, style.flexDirection, contentWidth, direction) + resolveEdgeValue(child.style.margin, 3, style.flexDirection, contentWidth, direction) : resolveEdgeValue(child.style.margin, 0, style.flexDirection, contentWidth, direction) + resolveEdgeValue(child.style.margin, 2, style.flexDirection, contentWidth, direction);
      maxCrossSize = Math.max(maxCrossSize, childCross + childMargin);
    }
    if (isRow && style.height.unit !== UNIT_POINT && style.height.unit !== UNIT_PERCENT && Number.isNaN(availableHeight)) {
      nodeHeight = maxCrossSize + innerTop + innerBottom;
    }
    if (!isRow && style.width.unit !== UNIT_POINT && style.width.unit !== UNIT_PERCENT && Number.isNaN(availableWidth)) {
      nodeWidth = maxCrossSize + innerLeft + innerRight;
    }
  }
  nodeWidth = applyMinMax(nodeWidth, style.minWidth, style.maxWidth, availableWidth);
  nodeHeight = applyMinMax(nodeHeight, style.minHeight, style.maxHeight, availableHeight);
  if (!Number.isNaN(nodeWidth) && nodeWidth < minInnerWidth) {
    nodeWidth = minInnerWidth;
  }
  if (!Number.isNaN(nodeHeight) && nodeHeight < minInnerHeight) {
    nodeHeight = minInnerHeight;
  }
  const absNodeLeft = absX + marginLeft + parentPosOffsetX;
  const absNodeTop = absY + marginTop + parentPosOffsetY;
  const absNodeRight = absNodeLeft + nodeWidth;
  const absNodeBottom = absNodeTop + nodeHeight;
  const roundedAbsLeft = Math.round(absNodeLeft);
  const roundedAbsTop = Math.round(absNodeTop);
  const roundedAbsRight = Math.round(absNodeRight);
  const roundedAbsBottom = Math.round(absNodeBottom);
  layout.width = roundedAbsRight - roundedAbsLeft;
  layout.height = roundedAbsBottom - roundedAbsTop;
  const roundedAbsParentLeft = Math.round(absX);
  const roundedAbsParentTop = Math.round(absY);
  layout.left = roundedAbsLeft - roundedAbsParentLeft;
  layout.top = roundedAbsTop - roundedAbsParentTop;
  const absInnerLeft = borderLeft;
  const absInnerTop = borderTop;
  const absInnerRight = borderRight;
  const absInnerBottom = borderBottom;
  const absPaddingBoxW = nodeWidth - absInnerLeft - absInnerRight;
  const absPaddingBoxH = nodeHeight - absInnerTop - absInnerBottom;
  const absContentBoxW = absPaddingBoxW - paddingLeft - paddingRight;
  const absContentBoxH = absPaddingBoxH - paddingTop - paddingBottom;
  for (const child of node.children) {
    if (child.style.display === DISPLAY_NONE)
      continue;
    if (child.style.positionType !== POSITION_TYPE_ABSOLUTE)
      continue;
    const childStyle = child.style;
    const childMarginLeft = resolveEdgeValue(childStyle.margin, 0, style.flexDirection, nodeWidth, direction);
    const childMarginTop = resolveEdgeValue(childStyle.margin, 1, style.flexDirection, nodeWidth, direction);
    const childMarginRight = resolveEdgeValue(childStyle.margin, 2, style.flexDirection, nodeWidth, direction);
    const childMarginBottom = resolveEdgeValue(childStyle.margin, 3, style.flexDirection, nodeWidth, direction);
    const hasAutoMarginLeft = isEdgeAuto(childStyle.margin, 0, style.flexDirection, direction);
    const hasAutoMarginRight = isEdgeAuto(childStyle.margin, 2, style.flexDirection, direction);
    const hasAutoMarginTop = isEdgeAuto(childStyle.margin, 1, style.flexDirection, direction);
    const hasAutoMarginBottom = isEdgeAuto(childStyle.margin, 3, style.flexDirection, direction);
    const leftPos = childStyle.position[0];
    const topPos = childStyle.position[1];
    const rightPos = childStyle.position[2];
    const bottomPos = childStyle.position[3];
    const hasLeft = leftPos.unit !== UNIT_UNDEFINED;
    const hasRight = rightPos.unit !== UNIT_UNDEFINED;
    const hasTop = topPos.unit !== UNIT_UNDEFINED;
    const hasBottom = bottomPos.unit !== UNIT_UNDEFINED;
    const leftOffset = resolveValue(leftPos, nodeWidth);
    const topOffset = resolveValue(topPos, nodeHeight);
    const rightOffset = resolveValue(rightPos, nodeWidth);
    const bottomOffset = resolveValue(bottomPos, nodeHeight);
    const contentW = absPaddingBoxW;
    const contentH = absPaddingBoxH;
    let childAvailWidth;
    const widthIsAuto = childStyle.width.unit === UNIT_AUTO || childStyle.width.unit === UNIT_UNDEFINED;
    const widthIsPercent = childStyle.width.unit === UNIT_PERCENT;
    if (widthIsAuto && hasLeft && hasRight) {
      childAvailWidth = contentW - leftOffset - rightOffset - childMarginLeft - childMarginRight;
    } else if (widthIsAuto) {
      childAvailWidth = NaN;
    } else if (widthIsPercent) {
      childAvailWidth = absContentBoxW;
    } else {
      childAvailWidth = contentW;
    }
    let childAvailHeight;
    const heightIsAuto = childStyle.height.unit === UNIT_AUTO || childStyle.height.unit === UNIT_UNDEFINED;
    const heightIsPercent = childStyle.height.unit === UNIT_PERCENT;
    if (heightIsAuto && hasTop && hasBottom) {
      childAvailHeight = contentH - topOffset - bottomOffset - childMarginTop - childMarginBottom;
    } else if (heightIsAuto) {
      childAvailHeight = NaN;
    } else if (heightIsPercent) {
      childAvailHeight = absContentBoxH;
    } else {
      childAvailHeight = contentH;
    }
    let childX = childMarginLeft + leftOffset;
    let childY = childMarginTop + topOffset;
    const childAbsX = absX + marginLeft + absInnerLeft + leftOffset;
    const childAbsY = absY + marginTop + absInnerTop + topOffset;
    const clampIfNumber = (v) => Number.isNaN(v) ? NaN : Math.max(0, v);
    layoutNode(child, clampIfNumber(childAvailWidth), clampIfNumber(childAvailHeight), layout.left + absInnerLeft + childX, layout.top + absInnerTop + childY, childAbsX, childAbsY, direction);
    const childWidth = child.layout.width;
    const childHeight = child.layout.height;
    if (!hasLeft && !hasRight) {
      let alignment = style.alignItems;
      if (childStyle.alignSelf !== ALIGN_AUTO) {
        alignment = childStyle.alignSelf;
      }
      const freeSpaceX = contentW - childWidth - childMarginLeft - childMarginRight;
      switch (alignment) {
        case ALIGN_CENTER:
          childX = childMarginLeft + freeSpaceX / 2;
          break;
        case ALIGN_FLEX_END:
          childX = childMarginLeft + freeSpaceX;
          break;
        case ALIGN_STRETCH:
          break;
        default:
          childX = childMarginLeft;
          break;
      }
    } else if (!hasLeft && hasRight) {
      childX = contentW - rightOffset - childMarginRight - childWidth;
    } else if (hasLeft && hasRight) {
      if (widthIsAuto) {
        child.layout.width = Math.round(childAvailWidth);
      } else if (hasAutoMarginLeft || hasAutoMarginRight) {
        const freeSpace = Math.max(0, contentW - leftOffset - rightOffset - childWidth);
        if (hasAutoMarginLeft && hasAutoMarginRight) {
          childX = leftOffset + freeSpace / 2;
        } else if (hasAutoMarginLeft) {
          childX = leftOffset + freeSpace;
        }
      }
    }
    if (!hasTop && !hasBottom) {
      const freeSpaceY = contentH - childHeight - childMarginTop - childMarginBottom;
      switch (style.justifyContent) {
        case JUSTIFY_CENTER:
          childY = childMarginTop + freeSpaceY / 2;
          break;
        case JUSTIFY_FLEX_END:
          childY = childMarginTop + freeSpaceY;
          break;
        default:
          childY = childMarginTop;
          break;
      }
    } else if (!hasTop && hasBottom) {
      childY = contentH - bottomOffset - childMarginBottom - childHeight;
    } else if (hasTop && hasBottom) {
      if (heightIsAuto) {
        child.layout.height = Math.round(childAvailHeight);
      } else if (hasAutoMarginTop || hasAutoMarginBottom) {
        const freeSpace = Math.max(0, contentH - topOffset - bottomOffset - childHeight);
        if (hasAutoMarginTop && hasAutoMarginBottom) {
          childY = topOffset + freeSpace / 2;
        } else if (hasAutoMarginTop) {
          childY = topOffset + freeSpace;
        }
      }
    }
    child.layout.left = Math.round(absInnerLeft + childX);
    child.layout.top = Math.round(absInnerTop + childY);
  }
  flex.lastAvailW = availableWidth;
  flex.lastAvailH = availableHeight;
  flex.lastOffsetX = offsetX;
  flex.lastOffsetY = offsetY;
  flex.lastDir = direction;
  flex.layoutValid = true;
}
export {
  resolveEdgeValue,
  resolveEdgeCalls,
  resetLayoutStats,
  measureNodeCalls,
  measureNode,
  markSubtreeLayoutSeen,
  layoutSizingCalls,
  layoutPositioningCalls,
  layoutNodeCalls,
  layoutCacheHits,
  isRowDirection,
  isReverseDirection,
  isEdgeAuto,
  countNodes,
  computeLayout
};
