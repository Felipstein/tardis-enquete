"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/env.ts
var import_zod = require("zod");
var envVariablesSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]),
  DATABASE_URL: import_zod.z.string(),
  PORT: import_zod.z.string().default("3333"),
  ORIGIN: import_zod.z.string(),
  DISCORD_CLIENT_ID: import_zod.z.string(),
  DISCORD_SECRET_KEY: import_zod.z.string()
});
try {
  const parsed = envVariablesSchema.parse(process.env);
  process.env = __spreadValues(__spreadValues({}, process.env), parsed);
  console.info("Environment variables loaded.");
} catch (err) {
  if (err instanceof import_zod.ZodError) {
    const variables = err.issues.map((issue) => ({
      env: issue.path.join("."),
      message: issue.message
    }));
    console.error("\nWrong environment variables:");
    variables.forEach((variable) => {
      console.error(`- ${variable.env}: ${variable.message}`);
    });
    process.exit(-1);
  }
  throw err;
}
