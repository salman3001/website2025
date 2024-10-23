import type { User } from "common/models/user.js";
import { CreateUserDto } from "../dto/create-user.dto.js";
import { UpdateUserDto } from "../dto/update-user.dto.js";
import { IBaseRepository } from "database/interfaces/IBaseRepository.js";

export interface IuserRepository
  extends IBaseRepository<User, CreateUserDto, UpdateUserDto> {}
