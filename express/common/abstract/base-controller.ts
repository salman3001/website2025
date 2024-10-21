import { Handler, Router } from "express";

export type BaseControllerHandlers = {
  path: string;
  method: "get" | "post" | "patch" | "delete";
  handler: Handler;
  middlewares?: Handler[];
}[];

export abstract class BaseController {
  router: Router;
  protected abstract get handlers(): BaseControllerHandlers;
  protected get controllerMiddlewares(): Handler[] {
    console.log("called from base controller");

    return [];
  }

  constructor() {
    this.router = Router();
    this.applyControllerMiddlerwares();
    this.mapControllerHandlers();
  }

  private applyControllerMiddlerwares() {
    this.controllerMiddlewares.forEach((mw) => {
      this.router.use(mw);
    });
  }

  private mapControllerHandlers() {
    this.handlers.forEach((handler) => {
      this.router[handler.method](
        handler.path,
        ...(handler.middlewares || []),
        handler.handler,
      );
    });
  }
}
