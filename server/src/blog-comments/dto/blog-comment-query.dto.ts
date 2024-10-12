import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogCommentQueryDto extends CommonQueryDto {
  @IsString()
  @IsOptionalEmpty()
  blogSlug: string;
}

export class BlogCommentFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
