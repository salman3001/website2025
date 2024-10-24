import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class MediaQueryDto extends CommonQueryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  mediaCategoryId: number;
}

export class MediaFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
