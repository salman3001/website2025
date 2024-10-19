import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class ProjectImportDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  shortDesc: string;

  @IsString()
  @IsOptionalEmpty()
  desc: string;

  @IsBoolean()
  @IsOptionalEmpty()
  isPublished: boolean;

  @IsNumber()
  @IsOptionalEmpty()
  thumbnailId: number;

  @IsString()
  @IsOptionalEmpty()
  video: string;
}
