import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateSeoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  keyword?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  desc?: string;
}
