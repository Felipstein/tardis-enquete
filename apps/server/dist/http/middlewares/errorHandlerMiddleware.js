"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/middlewares/errorHandlerMiddleware.ts
var errorHandlerMiddleware_exports = {};
__export(errorHandlerMiddleware_exports, {
  errorHandler: () => errorHandler
});
module.exports = __toCommonJS(errorHandlerMiddleware_exports);
var import_axios = require("axios");
var import_chalk = __toESM(require("chalk"));

// src/domain/errors/APIError.ts
var APIError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
  }
  toString() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      debug: {
        stack: this.stack || new Error().stack
      }
    };
  }
};

// src/domain/errors/InternalServerError.ts
var InternalServerError = class extends APIError {
  constructor(message = "Erro interno do servidor", statusCode = 500, originalError = void 0) {
    super(message, statusCode);
    this.originalError = originalError;
    this.name = "InternalServerError";
  }
};

// src/http/middlewares/errorHandlerMiddleware.ts
function errorHandler(error, req, res, next) {
  var _a, _b, _c, _d;
  const line = "#".repeat(8);
  const { name } = error;
  const { message } = error;
  let statusCode;
  const debug = {
    stack: error.stack || new Error().stack
  };
  if (error instanceof APIError) {
    statusCode = error.statusCode;
    if (error instanceof InternalServerError) {
      if (error.originalError) {
        debug.internalServerError = {
          name: error.originalError.name,
          message: error.originalError.message,
          stack: error.originalError.stack
        };
      }
      console.error("");
      console.error(import_chalk.default.red(line, "INTERNAL SERVER ERROR", line));
      console.error((_a = error.originalError) != null ? _a : error);
      console.error("");
      console.error(import_chalk.default.red("Caused on route"), req.path);
      console.error(import_chalk.default.red(line, "INTERNAL SERVER ERROR", line));
      console.error("");
    } else if (process.env.NODE_ENV === "development") {
      console.warn("");
      console.warn(import_chalk.default.yellow(line, "API ERROR", line));
      console.warn(error);
      console.warn("");
      console.warn(import_chalk.default.yellow("Caused on route"), req.path);
      console.warn(import_chalk.default.yellow(line, "API ERROR", line));
      console.warn("");
    }
  } else {
    statusCode = 500;
    const errorPrinter = error instanceof import_axios.AxiosError ? (_d = (_c = (_b = error.response) == null ? void 0 : _b.data) != null ? _c : error.response) != null ? _d : error : error;
    console.error("");
    console.error(import_chalk.default.red(line, "UNKNOWN INTERNAL ERROR", line));
    console.error(errorPrinter);
    console.error("");
    console.error(import_chalk.default.red("Caused on route"), req.path);
    console.error(import_chalk.default.red(line, "UNKNOWN INTERNAL ERROR", line));
    console.error("");
  }
  return res.status(statusCode).json({
    name,
    message,
    statusCode,
    debug: process.env.NODE_ENV !== "production" ? debug : void 0
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler
});
