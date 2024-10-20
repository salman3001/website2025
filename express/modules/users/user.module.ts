import { UserService } from "./user.service.js";
import { UserRepository } from "./user.repository.js";
import { UserController } from "./user.controller.js";
import { IUserService } from "./interfaces/IUserService.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";

class UserModule {
  private _userService: IUserService;
  get UserService() {
    if (!this._userService)
      this._userService = new UserService(this.UserRepository);
    return this._userService;
  }

  private _userRepository: IuserRepository;
  get UserRepository() {
    if (!this._userRepository) this._userRepository = new UserRepository();
    return this._userRepository;
  }

  private _userController: UserController;
  get UserController() {
    if (!this._userController)
      this._userController = new UserController(this.UserService);
    return this._userController;
  }
}

export const userModule = new UserModule();
