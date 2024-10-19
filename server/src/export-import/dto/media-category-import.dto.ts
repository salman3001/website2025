import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MediaCategoryImportDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
