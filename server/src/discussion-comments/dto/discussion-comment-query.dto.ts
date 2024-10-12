import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class DiscussionCommentQueryDto extends CommonQueryDto {
  @IsString()
  @IsOptionalEmpty()
  discussionlug: string;
}

export class DiscussionCommentFindOneQuery extends PickType(CommonQueryDto, [
  'select',
]) {}
