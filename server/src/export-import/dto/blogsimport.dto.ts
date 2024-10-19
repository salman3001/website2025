import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogsImportDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  shortDesc: string;

  @IsString()
  longDesc: string;

  @IsBoolean()
  @IsOptionalEmpty()
  isPublished: boolean;

  @IsBoolean()
  @IsOptionalEmpty()
  isFeatured: boolean;

  @IsString()
  @IsOptionalEmpty()
  blogCategorySlug: string;

  @IsNumber()
  @IsOptionalEmpty()
  mediaId: boolean;

  @IsNumber()
  @IsOptionalEmpty()
  userId: boolean;
}
