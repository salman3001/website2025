import { IuserRepository } from "./interfaces/IuserRepository.js";

export class UserRepository implements IuserRepository {
  constructor() {
    console.log("repo initialized");
  }
  find() {
    return " All Users from repository";
  }
}
