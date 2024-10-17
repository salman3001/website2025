import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class ProjectQueryDto extends CommonQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  tagSlug: string;
}

export class ProjectFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
