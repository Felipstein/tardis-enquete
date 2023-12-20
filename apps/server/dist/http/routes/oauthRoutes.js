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

// src/http/routes/oauthRoutes.ts
var oauthRoutes_exports = {};
__export(oauthRoutes_exports, {
  oauthRoutes: () => route
});
module.exports = __toCommonJS(oauthRoutes_exports);
var import_express = require("express");

// src/http/controllers/OAuthController.ts
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

// src/utils/getHostURLInRequest.ts
function getHostURLInRequest(req) {
  var _a, _b;
  const hostname = (_b = (_a = req.headers.host) != null ? _a : req.get("host")) != null ? _b : `localhost:${process.env.PORT}`;
  const hostURL = `${req.protocol}://${hostname}`;
  return hostURL;
}

// src/http/controllers/OAuthValidations.ts
var import_zod = require("zod");
var handleDiscordCallbackQueryRequest = import_zod.z.object({
  code: import_zod.z.string()
});

// src/http/controllers/OAuthController.ts
var OAuthController = class {
  constructor(discordService2) {
    this.discordService = discordService2;
  }
  redirectToDiscordOAuthURL(req, res) {
    return __async(this, null, function* () {
      const redirectBaseURL = getHostURLInRequest(req);
      const url = this.discordService.getConsentOAuthURL(redirectBaseURL);
      return res.redirect(url);
    });
  }
  handleDiscordCallback(req, res) {
    return __async(this, null, function* () {
      try {
        const { code } = handleDiscordCallbackQueryRequest.parse(req.query);
        const redirectBaseURL = getHostURLInRequest(req);
        const data = yield this.discordService.exchangeCodeForToken(code, redirectBaseURL);
        yield this.discordService.getUserInfo(data.access_token);
        return res.json(data);
      } catch (error) {
        let errorInstance;
        if (error instanceof Error) {
          errorInstance = error;
        } else if (typeof error === "string") {
          errorInstance = new Error(error);
        } else {
          errorInstance = new Error("Erro desconhecido");
        }
        console.error(import_chalk.default.red("An error occorrured in Discord OAuth Callback Handler:", errorInstance.message));
        throw new InternalServerError(
          "Ocorreu um erro na finaliza\xE7\xE3o da sua autentica\xE7\xE3o com o Discord",
          500,
          errorInstance
        );
      }
    });
  }
};

// src/services/DiscordService.ts
var import_querystring = __toESM(require("querystring"));
var import_axios = __toESM(require("axios"));
var import_zod2 = require("zod");
var defaultServiceBuilder = import_zod2.z.object({
  clientId: import_zod2.z.string().optional(),
  secretKey: import_zod2.z.string().optional()
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

// src/infra/factories/controllers.ts
var oAuthController = new OAuthController(factoryDiscordService());
function factoryOAuthController() {
  return oAuthController;
}

// src/http/routes/oauthRoutes.ts
var route = (0, import_express.Router)();
var controller = factoryOAuthController();
route.get("/auth/discord/login", controller.redirectToDiscordOAuthURL.bind(controller));
route.get("/auth/discord/callback", controller.handleDiscordCallback.bind(controller));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  oauthRoutes
});
