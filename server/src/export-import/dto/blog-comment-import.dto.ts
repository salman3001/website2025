import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogCommentImportDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  message: string;

  @IsBoolean()
  @IsOptionalEmpty()
  isApproved: number;

  @IsString()
  @IsNotEmpty()
  @IsOptionalEmpty()
  blogSlug: string;

  @IsNumber()
  @IsOptionalEmpty()
  parentId: number;

  @IsNumber()
  @IsOptionalEmpty()
  userId: number;
}
