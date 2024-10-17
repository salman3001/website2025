import { PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogCommentQueryDto extends CommonQueryDto {
  @IsString()
  @IsOptionalEmpty()
  blogSlug: string;

  @IsNumber()
  @IsOptionalEmpty()
  parentId: number;
}

export class BlogCommentFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
