import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateBlogCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  desc?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  iconsMediaId?: number;
}
