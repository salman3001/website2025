import { Handler } from "express";
import { UserService } from "./user.service.js";
import { createUserDtoSchema } from "./dto/create-user.dto.js";
import { updateUserDtoSchema } from "./dto/update-user.dto.js";
import {
  BaseController,
  BaseControllerHandlers,
} from "common/abstract/base-controller.js";

export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  protected get controllerMiddlewares(): Handler[] {
    console.log("called from user Controller");

    return [];
  }

  protected get handlers(): BaseControllerHandlers {
    return [
      {
        path: "/",
        method: "get",
        handler: async (_req, res) => {
          const users = await this.userService.find();
          res.send(users);
        },
      },
      {
        path: "/",
        method: "post",
        handler: async (req, res) => {
          console.log(req.body);

          const dto = createUserDtoSchema.parse(req.body);
          const users = await this.userService.create(dto);
          res.send(users);
        },
      },
      {
        path: "/:id",
        method: "get",
        handler: async (req, res) => {
          const id = req.params.id;
          const users = await this.userService.findOne(id);
          res.send(users);
        },
      },

      {
        path: "/:id",
        method: "patch",
        handler: async (req, res) => {
          const id = req.params.id;
          const dto = updateUserDtoSchema.parse(req.body);
          const users = await this.userService.update(id, dto);
          res.send(users);
        },
      },

      {
        path: "/:id",
        method: "delete",
        handler: async (req, res) => {
          const id = req.params.id;
          const users = await this.userService.delete(id);
          res.send(users);
        },
      },
    ];
  }
}
