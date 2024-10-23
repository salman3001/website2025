import { IBaseFindAllOptions } from "database/interfaces/IBaseFindAllOptions.js";
import { SqlDb } from "./sql-db.js";
import { IBaseRepository } from "database/interfaces/IBaseRepository.js";

export class BaseSqlRepository<Model, CreateDto, UpdateDTO>
  implements IBaseRepository<Model, CreateDto, UpdateDTO>
{
  constructor(protected sqlDb: SqlDb, private tableName: string) {}

  async findAll(opt?: IBaseFindAllOptions) {
    const query = this.sqlDb.Db.selectFrom(this.tableName as any).selectAll();

    if (opt?.search) {
      const [key, value] = opt.search.split(":");
      query.where(key as any, "ilike", value);
    }

    if (opt?.orderBy) {
      query.orderBy(opt?.orderBy as any);
    }

    query.offset(opt?.offset || 0);
    query.limit(opt?.limit || 20);
    const data = (await query.execute()) as Model[];

    return data;
  }

  async findOne(id: number | string) {
    const query = this.sqlDb.Db.selectFrom(this.tableName as any)
      .selectAll()
      .where("id", "=", id);

    const data = (await query.executeTakeFirstOrThrow()) as Model;

    return data;
  }

  async create(dto: CreateDto) {
    const res = await this.sqlDb.Db.insertInto(this.tableName as any)
      .values(dto as any)
      .executeTakeFirst();

    return { createdId: res.insertId as unknown as number };
  }

  async update(id: number | string, dto: UpdateDTO) {
    await this.sqlDb.Db.updateTable(this.tableName as any)
      .where("id", "=", id)
      .set(dto as any)
      .executeTakeFirst();

    return { updatedId: id };
  }

  async delete(id: number | string) {
    await this.sqlDb.Db.deleteFrom(this.tableName as any)
      .where("id", "=", id)
      .executeTakeFirst();

    return { deletedId: id };
  }
}
