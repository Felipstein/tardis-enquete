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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/infra/factories/services.ts
var services_exports = {};
__export(services_exports, {
  factoryDiscordService: () => factoryDiscordService
});
module.exports = __toCommonJS(services_exports);

// src/services/DiscordService.ts
var import_querystring = __toESM(require("querystring"));
var import_axios = __toESM(require("axios"));
var import_zod = require("zod");
var defaultServiceBuilder = import_zod.z.object({
  clientId: import_zod.z.string().optional(),
  secretKey: import_zod.z.string().optional()
});
var DefaultService = class {
  constructor(builder) {
    var _a, _b;
    this.clientId = (_a = builder == null ? void 0 : builder.clientId) != null ? _a : process.env.DISCORD_CLIENT_ID;
    this.secretKey = (_b = builder == null ? void 0 : builder.secretKey) != null ? _b : process.env.DISCORD_SECRET_KEY;
    this.discordAPI = import_axios.default.create({
      baseURL: "https://discord.com"
    });
    this.discordAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        var _a2, _b2, _c, _d;
        if (error instanceof import_axios.AxiosError && ((_b2 = (_a2 = error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.error) && ((_d = (_c = error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.error_description)) {
          const { error: error_name, error_description } = error.response.data;
          const errorInstance = new Error(error_description);
          errorInstance.name = error_name;
          throw errorInstance;
        }
        throw error;
      }
    );
  }
  getConsentOAuthURL(redirectBaseURL) {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${redirectBaseURL}/auth/discord/callback&scope=identify+email`;
    return url;
  }
  exchangeCodeForToken(code, redirectBaseURL) {
    return __async(this, null, function* () {
      const payload = {
        client_id: this.clientId,
        client_secret: this.secretKey,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${redirectBaseURL}/auth/discord/callback`
      };
      const response = yield this.discordAPI.post(
        "/api/oauth2/token",
        import_querystring.default.stringify(payload),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      return response.data;
    });
  }
  getUserInfo(accessToken) {
    return __async(this, null, function* () {
      const response = yield this.discordAPI.get("/api/users/@me");
      console.log(response.data);
    });
  }
};

// src/infra/factories/services.ts
var discordService = new DefaultService();
function factoryDiscordService() {
  return discordService;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  factoryDiscordService
});
