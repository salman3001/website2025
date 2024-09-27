import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  desc?: string;
}
