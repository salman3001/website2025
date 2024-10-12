import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  desc?: string;
}
