import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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
  @IsOptional()
  parentId: number;
}
