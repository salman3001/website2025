import { BaseController } from "./base-controller.js";

export type ModuleControllers = {
  controller: BaseController;
  path: string;
}[];

export abstract class ControllerModule {
  abstract get controller(): BaseController;

  constructor() {
    this.applyControllerMiddlerwares();
    this.mapControllerHandlers();
  }

  private applyControllerMiddlerwares() {
    this.controller.controllerMiddlewares.forEach((mw) => {
      this.controller.router.use(mw);
    });
  }

  private mapControllerHandlers() {
    this.controller.handlers.forEach((handler) => {
      this.controller.router[handler.method](
        handler.path,
        ...(handler.middlewares || []),
        handler.handler,
      );
    });
  }
}
