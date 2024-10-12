import { PickType } from '@nestjs/swagger';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';

export class ProjectQueryDto extends CommonQueryDto {}

export class ProjectFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
