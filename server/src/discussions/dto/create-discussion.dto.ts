import { ApiProperty } from '@nestjs/swagger';
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

export class CreateDiscussionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  desc: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  Published: boolean;

  @ApiProperty()
  @IsArray()
  @Type(() => String)
  @ValidateNested({ each: true })
  @IsOptional()
  tagSlugs?: string[];

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  @IsOptional()
  seo?: CreateSeoDto;
}
