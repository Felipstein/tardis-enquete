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

// src/utils/getHostURLInRequest.ts
var getHostURLInRequest_exports = {};
__export(getHostURLInRequest_exports, {
  getHostURLInRequest: () => getHostURLInRequest
});
module.exports = __toCommonJS(getHostURLInRequest_exports);
function getHostURLInRequest(req) {
  var _a, _b;
  const hostname = (_b = (_a = req.headers.host) != null ? _a : req.get("host")) != null ? _b : `localhost:${process.env.PORT}`;
  const hostURL = `${req.protocol}://${hostname}`;
  return hostURL;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHostURLInRequest
});
