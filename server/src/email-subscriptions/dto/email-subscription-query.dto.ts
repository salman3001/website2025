import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class EmailSubscriptionQueryDto extends CommonQueryDto {}

export class EmailSubscriptionFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
