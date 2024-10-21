import type { User } from "common/models/user.js";
import { CreateUserDto } from "../dto/create-user.dto.js";
import { UpdateUserDto } from "../dto/update-user.dto.js";

export interface IuserRepository {
  find: () => Promise<User[]>;
  findOne: (id: string) => Promise<User>;
  create: (dto: CreateUserDto) => Promise<User>;
  update: (id: string, dto: UpdateUserDto) => Promise<User>;
  delete: (id: string) => Promise<User>;
}
