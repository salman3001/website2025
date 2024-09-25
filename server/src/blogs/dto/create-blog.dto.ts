import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateSeoDto } from 'src/seo/dto/create-seo.dto';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  shortDesc: string;

  @IsString()
  @IsOptional()
  longDesc: string;

  @IsBoolean()
  @IsOptional()
  longPublished: boolean;

  @IsString()
  @IsOptional()
  blogCategorySlug?: string;

  @IsArray()
  @Type(() => String)
  @ValidateNested({ each: true })
  @IsOptional()
  tagSlugs?: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  @IsOptional()
  seo?: CreateSeoDto;
}
