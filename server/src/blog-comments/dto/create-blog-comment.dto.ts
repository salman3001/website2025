import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateBlogCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  message: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  blogSlug: string;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  parentId: number;
}
