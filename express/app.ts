import { extendAppMiddleware } from "common/middlewares/extend-app-middleware.js";
import { globalExceptionMiddleware } from "common/middlewares/globalExceptionMiddleware.js";
import { handleNotFoundMiddleware } from "common/middlewares/handle-not-found-middleware.js";
import cookieParser from "cookie-parser";
import express from "express";
import { join } from "node:path";
import { userModule } from "users/user.module.js";

export class ExpressApp {
  /**
   * express app instance
   */
  app: express.Application;

  constructor() {
    this.app = express();
  }

  private applyMiddlewaresAndControllers() {
    // midlewares
    this.app.use(extendAppMiddleware);
    this.app.use(express.static(join(process.cwd(), "public")));
    this.app.use(express.json({}));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // controllers
    this.app.use("/users", userModule.controller.router);

    //not found middleware
    this.app.use(handleNotFoundMiddleware);

    // global exception handler
    this.app.use(globalExceptionMiddleware);
  }

  /**
   * Boot Application
   */
  boot(port: number, cb?: () => void) {
    this.applyMiddlewaresAndControllers();
    this.app.listen(port, () => {
      if (cb) {
        cb();
        return;
      }
      console.log(`app running on localhost:${port}`);
    });
  }
}
