import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class DiscussionQueryDto extends CommonQueryDto {}

export class DiscussionFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
