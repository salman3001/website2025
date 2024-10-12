import { PickType } from '@nestjs/swagger';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';

export class MediaCategoryQueryDto extends CommonQueryDto {}

export class MediaCategoryFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
