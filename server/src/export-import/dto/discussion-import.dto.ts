import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class DiscussionImportDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  desc: string;

  @IsBoolean()
  @IsOptionalEmpty()
  isPublished: boolean;

  @IsNumber()
  @IsOptionalEmpty()
  views: boolean;

  @IsNumber()
  userId: boolean;
}
