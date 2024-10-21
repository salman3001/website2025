import { User, UserType } from "common/models/index.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { Collection, ObjectId } from "mongodb";

export class UserRepository implements IuserRepository {
  constructor(private userCollection: Collection<User>) {}

  async find() {
    const x = this.userCollection.find();
    return x.toArray();
  }

  async findOne(id: string) {
    const user = await this.userCollection.insertOne();
    return {};
  }

  async create(dto: CreateUserDto) {
    const user = await this.userCollection.insertOne(
      {
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {},
    );

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...dto,
          updatedAt: new Date(),
        },
      },
      {},
    );

    return user;
  }

  async delete(id: string) {
    return this.user;
  }
}
