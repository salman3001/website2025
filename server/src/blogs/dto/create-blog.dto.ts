import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateSeoDto } from 'src/seo/dto/create-seo.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateBlogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  shortDesc: string;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  longDesc: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptionalEmpty()
  isPublished: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptionalEmpty()
  isFeatured: boolean;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  blogCategorySlug?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tagSlugs?: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  mediaId?: number;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  @IsOptionalEmpty()
  seo?: CreateSeoDto;
}
