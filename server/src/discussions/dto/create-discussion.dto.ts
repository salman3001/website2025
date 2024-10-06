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
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

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
  @IsOptionalEmpty()
  Published: boolean;

  @ApiProperty()
  @IsArray()
  @Type(() => String)
  @ValidateNested({ each: true })
  @IsOptionalEmpty()
  tagSlugs?: string[];

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateSeoDto)
  @IsOptionalEmpty()
  seo?: CreateSeoDto;
}
