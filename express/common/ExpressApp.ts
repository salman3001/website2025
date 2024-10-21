import { Application, ErrorRequestHandler, Handler } from "express";
import express from "express";
import { ControllerModule } from "./abstract/controller-module.js";

export interface ExpressAppOptions {
  modules: ControllerModule[];
  globalMiddlewares: Handler[];
  notFoundMiddleware: Handler;
  globalExceptionMiddleware: ErrorRequestHandler;
}

export class ExpressApp {
  app: Application;
  protected appOptions: ExpressAppOptions;

  constructor(opt: ExpressAppOptions) {
    this.app = express();
    this.appOptions = opt;
  }

  private applyMiddlewaresAndControllers() {
    this.appOptions.globalMiddlewares.forEach((mw) => {
      this.app.use(mw);
    });

    this.appOptions.modules.forEach((module) => {
      this.app.use(module.controller.router);
    });

    this.app.use(this.appOptions.notFoundMiddleware);
    this.app.use(this.appOptions.globalExceptionMiddleware);
  }

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
