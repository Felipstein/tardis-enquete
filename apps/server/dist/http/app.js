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

// src/http/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_express_async_errors = require("express-async-errors");
var import_compression = __toESM(require("compression"));
var import_cors = __toESM(require("cors"));
var import_express3 = __toESM(require("express"));
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var import_helmet = __toESM(require("helmet"));
var import_morgan = __toESM(require("morgan"));

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

// src/http/middlewares/errorHandlerMiddleware.ts
var import_axios = require("axios");
var import_chalk = __toESM(require("chalk"));

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

// src/http/routes/index.ts
var import_express2 = require("express");

// src/http/routes/oauthRoutes.ts
var import_express = require("express");

// src/http/controllers/OAuthController.ts
var import_chalk2 = __toESM(require("chalk"));

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
        console.error(import_chalk2.default.red("An error occorrured in Discord OAuth Callback Handler:", errorInstance.message));
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
var import_axios2 = __toESM(require("axios"));
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
    this.discordAPI = import_axios2.default.create({
      baseURL: "https://discord.com"
    });
    this.discordAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        var _a2, _b2, _c, _d;
        if (error instanceof import_axios2.AxiosError && ((_b2 = (_a2 = error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.error) && ((_d = (_c = error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.error_description)) {
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

// src/http/routes/index.ts
var routes = (0, import_express2.Router)();
routes.use(route);

// src/http/app.ts
var app = (0, import_express3.default)();
app.use(import_express3.default.json());
app.use((0, import_compression.default)());
app.use((0, import_helmet.default)());
app.use(
  (0, import_cors.default)({
    origin: process.env.ORIGIN
  })
);
app.use(
  (0, import_express_rate_limit.default)({
    windowMs: 60 * 1e3,
    max: 100,
    handler() {
      throw new TooManyRequests();
    }
  })
);
app.use((0, import_morgan.default)(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(routes);
app.use(errorHandler);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
