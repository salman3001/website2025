import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";

export class UserService {
  constructor(private userRepo: IuserRepository) {}

  async find() {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    return this.userRepo.findOne(id);
  }

  async create(dto: CreateUserDto) {
    return this.userRepo.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  async delete(id: string) {
    return this.userRepo.delete(id);
  }
}
