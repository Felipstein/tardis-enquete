"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/domain/errors/TooManyRequests.ts
var TooManyRequests_exports = {};
__export(TooManyRequests_exports, {
  default: () => TooManyRequests
});
module.exports = __toCommonJS(TooManyRequests_exports);

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

// src/domain/errors/TooManyRequests.ts
var TooManyRequests = class extends APIError {
  constructor(message = "Muitas requisi\xE7\xF5es, tente novamente mais tarde") {
    super(message, 429);
    this.name = "TooManyRequests";
  }
};
