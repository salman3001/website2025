import { PartialType } from '@nestjs/swagger';
import { CreateDiscussionCommentDto } from './create-discussion-comment.dto';

export class UpdateDiscussionCommentDto extends PartialType(
  CreateDiscussionCommentDto,
) {}
