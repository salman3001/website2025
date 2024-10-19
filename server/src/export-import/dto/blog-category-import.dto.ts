import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogategoryImportDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  slug: string;

  @IsString()
  @IsOptionalEmpty()
  desc?: string;

  @IsNumber()
  @IsOptionalEmpty()
  mediaId?: number;
}
