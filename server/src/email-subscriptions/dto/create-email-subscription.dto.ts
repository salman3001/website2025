import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateEmailSubscriptionDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  blogCategorySlugs: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tagSlugs: string[];
}
