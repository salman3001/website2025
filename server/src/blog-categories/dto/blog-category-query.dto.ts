import { PickType } from '@nestjs/swagger';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';

export class BlogCategoryQueryDto extends CommonQueryDto {}

export class BlogCategoryFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
