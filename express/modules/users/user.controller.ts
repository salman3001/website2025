import { Handler, Router } from "express";
import { IUserService } from "./interfaces/IUserService.js";
import { BaseController } from "utils/base-classes/base-controller.js";
import { defineAsyncHandler } from "utils/defineAsyncHandler.js";

export class UserController extends BaseController {
  constructor(private userService: IUserService) {
    super();
    this.mapHandler();
  }

  private mapHandler() {
    this.router.get("/users", this.get);
  }

  get: Handler = async (_req, res, next) => {
    const users = this.userService.getUsers();

    res.send(users);
  };
}
