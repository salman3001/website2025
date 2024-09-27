import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

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
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  images: string[];

  @ApiProperty()
  @IsString()
  video?: string;
}
