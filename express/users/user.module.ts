import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";
import { UserRepository } from "./user.repository.js";
import { BaseController } from "common/abstract/base-controller.js";

class UserModule {
  // controller
  private _controller: BaseController;
  get controller(): BaseController {
    if (!this._controller) {
      this._controller = new UserController(this.UserService);
    }
    return this._controller;
  }

  // user service
  private _userService: UserService;
  get UserService() {
    if (!this._userService)
      this._userService = new UserService(this.UserRepository);
    return this._userService;
  }

  // user repository
  private _userRepository: IuserRepository;
  get UserRepository() {
    if (!this._userRepository) this._userRepository = new UserRepository();
    return this._userRepository;
  }
}

export const userModule = new UserModule();
