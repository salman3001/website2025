import { PartialType } from '@nestjs/swagger';
import { CreateMediaCategoryDto } from './create-media-category.dto';

export class UpdateMediaCategoryDto extends PartialType(
  CreateMediaCategoryDto,
) {}
