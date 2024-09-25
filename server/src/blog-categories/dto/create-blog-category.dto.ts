import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBlogCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  title: string;

  @IsString()
  @IsOptional()
  desc?: string;
}
