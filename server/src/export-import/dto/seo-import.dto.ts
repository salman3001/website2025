import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class SeoImportDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptionalEmpty()
  title: string;

  @IsString()
  @IsOptionalEmpty()
  keyword: string;

  @IsString()
  @IsOptionalEmpty()
  desc: string;

  @IsString()
  @IsOptionalEmpty()
  blogSlug: string;

  @IsString()
  @IsOptionalEmpty()
  discussionSlug: string;
}
