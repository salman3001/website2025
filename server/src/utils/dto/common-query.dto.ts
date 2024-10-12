import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CommonQueryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  skip: number;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  take: number;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  orderBy: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @Type(() => String)
  select: string[];

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  search: string;
}
