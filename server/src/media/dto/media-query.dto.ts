import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class MediaQueryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  skip: number;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  take: number;

  //   @ApiProperty()
  //   @IsString()
  //   @IsOptionalEmpty()
  //   orderBy: string;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  search: string;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  mediaCategoryId: number;
}
