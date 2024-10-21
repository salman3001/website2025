import { CreateUserDto } from "./dto/create-user.dto.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

export class UserRepository implements IuserRepository {
  user = { name: "salman" };

  async find() {
    return this.user;
  }

  async findOne(id: string) {
    return this.user;
  }

  async create(dto: CreateUserDto) {
    return this.user;
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.user;
  }

  async delete(id: string) {
    return this.user;
  }
}
