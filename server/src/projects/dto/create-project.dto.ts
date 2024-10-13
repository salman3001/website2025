import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 256)
  shortDesc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptionalEmpty()
  desc?: string;

  @ApiProperty()
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  thumbnailId: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  imagesIds: number[];

  @ApiProperty()
  @IsString()
  video?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tagSlugs?: string[];
}
