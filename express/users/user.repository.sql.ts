import { CreateUserDto } from "./dto/create-user.dto.js";
import { IuserRepository } from "./interfaces/IuserRepository.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { SqlDb } from "database/sql/sql-db.js";
import { User } from "common/models/user.js";
import { BaseSqlRepository } from "database/sql/BaseSqlRepository.js";

export class UserRepositorySql
  extends BaseSqlRepository<User, CreateUserDto, UpdateUserDto>
  implements IuserRepository
{
  constructor(sqlDb: SqlDb) {
    super(sqlDb, "users");
  }
}
