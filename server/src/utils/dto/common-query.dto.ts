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
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptionalEmpty()
  skip: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptionalEmpty()
  take: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptionalEmpty()
  orderBy: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  select: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptionalEmpty()
  search: string;
}
