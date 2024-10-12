import { PickType } from '@nestjs/swagger';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';

export class UserQueryDto extends CommonQueryDto {}

export class UserFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
