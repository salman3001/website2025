import { PickType } from '@nestjs/swagger';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';

export class TagQueryDto extends CommonQueryDto {}

export class TagFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
