import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateSeoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptionalEmpty()
  title?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptionalEmpty()
  keyword?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptionalEmpty()
  desc?: string;
}
