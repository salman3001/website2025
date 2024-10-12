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
import {
  DiscussionCommentFindOneQuery,
  DiscussionCommentQueryDto,
} from './dto/discussion-comment-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

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
    const comment = await this.discussionCommentsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: comment,
      message: 'Comment Created',
    });
  }

  @Get()
  async findAll(@Query() qs: DiscussionCommentQueryDto) {
    this.policy.canFindAll();

    const { discussionlug, search, ...commonQueryDto } = qs;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search ? { name: { contains: search } } : {};

    const queryByDiscussion = discussionlug
      ? { discussionlug: { equals: discussionlug } }
      : {};

    const { comments, count } = await this.discussionCommentsService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery, ...queryByDiscussion } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: comments, count },
    });
  }

  @Get(':id')
  async findOne(
    @Param('slug') id: number,
    @Query() qs: DiscussionCommentFindOneQuery,
  ) {
    this.policy.canFindAll();

    const { selectQuery } = generateCommonPrismaQuery(qs);

    const comment = await this.discussionCommentsService.findOne({
      where: { id: +id },
      select: selectQuery,
    });
    return CustomRes({ code: HttpStatus.OK, success: true, data: comment });
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
      data: comment,
      message: 'Comment Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    this.policy.canDelete(authUser);
    const comment = await this.discussionCommentsService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: comment,
      message: 'Comment deleted',
    });
  }
}
