import { IBaseFindAllOptions } from "./IBaseFindAllOptions.js";

export interface IBaseRepository<Model, CreateDto, UpdateDTO> {
  findAll(opt?: IBaseFindAllOptions): Promise<Model[]>;
  findOne(id: number | string): Promise<Model>;
  create(dto: CreateDto): Promise<{ createdId: string | number }>;
  update(
    id: number | string,
    dto: UpdateDTO,
  ): Promise<{ updatedId: string | number }>;
  delete(id: number | string): Promise<{ deletedId: string | number }>;
}
