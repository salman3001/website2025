import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";

export class UserService {
  constructor(private userRepo: IuserRepository) {}

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  async create(dto: CreateUserDto) {
    return this.userRepo.create(dto);
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  async delete(id: number) {
    return this.userRepo.delete(id);
  }
}
