import { PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class DiscussionCommentQueryDto extends CommonQueryDto {
  @IsString()
  @IsOptionalEmpty()
  discussionSlug: string;

  @IsNumber()
  @IsOptionalEmpty()
  parentId: number;
}

export class DiscussionCommentFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
