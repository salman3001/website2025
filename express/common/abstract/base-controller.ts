import { Handler, Router } from "express";

export type BaseControllerHandlers = {
  path: string;
  method: "get" | "post" | "patch" | "delete";
  handler: Handler;
  middlewares?: Handler[];
}[];

export abstract class BaseController {
  router: Router;
  abstract handlers: BaseControllerHandlers;
  abstract controllerMiddlewares: Handler[];

  constructor() {
    this.router = Router();
  }
}
