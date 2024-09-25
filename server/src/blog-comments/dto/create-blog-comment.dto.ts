import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBlogCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  message: string;

  @IsString()
  @IsNotEmpty()
  blogSlug: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
