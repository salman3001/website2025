import { IuserRepository } from "./interfaces/IuserRepository.js";
import { UserRepository } from "./user.repository.js";

export class UserService {
  constructor(private userRepo: IuserRepository) {}

  getUsers() {
    return this.userRepo.find();
  }
}
