import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSeoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  keyword?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  desc?: string;
}
