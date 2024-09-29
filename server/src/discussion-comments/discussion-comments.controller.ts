import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DiscussionCommentsService } from './discussion-comments.service';
import { CreateDiscussionCommentDto } from './dto/create-discussion-comment.dto';
import { UpdateDiscussionCommentDto } from './dto/update-discussion-comment.dto';
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import CustomRes from 'src/utils/CustomRes';
import { DiscussionCommentsPolicy } from './discussion-comments.policy';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Discusion Comments')
@Controller('discussion-comments')
export class DiscussionCommentsController {
  constructor(
    private readonly discussionCommentsService: DiscussionCommentsService,
    private readonly policy: DiscussionCommentsPolicy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateDiscussionCommentDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
    const tag = this.discussionCommentsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { tag },
      message: 'Comment Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    this.policy.canFindAll();

    const { comments, count } =
      await this.discussionCommentsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { comments, count },
    });
  }

  @Get(':id')
  async findOne(@Param('slug') id: number) {
    this.policy.canFindAll();

    const comment = await this.discussionCommentsService.findOne({ id });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { comment } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDiscussionCommentDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canUpdate(authUser);

    const comment = await this.discussionCommentsService.update(id, dto);

    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { comment },
      message: 'Comment Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    this.policy.canDelete(authUser);
    const tag = await this.discussionCommentsService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { tag },
      message: 'Comment deleted',
    });
  }
}
