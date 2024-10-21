import { configModule } from "modules/config/config.module.js";
import { ExpressApp } from "common/ExpressApp.js";
import { userModule } from "modules/users/user.module.js";
import { extendAppMiddleware } from "common/middlewares/extend-app-middleware.js";
import { join } from "node:path";
import cookieParser from "cookie-parser";
import { static as _static, json, urlencoded } from "express";
import { handleNotFoundMiddleware } from "common/middlewares/handle-not-found-middleware.js";
import { globalExceptionMiddleware } from "common/middlewares/globalExceptionMiddleware.js";

const { EnvConfig } = configModule;

const app = new ExpressApp({
  globalMiddlewares: [
    extendAppMiddleware,
    _static(join(process.cwd(), "public")),
    json({}),
    urlencoded({ extended: true }),
    cookieParser(),
  ],
  modules: [userModule],
  notFoundMiddleware: handleNotFoundMiddleware,
  globalExceptionMiddleware: globalExceptionMiddleware,
});

app.boot(EnvConfig.envs.port);
