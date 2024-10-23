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
    return [];
  }

  protected get handlers(): BaseControllerHandlers {
    return [
      {
        path: "/",
        method: "get",
        handler: async (_req, res) => {
          const data = await this.userService.findAll();
          res.custom({ code: 200, success: true, data });
        },
      },
      {
        path: "/",
        method: "post",
        handler: async (req, res) => {
          console.log(req.body);

          const dto = createUserDtoSchema.parse(req.body);
          const data = await this.userService.create(dto);
          res.custom({
            code: 201,
            success: true,
            data,
            message: "User Created",
          });
        },
      },
      {
        path: "/:id",
        method: "get",
        handler: async (req, res) => {
          const id = req.params.id;
          const data = await this.userService.findOne(+id);
          res.custom({ code: 200, success: true, data });
        },
      },

      {
        path: "/:id",
        method: "patch",
        handler: async (req, res) => {
          const id = req.params.id;
          const dto = updateUserDtoSchema.parse(req.body);
          const data = await this.userService.update(+id, dto);
          res.custom({
            code: 200,
            success: true,
            data,
            message: "User Updated",
          });
        },
      },

      {
        path: "/:id",
        method: "delete",
        handler: async (req, res) => {
          const id = req.params.id;
          const data = await this.userService.delete(+id);
          res.custom({
            code: 200,
            success: true,
            data,
            message: "User deleted",
          });
        },
      },
    ];
  }
}
