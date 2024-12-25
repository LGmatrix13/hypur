#!/usr/bin/env/ node
import { createRequire } from "node:module";
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
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// ../../node_modules/yoctocolors-cjs/index.js
var require_yoctocolors_cjs = __commonJS((exports, module) => {
  var tty = __require("node:tty");
  var hasColors = tty?.WriteStream?.prototype?.hasColors?.() ?? false;
  var format = (open, close) => {
    if (!hasColors) {
      return (input) => input;
    }
    const openCode = `\x1B[${open}m`;
    const closeCode = `\x1B[${close}m`;
    return (input) => {
      const string = input + "";
      let index = string.indexOf(closeCode);
      if (index === -1) {
        return openCode + string + closeCode;
      }
      let result = openCode;
      let lastIndex = 0;
      while (index !== -1) {
        result += string.slice(lastIndex, index) + openCode;
        lastIndex = index + closeCode.length;
        index = string.indexOf(closeCode, lastIndex);
      }
      result += string.slice(lastIndex) + closeCode;
      return result;
    };
  };
  var colors = {};
  colors.reset = format(0, 0);
  colors.bold = format(1, 22);
  colors.dim = format(2, 22);
  colors.italic = format(3, 23);
  colors.underline = format(4, 24);
  colors.overline = format(53, 55);
  colors.inverse = format(7, 27);
  colors.hidden = format(8, 28);
  colors.strikethrough = format(9, 29);
  colors.black = format(30, 39);
  colors.red = format(31, 39);
  colors.green = format(32, 39);
  colors.yellow = format(33, 39);
  colors.blue = format(34, 39);
  colors.magenta = format(35, 39);
  colors.cyan = format(36, 39);
  colors.white = format(37, 39);
  colors.gray = format(90, 39);
  colors.bgBlack = format(40, 49);
  colors.bgRed = format(41, 49);
  colors.bgGreen = format(42, 49);
  colors.bgYellow = format(43, 49);
  colors.bgBlue = format(44, 49);
  colors.bgMagenta = format(45, 49);
  colors.bgCyan = format(46, 49);
  colors.bgWhite = format(47, 49);
  colors.bgGray = format(100, 49);
  colors.redBright = format(91, 39);
  colors.greenBright = format(92, 39);
  colors.yellowBright = format(93, 39);
  colors.blueBright = format(94, 39);
  colors.magentaBright = format(95, 39);
  colors.cyanBright = format(96, 39);
  colors.whiteBright = format(97, 39);
  colors.bgRedBright = format(101, 49);
  colors.bgGreenBright = format(102, 49);
  colors.bgYellowBright = format(103, 49);
  colors.bgBlueBright = format(104, 49);
  colors.bgMagentaBright = format(105, 49);
  colors.bgCyanBright = format(106, 49);
  colors.bgWhiteBright = format(107, 49);
  module.exports = colors;
});

// ../../node_modules/cli-width/index.js
var require_cli_width = __commonJS((exports, module) => {
  module.exports = cliWidth;
  function normalizeOpts(options) {
    const defaultOpts = {
      defaultWidth: 0,
      output: process.stdout,
      tty: __require("tty")
    };
    if (!options) {
      return defaultOpts;
    }
    Object.keys(defaultOpts).forEach(function(key) {
      if (!options[key]) {
        options[key] = defaultOpts[key];
      }
    });
    return options;
  }
  function cliWidth(options) {
    const opts = normalizeOpts(options);
    if (opts.output.getWindowSize) {
      return opts.output.getWindowSize()[0] || opts.defaultWidth;
    }
    if (opts.tty.getWindowSize) {
      return opts.tty.getWindowSize()[1] || opts.defaultWidth;
    }
    if (opts.output.columns) {
      return opts.output.columns;
    }
    if (process.env.CLI_WIDTH) {
      const width = parseInt(process.env.CLI_WIDTH, 10);
      if (!isNaN(width) && width !== 0) {
        return width;
      }
    }
    return opts.defaultWidth;
  }
});

// ../../node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS((exports, module) => {
  module.exports = ({ onlyFirst = false } = {}) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? undefined : "g");
  };
});

// ../../node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS((exports, module) => {
  var ansiRegex = require_ansi_regex();
  module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
});

// ../../node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS((exports, module) => {
  var isFullwidthCodePoint = (codePoint) => {
    if (Number.isNaN(codePoint)) {
      return false;
    }
    if (codePoint >= 4352 && (codePoint <= 4447 || codePoint === 9001 || codePoint === 9002 || 11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || 12880 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65131 || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 262141)) {
      return true;
    }
    return false;
  };
  module.exports = isFullwidthCodePoint;
  module.exports.default = isFullwidthCodePoint;
});

// ../../node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS((exports, module) => {
  module.exports = function() {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
  };
});

// ../../node_modules/string-width/index.js
var require_string_width = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var isFullwidthCodePoint = require_is_fullwidth_code_point();
  var emojiRegex = require_emoji_regex();
  var stringWidth = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return 0;
    }
    string = stripAnsi(string);
    if (string.length === 0) {
      return 0;
    }
    string = string.replace(emojiRegex(), "  ");
    let width = 0;
    for (let i = 0;i < string.length; i++) {
      const code = string.codePointAt(i);
      if (code <= 31 || code >= 127 && code <= 159) {
        continue;
      }
      if (code >= 768 && code <= 879) {
        continue;
      }
      if (code > 65535) {
        i++;
      }
      width += isFullwidthCodePoint(code) ? 2 : 1;
    }
    return width;
  };
  module.exports = stringWidth;
  module.exports.default = stringWidth;
});

// ../../node_modules/color-name/index.js
var require_color_name = __commonJS((exports, module) => {
  module.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// ../../node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports, module) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  module.exports = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", { value: channels });
    Object.defineProperty(convert[model], "labels", { value: labels });
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0;i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// ../../node_modules/color-convert/route.js
var require_route = __commonJS((exports, module) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0;i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0;i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  module.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0;i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// ../../node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports, module) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0;i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
    Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module.exports = convert;
});

// ../../node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS((exports, module) => {
  var wrapAnsi16 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `\x1B[${code + offset}m`;
  };
  var wrapAnsi256 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `\x1B[${38 + offset};5;${code}m`;
  };
  var wrapAnsi16m = (fn, offset) => (...args) => {
    const rgb = fn(...args);
    return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  var ansi2ansi = (n) => n;
  var rgb2rgb = (r, g, b) => [r, g, b];
  var setLazyProperty = (object, property, get) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get();
        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true
        });
        return value;
      },
      enumerable: true,
      configurable: true
    });
  };
  var colorConvert;
  var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    if (colorConvert === undefined) {
      colorConvert = require_color_convert();
    }
    const offset = isBackground ? 10 : 0;
    const styles = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles[name] = wrap(identity, offset);
      } else if (typeof suite === "object") {
        styles[name] = wrap(suite[targetSpace], offset);
      }
    }
    return styles;
  };
  function assembleStyles() {
    const codes = new Map;
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles;
  }
  Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
  });
});

// ../../node_modules/wrap-ansi/index.js
var require_wrap_ansi = __commonJS((exports, module) => {
  var stringWidth = require_string_width();
  var stripAnsi = require_strip_ansi();
  var ansiStyles = require_ansi_styles();
  var ESCAPES = new Set([
    "\x1B",
    ""
  ]);
  var END_CODE = 39;
  var wrapAnsi = (code) => `${ESCAPES.values().next().value}[${code}m`;
  var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
  var wrapWord = (rows, word, columns) => {
    const characters = [...word];
    let isInsideEscape = false;
    let visible = stringWidth(stripAnsi(rows[rows.length - 1]));
    for (const [index, character] of characters.entries()) {
      const characterLength = stringWidth(character);
      if (visible + characterLength <= columns) {
        rows[rows.length - 1] += character;
      } else {
        rows.push(character);
        visible = 0;
      }
      if (ESCAPES.has(character)) {
        isInsideEscape = true;
      } else if (isInsideEscape && character === "m") {
        isInsideEscape = false;
        continue;
      }
      if (isInsideEscape) {
        continue;
      }
      visible += characterLength;
      if (visible === columns && index < characters.length - 1) {
        rows.push("");
        visible = 0;
      }
    }
    if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
      rows[rows.length - 2] += rows.pop();
    }
  };
  var stringVisibleTrimSpacesRight = (str) => {
    const words = str.split(" ");
    let last = words.length;
    while (last > 0) {
      if (stringWidth(words[last - 1]) > 0) {
        break;
      }
      last--;
    }
    if (last === words.length) {
      return str;
    }
    return words.slice(0, last).join(" ") + words.slice(last).join("");
  };
  var exec = (string, columns, options = {}) => {
    if (options.trim !== false && string.trim() === "") {
      return "";
    }
    let pre = "";
    let ret = "";
    let escapeCode;
    const lengths = wordLengths(string);
    let rows = [""];
    for (const [index, word] of string.split(" ").entries()) {
      if (options.trim !== false) {
        rows[rows.length - 1] = rows[rows.length - 1].trimLeft();
      }
      let rowLength = stringWidth(rows[rows.length - 1]);
      if (index !== 0) {
        if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
          rows.push("");
          rowLength = 0;
        }
        if (rowLength > 0 || options.trim === false) {
          rows[rows.length - 1] += " ";
          rowLength++;
        }
      }
      if (options.hard && lengths[index] > columns) {
        const remainingColumns = columns - rowLength;
        const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
        const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
        if (breaksStartingNextLine < breaksStartingThisLine) {
          rows.push("");
        }
        wrapWord(rows, word, columns);
        continue;
      }
      if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
        if (options.wordWrap === false && rowLength < columns) {
          wrapWord(rows, word, columns);
          continue;
        }
        rows.push("");
      }
      if (rowLength + lengths[index] > columns && options.wordWrap === false) {
        wrapWord(rows, word, columns);
        continue;
      }
      rows[rows.length - 1] += word;
    }
    if (options.trim !== false) {
      rows = rows.map(stringVisibleTrimSpacesRight);
    }
    pre = rows.join(`
`);
    for (const [index, character] of [...pre].entries()) {
      ret += character;
      if (ESCAPES.has(character)) {
        const code2 = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
        escapeCode = code2 === END_CODE ? null : code2;
      }
      const code = ansiStyles.codes.get(Number(escapeCode));
      if (escapeCode && code) {
        if (pre[index + 1] === `
`) {
          ret += wrapAnsi(code);
        } else if (character === `
`) {
          ret += wrapAnsi(escapeCode);
        }
      }
    }
    return ret;
  };
  module.exports = (string, columns, options) => {
    return String(string).normalize().replace(/\r\n/g, `
`).split(`
`).map((line) => exec(line, columns, options)).join(`
`);
  };
});

// ../../node_modules/mute-stream/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var Stream = __require("stream");

  class MuteStream extends Stream {
    #isTTY = null;
    constructor(opts = {}) {
      super(opts);
      this.writable = this.readable = true;
      this.muted = false;
      this.on("pipe", this._onpipe);
      this.replace = opts.replace;
      this._prompt = opts.prompt || null;
      this._hadControl = false;
    }
    #destSrc(key, def) {
      if (this._dest) {
        return this._dest[key];
      }
      if (this._src) {
        return this._src[key];
      }
      return def;
    }
    #proxy(method, ...args) {
      if (typeof this._dest?.[method] === "function") {
        this._dest[method](...args);
      }
      if (typeof this._src?.[method] === "function") {
        this._src[method](...args);
      }
    }
    get isTTY() {
      if (this.#isTTY !== null) {
        return this.#isTTY;
      }
      return this.#destSrc("isTTY", false);
    }
    set isTTY(val) {
      this.#isTTY = val;
    }
    get rows() {
      return this.#destSrc("rows");
    }
    get columns() {
      return this.#destSrc("columns");
    }
    mute() {
      this.muted = true;
    }
    unmute() {
      this.muted = false;
    }
    _onpipe(src) {
      this._src = src;
    }
    pipe(dest, options) {
      this._dest = dest;
      return super.pipe(dest, options);
    }
    pause() {
      if (this._src) {
        return this._src.pause();
      }
    }
    resume() {
      if (this._src) {
        return this._src.resume();
      }
    }
    write(c) {
      if (this.muted) {
        if (!this.replace) {
          return true;
        }
        if (c.match(/^\u001b/)) {
          if (c.indexOf(this._prompt) === 0) {
            c = c.slice(this._prompt.length);
            c = c.replace(/./g, this.replace);
            c = this._prompt + c;
          }
          this._hadControl = true;
          return this.emit("data", c);
        } else {
          if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
            this._hadControl = false;
            this.emit("data", this._prompt);
            c = c.slice(this._prompt.length);
          }
          c = c.toString().replace(/./g, this.replace);
        }
      }
      this.emit("data", c);
    }
    end(c) {
      if (this.muted) {
        if (c && this.replace) {
          c = c.toString().replace(/./g, this.replace);
        } else {
          c = null;
        }
      }
      if (c) {
        this.emit("data", c);
      }
      this.emit("end");
    }
    destroy(...args) {
      return this.#proxy("destroy", ...args);
    }
    destroySoon(...args) {
      return this.#proxy("destroySoon", ...args);
    }
    close(...args) {
      return this.#proxy("close", ...args);
    }
  }
  module.exports = MuteStream;
});

// ../../node_modules/ansi-escapes/index.js
var require_ansi_escapes = __commonJS((exports, module) => {
  var ansiEscapes = exports;
  exports.default = ansiEscapes;
  var ESC = "\x1B[";
  var OSC = "\x1B]";
  var BEL = "\x07";
  var SEP = ";";
  var isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal";
  ansiEscapes.cursorTo = (x, y) => {
    if (typeof x !== "number") {
      throw new TypeError("The `x` argument is required");
    }
    if (typeof y !== "number") {
      return ESC + (x + 1) + "G";
    }
    return ESC + (y + 1) + ";" + (x + 1) + "H";
  };
  ansiEscapes.cursorMove = (x, y) => {
    if (typeof x !== "number") {
      throw new TypeError("The `x` argument is required");
    }
    let ret = "";
    if (x < 0) {
      ret += ESC + -x + "D";
    } else if (x > 0) {
      ret += ESC + x + "C";
    }
    if (y < 0) {
      ret += ESC + -y + "A";
    } else if (y > 0) {
      ret += ESC + y + "B";
    }
    return ret;
  };
  ansiEscapes.cursorUp = (count = 1) => ESC + count + "A";
  ansiEscapes.cursorDown = (count = 1) => ESC + count + "B";
  ansiEscapes.cursorForward = (count = 1) => ESC + count + "C";
  ansiEscapes.cursorBackward = (count = 1) => ESC + count + "D";
  ansiEscapes.cursorLeft = ESC + "G";
  ansiEscapes.cursorSavePosition = isTerminalApp ? "\x1B7" : ESC + "s";
  ansiEscapes.cursorRestorePosition = isTerminalApp ? "\x1B8" : ESC + "u";
  ansiEscapes.cursorGetPosition = ESC + "6n";
  ansiEscapes.cursorNextLine = ESC + "E";
  ansiEscapes.cursorPrevLine = ESC + "F";
  ansiEscapes.cursorHide = ESC + "?25l";
  ansiEscapes.cursorShow = ESC + "?25h";
  ansiEscapes.eraseLines = (count) => {
    let clear = "";
    for (let i = 0;i < count; i++) {
      clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : "");
    }
    if (count) {
      clear += ansiEscapes.cursorLeft;
    }
    return clear;
  };
  ansiEscapes.eraseEndLine = ESC + "K";
  ansiEscapes.eraseStartLine = ESC + "1K";
  ansiEscapes.eraseLine = ESC + "2K";
  ansiEscapes.eraseDown = ESC + "J";
  ansiEscapes.eraseUp = ESC + "1J";
  ansiEscapes.eraseScreen = ESC + "2J";
  ansiEscapes.scrollUp = ESC + "S";
  ansiEscapes.scrollDown = ESC + "T";
  ansiEscapes.clearScreen = "\x1Bc";
  ansiEscapes.clearTerminal = process.platform === "win32" ? `${ansiEscapes.eraseScreen}${ESC}0f` : `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;
  ansiEscapes.beep = BEL;
  ansiEscapes.link = (text, url) => {
    return [
      OSC,
      "8",
      SEP,
      SEP,
      url,
      BEL,
      text,
      OSC,
      "8",
      SEP,
      SEP,
      BEL
    ].join("");
  };
  ansiEscapes.image = (buffer, options = {}) => {
    let ret = `${OSC}1337;File=inline=1`;
    if (options.width) {
      ret += `;width=${options.width}`;
    }
    if (options.height) {
      ret += `;height=${options.height}`;
    }
    if (options.preserveAspectRatio === false) {
      ret += ";preserveAspectRatio=0";
    }
    return ret + ":" + buffer.toString("base64") + BEL;
  };
  ansiEscapes.iTerm = {
    setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
    annotation: (message, options = {}) => {
      let ret = `${OSC}1337;`;
      const hasX = typeof options.x !== "undefined";
      const hasY = typeof options.y !== "undefined";
      if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== "undefined")) {
        throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
      }
      message = message.replace(/\|/g, "");
      ret += options.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
      if (options.length > 0) {
        ret += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join("|");
      } else {
        ret += message;
      }
      return ret + BEL;
    }
  };
});

// ../../node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS((exports, module) => {
  var p = process || {};
  var argv = p.argv || [];
  var env = p.env || {};
  var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
  var formatter = (open, close, replace = open) => (input) => {
    let string = "" + input, index = string.indexOf(close, open.length);
    return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
  };
  var replaceClose = (string, close, replace, index) => {
    let result = "", cursor = 0;
    do {
      result += string.substring(cursor, index) + replace;
      cursor = index + close.length;
      index = string.indexOf(close, cursor);
    } while (~index);
    return result + string.substring(cursor);
  };
  var createColors = (enabled = isColorSupported) => {
    let f = enabled ? formatter : () => String;
    return {
      isColorSupported: enabled,
      reset: f("\x1B[0m", "\x1B[0m"),
      bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: f("\x1B[3m", "\x1B[23m"),
      underline: f("\x1B[4m", "\x1B[24m"),
      inverse: f("\x1B[7m", "\x1B[27m"),
      hidden: f("\x1B[8m", "\x1B[28m"),
      strikethrough: f("\x1B[9m", "\x1B[29m"),
      black: f("\x1B[30m", "\x1B[39m"),
      red: f("\x1B[31m", "\x1B[39m"),
      green: f("\x1B[32m", "\x1B[39m"),
      yellow: f("\x1B[33m", "\x1B[39m"),
      blue: f("\x1B[34m", "\x1B[39m"),
      magenta: f("\x1B[35m", "\x1B[39m"),
      cyan: f("\x1B[36m", "\x1B[39m"),
      white: f("\x1B[37m", "\x1B[39m"),
      gray: f("\x1B[90m", "\x1B[39m"),
      bgBlack: f("\x1B[40m", "\x1B[49m"),
      bgRed: f("\x1B[41m", "\x1B[49m"),
      bgGreen: f("\x1B[42m", "\x1B[49m"),
      bgYellow: f("\x1B[43m", "\x1B[49m"),
      bgBlue: f("\x1B[44m", "\x1B[49m"),
      bgMagenta: f("\x1B[45m", "\x1B[49m"),
      bgCyan: f("\x1B[46m", "\x1B[49m"),
      bgWhite: f("\x1B[47m", "\x1B[49m"),
      blackBright: f("\x1B[90m", "\x1B[39m"),
      redBright: f("\x1B[91m", "\x1B[39m"),
      greenBright: f("\x1B[92m", "\x1B[39m"),
      yellowBright: f("\x1B[93m", "\x1B[39m"),
      blueBright: f("\x1B[94m", "\x1B[39m"),
      magentaBright: f("\x1B[95m", "\x1B[39m"),
      cyanBright: f("\x1B[96m", "\x1B[39m"),
      whiteBright: f("\x1B[97m", "\x1B[39m"),
      bgBlackBright: f("\x1B[100m", "\x1B[49m"),
      bgRedBright: f("\x1B[101m", "\x1B[49m"),
      bgGreenBright: f("\x1B[102m", "\x1B[49m"),
      bgYellowBright: f("\x1B[103m", "\x1B[49m"),
      bgBlueBright: f("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
      bgCyanBright: f("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: f("\x1B[107m", "\x1B[49m")
    };
  };
  module.exports = createColors();
  module.exports.createColors = createColors;
});

// ../../node_modules/nanospinner/dist/consts.js
var require_consts = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.symbols = exports.isTTY = undefined;
  var node_tty_1 = __importDefault(__require("node:tty"));
  var node_process_1 = __importDefault(__require("node:process"));
  var isCI = node_process_1.default.env.CI || node_process_1.default.env.WT_SESSION || node_process_1.default.env.ConEmuTask === "{cmd::Cmder}" || node_process_1.default.env.TERM_PROGRAM === "vscode" || node_process_1.default.env.TERM === "xterm-256color" || node_process_1.default.env.TERM === "alacritty";
  var isTTY = node_tty_1.default.isatty(1) && node_process_1.default.env.TERM !== "dumb" && !("CI" in node_process_1.default.env);
  exports.isTTY = isTTY;
  var supportUnicode = node_process_1.default.platform !== "win32" ? node_process_1.default.env.TERM !== "linux" : isCI;
  var symbols = {
    frames: isTTY ? supportUnicode ? ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] : ["-", "\\", "|", "/"] : ["-"],
    tick: supportUnicode ? "✔" : "√",
    cross: supportUnicode ? "✖" : "×",
    warn: supportUnicode ? "⚠" : "!!",
    info: supportUnicode ? "ℹ" : "i"
  };
  exports.symbols = symbols;
});

// ../../node_modules/nanospinner/dist/index.js
var require_dist = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createSpinner = createSpinner;
  var picocolors_1 = __importDefault(require_picocolors());
  var consts_1 = require_consts();
  function getLines(str = "", width = 80) {
    return str.replace(/\u001b[^m]*?m/g, "").split(`
`).reduce((col, line) => col += Math.max(1, Math.ceil(line.length / width)), 0);
  }
  function createSpinner(text = "", opts = {}) {
    let current = 0, interval = opts.interval || 50, stream = opts.stream || process.stderr, frames = opts.frames && opts.frames.length ? opts.frames : consts_1.symbols.frames, color = opts.color || "yellow", spinning = false, lines = 0, timer = undefined, getText = (opts2 = {}) => typeof opts2 === "string" ? opts2 : opts2.text || text, getUpdate = (opts2 = {}) => typeof opts2 === "string" ? false : !!opts2.update, getColor = (opts2 = {}) => typeof opts2 === "string" || !opts2.color ? color : opts2.color, getMark = (opts2 = {}, fallback) => typeof opts2 === "string" || !opts2.mark ? fallback : opts2.mark, mountProcessEvents = () => {
      process.on("SIGINT", exit);
      process.on("SIGTERM", exit);
    }, cleanupProcessEvents = () => {
      process.off("SIGINT", exit);
      process.off("SIGTERM", exit);
    };
    let spinner = {
      reset() {
        current = 0;
        lines = 0;
        spinning = false;
        clearTimeout(timer);
        timer = undefined;
        return spinner;
      },
      clear() {
        spinner.write("\x1B[1G");
        for (let i = 0;i < lines; i++) {
          i > 0 && spinner.write("\x1B[1A");
          spinner.write("\x1B[2K\x1B[1G");
        }
        lines = 0;
        return spinner;
      },
      write(str, clear = false) {
        if (clear && consts_1.isTTY)
          spinner.clear();
        stream.write(str);
        return spinner;
      },
      render() {
        let str = `${picocolors_1.default[color](frames[current])} ${text}`;
        consts_1.isTTY ? spinner.write(`\x1B[?25l`) : str += `
`;
        spinner.write(str, true);
        consts_1.isTTY && (lines = getLines(str, stream.columns));
        return spinner;
      },
      spin() {
        spinner.render();
        current = ++current % frames.length;
        return spinner;
      },
      update(opts2) {
        if (typeof opts2 === "string") {
          text = opts2;
        } else {
          text = opts2.text || text;
          frames = opts2.frames && opts2.frames.length ? opts2.frames : frames;
          interval = opts2.interval || interval;
          color = opts2.color || color;
        }
        if (frames.length - 1 < current)
          current = 0;
        return spinner;
      },
      loop() {
        consts_1.isTTY && (timer = setTimeout(() => spinner.loop(), interval));
        return spinner.spin();
      },
      start(opts2 = {}) {
        timer && spinner.reset();
        spinning = true;
        mountProcessEvents();
        return spinner.update({ text: getText(opts2), color: getColor(opts2) }).loop();
      },
      stop(opts2) {
        spinning = false;
        clearTimeout(timer);
        timer = undefined;
        cleanupProcessEvents();
        const update = getUpdate(opts2);
        const mark = picocolors_1.default[getColor(opts2)](getMark(opts2, frames[current]));
        const text2 = getText(opts2);
        spinner.write(opts2 ? `${mark} ${text2}${update ? "" : `
`}` : "", true);
        return consts_1.isTTY && !update ? spinner.write(`\x1B[?25h`) : spinner;
      },
      success(opts2 = {}) {
        return spinner.stop({
          text: getText(opts2),
          mark: getMark(opts2, consts_1.symbols.tick),
          color: "green",
          update: getUpdate(opts2)
        });
      },
      error(opts2 = {}) {
        return spinner.stop({
          text: getText(opts2),
          mark: getMark(opts2, consts_1.symbols.cross),
          color: "red",
          update: getUpdate(opts2)
        });
      },
      warn(opts2 = {}) {
        return spinner.stop({
          text: getText(opts2),
          mark: getMark(opts2, consts_1.symbols.warn),
          color: "yellow",
          update: getUpdate(opts2)
        });
      },
      info(opts2 = {}) {
        return spinner.stop({
          text: getText(opts2),
          mark: getMark(opts2, consts_1.symbols.info),
          color: "blue",
          update: getUpdate(opts2)
        });
      },
      isSpinning() {
        return spinning;
      }
    };
    function exit(signal) {
      if (spinning) {
        spinner.stop();
      }
      process.exit(signal === "SIGINT" ? 130 : signal === "SIGTERM" ? 143 : 1);
    }
    return spinner;
  }
});

// ../../node_modules/@inquirer/core/dist/esm/lib/key.js
var isBackspaceKey = (key) => key.name === "backspace";
var isEnterKey = (key) => key.name === "enter" || key.name === "return";
// ../../node_modules/@inquirer/core/dist/esm/lib/errors.js
class AbortPromptError extends Error {
  name = "AbortPromptError";
  message = "Prompt was aborted";
  constructor(options) {
    super();
    this.cause = options?.cause;
  }
}

class CancelPromptError extends Error {
  name = "CancelPromptError";
  message = "Prompt was canceled";
}

class ExitPromptError extends Error {
  name = "ExitPromptError";
}

class HookError extends Error {
  name = "HookError";
}

class ValidationError extends Error {
  name = "ValidationError";
}
// ../../node_modules/@inquirer/core/dist/esm/lib/use-prefix.js
import { AsyncResource as AsyncResource2 } from "node:async_hooks";

// ../../node_modules/@inquirer/core/dist/esm/lib/hook-engine.js
import { AsyncLocalStorage, AsyncResource } from "node:async_hooks";
var hookStorage = new AsyncLocalStorage;
function createStore(rl) {
  const store = {
    rl,
    hooks: [],
    hooksCleanup: [],
    hooksEffect: [],
    index: 0,
    handleChange() {
    }
  };
  return store;
}
function withHooks(rl, cb) {
  const store = createStore(rl);
  return hookStorage.run(store, () => {
    function cycle(render) {
      store.handleChange = () => {
        store.index = 0;
        render();
      };
      store.handleChange();
    }
    return cb(cycle);
  });
}
function getStore() {
  const store = hookStorage.getStore();
  if (!store) {
    throw new HookError("[Inquirer] Hook functions can only be called from within a prompt");
  }
  return store;
}
function readline() {
  return getStore().rl;
}
function withUpdates(fn) {
  const wrapped = (...args) => {
    const store = getStore();
    let shouldUpdate = false;
    const oldHandleChange = store.handleChange;
    store.handleChange = () => {
      shouldUpdate = true;
    };
    const returnValue = fn(...args);
    if (shouldUpdate) {
      oldHandleChange();
    }
    store.handleChange = oldHandleChange;
    return returnValue;
  };
  return AsyncResource.bind(wrapped);
}
function withPointer(cb) {
  const store = getStore();
  const { index } = store;
  const pointer = {
    get() {
      return store.hooks[index];
    },
    set(value) {
      store.hooks[index] = value;
    },
    initialized: index in store.hooks
  };
  const returnValue = cb(pointer);
  store.index++;
  return returnValue;
}
function handleChange() {
  getStore().handleChange();
}
var effectScheduler = {
  queue(cb) {
    const store = getStore();
    const { index } = store;
    store.hooksEffect.push(() => {
      store.hooksCleanup[index]?.();
      const cleanFn = cb(readline());
      if (cleanFn != null && typeof cleanFn !== "function") {
        throw new ValidationError("useEffect return value must be a cleanup function or nothing.");
      }
      store.hooksCleanup[index] = cleanFn;
    });
  },
  run() {
    const store = getStore();
    withUpdates(() => {
      store.hooksEffect.forEach((effect) => {
        effect();
      });
      store.hooksEffect.length = 0;
    })();
  },
  clearAll() {
    const store = getStore();
    store.hooksCleanup.forEach((cleanFn) => {
      cleanFn?.();
    });
    store.hooksEffect.length = 0;
    store.hooksCleanup.length = 0;
  }
};

// ../../node_modules/@inquirer/core/dist/esm/lib/use-state.js
function useState(defaultValue) {
  return withPointer((pointer) => {
    const setFn = (newValue) => {
      if (pointer.get() !== newValue) {
        pointer.set(newValue);
        handleChange();
      }
    };
    if (pointer.initialized) {
      return [pointer.get(), setFn];
    }
    const value = typeof defaultValue === "function" ? defaultValue() : defaultValue;
    pointer.set(value);
    return [value, setFn];
  });
}

// ../../node_modules/@inquirer/core/dist/esm/lib/use-effect.js
function useEffect(cb, depArray) {
  withPointer((pointer) => {
    const oldDeps = pointer.get();
    const hasChanged = !Array.isArray(oldDeps) || depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    if (hasChanged) {
      effectScheduler.queue(cb);
    }
    pointer.set(depArray);
  });
}

// ../../node_modules/@inquirer/core/dist/esm/lib/theme.js
var import_yoctocolors_cjs = __toESM(require_yoctocolors_cjs(), 1);

// ../../node_modules/@inquirer/figures/dist/esm/index.js
import process2 from "node:process";
function isUnicodeSupported() {
  if (process2.platform !== "win32") {
    return process2.env["TERM"] !== "linux";
  }
  return Boolean(process2.env["WT_SESSION"]) || Boolean(process2.env["TERMINUS_SUBLIME"]) || process2.env["ConEmuTask"] === "{cmd::Cmder}" || process2.env["TERM_PROGRAM"] === "Terminus-Sublime" || process2.env["TERM_PROGRAM"] === "vscode" || process2.env["TERM"] === "xterm-256color" || process2.env["TERM"] === "alacritty" || process2.env["TERMINAL_EMULATOR"] === "JetBrains-JediTerm";
}
var common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "█",
  squareDarkShade: "▓",
  squareMediumShade: "▒",
  squareLightShade: "░",
  squareTop: "▀",
  squareBottom: "▄",
  squareLeft: "▌",
  squareRight: "▐",
  squareCenter: "■",
  bullet: "●",
  dot: "․",
  ellipsis: "…",
  pointerSmall: "›",
  triangleUp: "▲",
  triangleUpSmall: "▴",
  triangleDown: "▼",
  triangleDownSmall: "▾",
  triangleLeftSmall: "◂",
  triangleRightSmall: "▸",
  home: "⌂",
  heart: "♥",
  musicNote: "♪",
  musicNoteBeamed: "♫",
  arrowUp: "↑",
  arrowDown: "↓",
  arrowLeft: "←",
  arrowRight: "→",
  arrowLeftRight: "↔",
  arrowUpDown: "↕",
  almostEqual: "≈",
  notEqual: "≠",
  lessOrEqual: "≤",
  greaterOrEqual: "≥",
  identical: "≡",
  infinity: "∞",
  subscriptZero: "₀",
  subscriptOne: "₁",
  subscriptTwo: "₂",
  subscriptThree: "₃",
  subscriptFour: "₄",
  subscriptFive: "₅",
  subscriptSix: "₆",
  subscriptSeven: "₇",
  subscriptEight: "₈",
  subscriptNine: "₉",
  oneHalf: "½",
  oneThird: "⅓",
  oneQuarter: "¼",
  oneFifth: "⅕",
  oneSixth: "⅙",
  oneEighth: "⅛",
  twoThirds: "⅔",
  twoFifths: "⅖",
  threeQuarters: "¾",
  threeFifths: "⅗",
  threeEighths: "⅜",
  fourFifths: "⅘",
  fiveSixths: "⅚",
  fiveEighths: "⅝",
  sevenEighths: "⅞",
  line: "─",
  lineBold: "━",
  lineDouble: "═",
  lineDashed0: "┄",
  lineDashed1: "┅",
  lineDashed2: "┈",
  lineDashed3: "┉",
  lineDashed4: "╌",
  lineDashed5: "╍",
  lineDashed6: "╴",
  lineDashed7: "╶",
  lineDashed8: "╸",
  lineDashed9: "╺",
  lineDashed10: "╼",
  lineDashed11: "╾",
  lineDashed12: "−",
  lineDashed13: "–",
  lineDashed14: "‐",
  lineDashed15: "⁃",
  lineVertical: "│",
  lineVerticalBold: "┃",
  lineVerticalDouble: "║",
  lineVerticalDashed0: "┆",
  lineVerticalDashed1: "┇",
  lineVerticalDashed2: "┊",
  lineVerticalDashed3: "┋",
  lineVerticalDashed4: "╎",
  lineVerticalDashed5: "╏",
  lineVerticalDashed6: "╵",
  lineVerticalDashed7: "╷",
  lineVerticalDashed8: "╹",
  lineVerticalDashed9: "╻",
  lineVerticalDashed10: "╽",
  lineVerticalDashed11: "╿",
  lineDownLeft: "┐",
  lineDownLeftArc: "╮",
  lineDownBoldLeftBold: "┓",
  lineDownBoldLeft: "┒",
  lineDownLeftBold: "┑",
  lineDownDoubleLeftDouble: "╗",
  lineDownDoubleLeft: "╖",
  lineDownLeftDouble: "╕",
  lineDownRight: "┌",
  lineDownRightArc: "╭",
  lineDownBoldRightBold: "┏",
  lineDownBoldRight: "┎",
  lineDownRightBold: "┍",
  lineDownDoubleRightDouble: "╔",
  lineDownDoubleRight: "╓",
  lineDownRightDouble: "╒",
  lineUpLeft: "┘",
  lineUpLeftArc: "╯",
  lineUpBoldLeftBold: "┛",
  lineUpBoldLeft: "┚",
  lineUpLeftBold: "┙",
  lineUpDoubleLeftDouble: "╝",
  lineUpDoubleLeft: "╜",
  lineUpLeftDouble: "╛",
  lineUpRight: "└",
  lineUpRightArc: "╰",
  lineUpBoldRightBold: "┗",
  lineUpBoldRight: "┖",
  lineUpRightBold: "┕",
  lineUpDoubleRightDouble: "╚",
  lineUpDoubleRight: "╙",
  lineUpRightDouble: "╘",
  lineUpDownLeft: "┤",
  lineUpBoldDownBoldLeftBold: "┫",
  lineUpBoldDownBoldLeft: "┨",
  lineUpDownLeftBold: "┥",
  lineUpBoldDownLeftBold: "┩",
  lineUpDownBoldLeftBold: "┪",
  lineUpDownBoldLeft: "┧",
  lineUpBoldDownLeft: "┦",
  lineUpDoubleDownDoubleLeftDouble: "╣",
  lineUpDoubleDownDoubleLeft: "╢",
  lineUpDownLeftDouble: "╡",
  lineUpDownRight: "├",
  lineUpBoldDownBoldRightBold: "┣",
  lineUpBoldDownBoldRight: "┠",
  lineUpDownRightBold: "┝",
  lineUpBoldDownRightBold: "┡",
  lineUpDownBoldRightBold: "┢",
  lineUpDownBoldRight: "┟",
  lineUpBoldDownRight: "┞",
  lineUpDoubleDownDoubleRightDouble: "╠",
  lineUpDoubleDownDoubleRight: "╟",
  lineUpDownRightDouble: "╞",
  lineDownLeftRight: "┬",
  lineDownBoldLeftBoldRightBold: "┳",
  lineDownLeftBoldRightBold: "┯",
  lineDownBoldLeftRight: "┰",
  lineDownBoldLeftBoldRight: "┱",
  lineDownBoldLeftRightBold: "┲",
  lineDownLeftRightBold: "┮",
  lineDownLeftBoldRight: "┭",
  lineDownDoubleLeftDoubleRightDouble: "╦",
  lineDownDoubleLeftRight: "╥",
  lineDownLeftDoubleRightDouble: "╤",
  lineUpLeftRight: "┴",
  lineUpBoldLeftBoldRightBold: "┻",
  lineUpLeftBoldRightBold: "┷",
  lineUpBoldLeftRight: "┸",
  lineUpBoldLeftBoldRight: "┹",
  lineUpBoldLeftRightBold: "┺",
  lineUpLeftRightBold: "┶",
  lineUpLeftBoldRight: "┵",
  lineUpDoubleLeftDoubleRightDouble: "╩",
  lineUpDoubleLeftRight: "╨",
  lineUpLeftDoubleRightDouble: "╧",
  lineUpDownLeftRight: "┼",
  lineUpBoldDownBoldLeftBoldRightBold: "╋",
  lineUpDownBoldLeftBoldRightBold: "╈",
  lineUpBoldDownLeftBoldRightBold: "╇",
  lineUpBoldDownBoldLeftRightBold: "╊",
  lineUpBoldDownBoldLeftBoldRight: "╉",
  lineUpBoldDownLeftRight: "╀",
  lineUpDownBoldLeftRight: "╁",
  lineUpDownLeftBoldRight: "┽",
  lineUpDownLeftRightBold: "┾",
  lineUpBoldDownBoldLeftRight: "╂",
  lineUpDownLeftBoldRightBold: "┿",
  lineUpBoldDownLeftBoldRight: "╃",
  lineUpBoldDownLeftRightBold: "╄",
  lineUpDownBoldLeftBoldRight: "╅",
  lineUpDownBoldLeftRightBold: "╆",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
  lineUpDoubleDownDoubleLeftRight: "╫",
  lineUpDownLeftDoubleRightDouble: "╪",
  lineCross: "╳",
  lineBackslash: "╲",
  lineSlash: "╱"
};
var specialMainSymbols = {
  tick: "✔",
  info: "ℹ",
  warning: "⚠",
  cross: "✘",
  squareSmall: "◻",
  squareSmallFilled: "◼",
  circle: "◯",
  circleFilled: "◉",
  circleDotted: "◌",
  circleDouble: "◎",
  circleCircle: "ⓞ",
  circleCross: "ⓧ",
  circlePipe: "Ⓘ",
  radioOn: "◉",
  radioOff: "◯",
  checkboxOn: "☒",
  checkboxOff: "☐",
  checkboxCircleOn: "ⓧ",
  checkboxCircleOff: "Ⓘ",
  pointer: "❯",
  triangleUpOutline: "△",
  triangleLeft: "◀",
  triangleRight: "▶",
  lozenge: "◆",
  lozengeOutline: "◇",
  hamburger: "☰",
  smiley: "㋡",
  mustache: "෴",
  star: "★",
  play: "▶",
  nodejs: "⬢",
  oneSeventh: "⅐",
  oneNinth: "⅑",
  oneTenth: "⅒"
};
var specialFallbackSymbols = {
  tick: "√",
  info: "i",
  warning: "‼",
  cross: "×",
  squareSmall: "□",
  squareSmallFilled: "■",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(○)",
  circleCross: "(×)",
  circlePipe: "(│)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[×]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(×)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "∆",
  triangleLeft: "◄",
  triangleRight: "►",
  lozenge: "♦",
  lozengeOutline: "◊",
  hamburger: "≡",
  smiley: "☺",
  mustache: "┌─┐",
  star: "✶",
  play: "►",
  nodejs: "♦",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10"
};
var mainSymbols = { ...common, ...specialMainSymbols };
var fallbackSymbols = {
  ...common,
  ...specialFallbackSymbols
};
var shouldUseMain = isUnicodeSupported();
var figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var esm_default = figures;
var replacements = Object.entries(specialMainSymbols);

// ../../node_modules/@inquirer/core/dist/esm/lib/theme.js
var defaultTheme = {
  prefix: {
    idle: import_yoctocolors_cjs.default.blue("?"),
    done: import_yoctocolors_cjs.default.green(esm_default.tick)
  },
  spinner: {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((frame) => import_yoctocolors_cjs.default.yellow(frame))
  },
  style: {
    answer: import_yoctocolors_cjs.default.cyan,
    message: import_yoctocolors_cjs.default.bold,
    error: (text) => import_yoctocolors_cjs.default.red(`> ${text}`),
    defaultAnswer: (text) => import_yoctocolors_cjs.default.dim(`(${text})`),
    help: import_yoctocolors_cjs.default.dim,
    highlight: import_yoctocolors_cjs.default.cyan,
    key: (text) => import_yoctocolors_cjs.default.cyan(import_yoctocolors_cjs.default.bold(`<${text}>`))
  }
};

// ../../node_modules/@inquirer/core/dist/esm/lib/make-theme.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function deepMerge(...objects) {
  const output = {};
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      const prevValue = output[key];
      output[key] = isPlainObject(prevValue) && isPlainObject(value) ? deepMerge(prevValue, value) : value;
    }
  }
  return output;
}
function makeTheme(...themes) {
  const themesToMerge = [
    defaultTheme,
    ...themes.filter((theme) => theme != null)
  ];
  return deepMerge(...themesToMerge);
}

// ../../node_modules/@inquirer/core/dist/esm/lib/use-prefix.js
function usePrefix({ status = "idle", theme }) {
  const [showLoader, setShowLoader] = useState(false);
  const [tick, setTick] = useState(0);
  const { prefix, spinner } = makeTheme(theme);
  useEffect(() => {
    if (status === "loading") {
      let tickInterval;
      let inc = -1;
      const delayTimeout = setTimeout(AsyncResource2.bind(() => {
        setShowLoader(true);
        tickInterval = setInterval(AsyncResource2.bind(() => {
          inc = inc + 1;
          setTick(inc % spinner.frames.length);
        }), spinner.interval);
      }), 300);
      return () => {
        clearTimeout(delayTimeout);
        clearInterval(tickInterval);
      };
    } else {
      setShowLoader(false);
    }
  }, [status]);
  if (showLoader) {
    return spinner.frames[tick];
  }
  const iconName = status === "loading" ? "idle" : status;
  return typeof prefix === "string" ? prefix : prefix[iconName] ?? prefix["idle"];
}
// ../../node_modules/@inquirer/core/dist/esm/lib/use-ref.js
function useRef(val) {
  return useState({ current: val })[0];
}

// ../../node_modules/@inquirer/core/dist/esm/lib/use-keypress.js
function useKeypress(userHandler) {
  const signal = useRef(userHandler);
  signal.current = userHandler;
  useEffect((rl) => {
    let ignore = false;
    const handler = withUpdates((_input, event) => {
      if (ignore)
        return;
      signal.current(event, rl);
    });
    rl.input.on("keypress", handler);
    return () => {
      ignore = true;
      rl.input.removeListener("keypress", handler);
    };
  }, []);
}
// ../../node_modules/@inquirer/core/dist/esm/lib/utils.js
var import_cli_width = __toESM(require_cli_width(), 1);
var import_wrap_ansi = __toESM(require_wrap_ansi(), 1);
function breakLines(content, width) {
  return content.split(`
`).flatMap((line) => import_wrap_ansi.default(line, width, { trim: false, hard: true }).split(`
`).map((str) => str.trimEnd())).join(`
`);
}
function readlineWidth() {
  return import_cli_width.default({ defaultWidth: 80, output: readline().output });
}

// ../../node_modules/@inquirer/core/dist/esm/lib/create-prompt.js
var import_mute_stream = __toESM(require_lib(), 1);
import * as readline2 from "node:readline";
import { AsyncResource as AsyncResource3 } from "node:async_hooks";

// ../../node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// ../../node_modules/signal-exit/dist/mjs/index.js
var processOk = (process3) => !!process3 && typeof process3 === "object" && typeof process3.removeListener === "function" && typeof process3.emit === "function" && typeof process3.reallyExit === "function" && typeof process3.listeners === "function" && typeof process3.kill === "function" && typeof process3.pid === "number" && typeof process3.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);

class Emitter {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global[kExitEmitter]) {
      return global[kExitEmitter];
    }
    ObjectDefineProperty(global, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
}

class SignalExitBase {
}
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};

class SignalExitFallback extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
}

class SignalExit extends SignalExitBase {
  #hupSig = process3.platform === "win32" ? "SIGINT" : "SIGHUP";
  #emitter = new Emitter;
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process3) {
    super();
    this.#process = process3;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process3;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process3.kill(process3.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process3.reallyExit;
    this.#originalProcessEmit = process3.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {
      }
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
}
var process3 = globalThis.process;
var {
  onExit,
  load,
  unload
} = signalExitWrap(processOk(process3) ? new SignalExit(process3) : new SignalExitFallback);

// ../../node_modules/@inquirer/core/dist/esm/lib/screen-manager.js
var import_strip_ansi = __toESM(require_strip_ansi(), 1);
var import_ansi_escapes = __toESM(require_ansi_escapes(), 1);
var height = (content) => content.split(`
`).length;
var lastLine = (content) => content.split(`
`).pop() ?? "";
function cursorDown(n) {
  return n > 0 ? import_ansi_escapes.default.cursorDown(n) : "";
}

class ScreenManager {
  rl;
  height = 0;
  extraLinesUnderPrompt = 0;
  cursorPos;
  constructor(rl) {
    this.rl = rl;
    this.rl = rl;
    this.cursorPos = rl.getCursorPos();
  }
  write(content) {
    this.rl.output.unmute();
    this.rl.output.write(content);
    this.rl.output.mute();
  }
  render(content, bottomContent = "") {
    const promptLine = lastLine(content);
    const rawPromptLine = import_strip_ansi.default(promptLine);
    let prompt = rawPromptLine;
    if (this.rl.line.length > 0) {
      prompt = prompt.slice(0, -this.rl.line.length);
    }
    this.rl.setPrompt(prompt);
    this.cursorPos = this.rl.getCursorPos();
    const width = readlineWidth();
    content = breakLines(content, width);
    bottomContent = breakLines(bottomContent, width);
    if (rawPromptLine.length % width === 0) {
      content += `
`;
    }
    let output = content + (bottomContent ? `
` + bottomContent : "");
    const promptLineUpDiff = Math.floor(rawPromptLine.length / width) - this.cursorPos.rows;
    const bottomContentHeight = promptLineUpDiff + (bottomContent ? height(bottomContent) : 0);
    if (bottomContentHeight > 0)
      output += import_ansi_escapes.default.cursorUp(bottomContentHeight);
    output += import_ansi_escapes.default.cursorTo(this.cursorPos.cols);
    this.write(cursorDown(this.extraLinesUnderPrompt) + import_ansi_escapes.default.eraseLines(this.height) + output);
    this.extraLinesUnderPrompt = bottomContentHeight;
    this.height = height(output);
  }
  checkCursorPos() {
    const cursorPos = this.rl.getCursorPos();
    if (cursorPos.cols !== this.cursorPos.cols) {
      this.write(import_ansi_escapes.default.cursorTo(cursorPos.cols));
      this.cursorPos = cursorPos;
    }
  }
  done({ clearContent }) {
    this.rl.setPrompt("");
    let output = cursorDown(this.extraLinesUnderPrompt);
    output += clearContent ? import_ansi_escapes.default.eraseLines(this.height) : `
`;
    output += import_ansi_escapes.default.cursorShow;
    this.write(output);
    this.rl.close();
  }
}

// ../../node_modules/@inquirer/core/dist/esm/lib/promise-polyfill.js
class PromisePolyfill extends Promise {
  static withResolver() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
}

// ../../node_modules/@inquirer/core/dist/esm/lib/create-prompt.js
function getCallSites() {
  const _prepareStackTrace = Error.prepareStackTrace;
  try {
    let result = [];
    Error.prepareStackTrace = (_, callSites) => {
      const callSitesWithoutCurrent = callSites.slice(1);
      result = callSitesWithoutCurrent;
      return callSitesWithoutCurrent;
    };
    new Error().stack;
    return result;
  } finally {
    Error.prepareStackTrace = _prepareStackTrace;
  }
}
function createPrompt(view) {
  const callSites = getCallSites();
  const callerFilename = callSites[1]?.getFileName?.();
  const prompt = (config, context = {}) => {
    const { input = process.stdin, signal } = context;
    const cleanups = new Set;
    const output = new import_mute_stream.default;
    output.pipe(context.output ?? process.stdout);
    const rl = readline2.createInterface({
      terminal: true,
      input,
      output
    });
    const screen = new ScreenManager(rl);
    const { promise, resolve, reject } = PromisePolyfill.withResolver();
    const cancel = () => reject(new CancelPromptError);
    if (signal) {
      const abort = () => reject(new AbortPromptError({ cause: signal.reason }));
      if (signal.aborted) {
        abort();
        return Object.assign(promise, { cancel });
      }
      signal.addEventListener("abort", abort);
      cleanups.add(() => signal.removeEventListener("abort", abort));
    }
    cleanups.add(onExit((code, signal2) => {
      reject(new ExitPromptError(`User force closed the prompt with ${code} ${signal2}`));
    }));
    const checkCursorPos = () => screen.checkCursorPos();
    rl.input.on("keypress", checkCursorPos);
    cleanups.add(() => rl.input.removeListener("keypress", checkCursorPos));
    return withHooks(rl, (cycle) => {
      const hooksCleanup = AsyncResource3.bind(() => effectScheduler.clearAll());
      rl.on("close", hooksCleanup);
      cleanups.add(() => rl.removeListener("close", hooksCleanup));
      cycle(() => {
        try {
          const nextView = view(config, (value) => {
            setImmediate(() => resolve(value));
          });
          if (nextView === undefined) {
            throw new Error(`Prompt functions must return a string.
    at ${callerFilename}`);
          }
          const [content, bottomContent] = typeof nextView === "string" ? [nextView] : nextView;
          screen.render(content, bottomContent);
          effectScheduler.run();
        } catch (error) {
          reject(error);
        }
      });
      return Object.assign(promise.then((answer) => {
        effectScheduler.clearAll();
        return answer;
      }, (error) => {
        effectScheduler.clearAll();
        throw error;
      }).finally(() => {
        cleanups.forEach((cleanup) => cleanup());
        screen.done({ clearContent: Boolean(context.clearPromptOnDone) });
        output.end();
      }).then(() => promise), { cancel });
    });
  };
  return prompt;
}
// ../../node_modules/@inquirer/confirm/dist/esm/index.js
function getBooleanValue(value, defaultValue) {
  let answer = defaultValue !== false;
  if (/^(y|yes)/i.test(value))
    answer = true;
  else if (/^(n|no)/i.test(value))
    answer = false;
  return answer;
}
function boolToString(value) {
  return value ? "Yes" : "No";
}
var esm_default2 = createPrompt((config, done) => {
  const { transformer = boolToString } = config;
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState("");
  const theme = makeTheme(config.theme);
  const prefix = usePrefix({ status, theme });
  useKeypress((key2, rl) => {
    if (isEnterKey(key2)) {
      const answer = getBooleanValue(value, config.default);
      setValue(transformer(answer));
      setStatus("done");
      done(answer);
    } else if (key2.name === "tab") {
      const answer = boolToString(!getBooleanValue(value, config.default));
      rl.clearLine(0);
      rl.write(answer);
      setValue(answer);
    } else {
      setValue(rl.line);
    }
  });
  let formattedValue = value;
  let defaultValue = "";
  if (status === "done") {
    formattedValue = theme.style.answer(value);
  } else {
    defaultValue = ` ${theme.style.defaultAnswer(config.default === false ? "y/N" : "Y/n")}`;
  }
  const message = theme.style.message(config.message, status);
  return `${prefix} ${message}${defaultValue} ${formattedValue}`;
});
// ../../node_modules/@inquirer/input/dist/esm/index.js
var inputTheme = {
  validationFailureMode: "keep"
};
var esm_default3 = createPrompt((config, done) => {
  const { required, validate = () => true } = config;
  const theme = makeTheme(inputTheme, config.theme);
  const [status, setStatus] = useState("idle");
  const [defaultValue = "", setDefaultValue] = useState(config.default);
  const [errorMsg, setError] = useState();
  const [value, setValue] = useState("");
  const prefix = usePrefix({ status, theme });
  useKeypress(async (key2, rl) => {
    if (status !== "idle") {
      return;
    }
    if (isEnterKey(key2)) {
      const answer = value || defaultValue;
      setStatus("loading");
      const isValid = required && !answer ? "You must provide a value" : await validate(answer);
      if (isValid === true) {
        setValue(answer);
        setStatus("done");
        done(answer);
      } else {
        if (theme.validationFailureMode === "clear") {
          setValue("");
        } else {
          rl.write(value);
        }
        setError(isValid || "You must provide a valid value");
        setStatus("idle");
      }
    } else if (isBackspaceKey(key2) && !value) {
      setDefaultValue(undefined);
    } else if (key2.name === "tab" && !value) {
      setDefaultValue(undefined);
      rl.clearLine(0);
      rl.write(defaultValue);
      setValue(defaultValue);
    } else {
      setValue(rl.line);
      setError(undefined);
    }
  });
  const message = theme.style.message(config.message, status);
  let formattedValue = value;
  if (typeof config.transformer === "function") {
    formattedValue = config.transformer(value, { isFinal: status === "done" });
  } else if (status === "done") {
    formattedValue = theme.style.answer(value);
  }
  let defaultStr;
  if (defaultValue && status !== "done" && !value) {
    defaultStr = theme.style.defaultAnswer(defaultValue);
  }
  let error = "";
  if (errorMsg) {
    error = theme.style.error(errorMsg);
  }
  return [
    [prefix, message, defaultStr, formattedValue].filter((v) => v !== undefined).join(" "),
    error
  ];
});
// src/configuration.ts
var import_nanospinner = __toESM(require_dist(), 1);
import fs from "node:fs";
import path from "node:path";

// src/sleep.ts
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// src/configuration.ts
async function seedDirectory(directory) {
  const spinner = import_nanospinner.createSpinner("Adding kent...").start();
  await sleep(200);
  const directoryPath = path.resolve(process.cwd(), directory);
  if (fs.existsSync(directoryPath)) {
    spinner.error({ text: `The directory ${directoryPath} already exists` });
    process.exit(1);
  } else {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
      spinner.success({
        text: `kent is now chilling in ${directoryPath}!`
      });
    } catch (error) {
      spinner.error(`Failed to add kent to "${directoryPath}"`);
      console.error(error.message);
      process.exit(1);
    }
  }
}
async function seedStarter(directory) {
  const spinner = import_nanospinner.createSpinner("Adding starter...").start();
  await sleep(200);
  const directoryPath = path.resolve(process.cwd(), directory);
  if (fs.existsSync(directoryPath)) {
    const sourceFile = "./starter.ts";
    const destination = path.resolve(directoryPath, sourceFile);
    fs.copyFile(sourceFile, destination, (error) => {
      if (error !== null) {
        spinner.error(`Failed to add starter to "${directoryPath}"`);
        console.error(error.message);
        process.exit(1);
      } else {
        spinner.success({ text: "Added starter!" });
      }
    });
  } else {
    spinner.error({ text: `The directory ${directoryPath} does not exist` });
  }
}
async function configuration() {
  const directory = await esm_default3({
    message: "What directory would you like kent to live?"
  });
  await seedDirectory(directory);
  const starter = await esm_default2({
    message: "Would you like the starter?"
  });
  if (starter) {
    await seedStarter(directory);
  }
}

// src/installation.ts
var import_nanospinner2 = __toESM(require_dist(), 1);
import { exec } from "child_process";
async function installation() {
  const spinner = import_nanospinner2.createSpinner("Installing kent...").start();
  await sleep(500);
  exec("echo npm install kent", (error) => {
    if (error !== null) {
      spinner.error({ text: "Failed to install kent" });
      process.exit(1);
    }
  });
  spinner.success({ text: "Kent installed!" });
}

// src/welcome.ts
function welcome() {
  console.log("\x1B[37m", "kent v1.0.0");
}

// src/index.ts
async function main() {
  welcome();
  await installation();
  await configuration();
}
await main();
