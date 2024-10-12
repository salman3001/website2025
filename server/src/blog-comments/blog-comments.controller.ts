import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BlogCommentsService } from './blog-comments.service';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { BlogCommentPolicy } from './blog-comment.policy';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';
import {
  BlogCommentFindOneQuery,
  BlogCommentQueryDto,
} from './dto/blog-comment-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('blog-comments')
@Controller('blog-comments')
export class BlogCommentsController {
  constructor(
    private readonly blogCommentsService: BlogCommentsService,
    private readonly policy: BlogCommentPolicy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateBlogCommentDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
    const comment = await this.blogCommentsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: comment,
      message: 'Comment Created',
    });
  }

  @Get()
  async findAll(@Query() qs: BlogCommentQueryDto) {
    this.policy.canFindAll();

    const { blogSlug, search, ...commonQueryDto } = qs;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search ? { name: { contains: search } } : {};

    const commentsByBlogSlugQuery = blogSlug
      ? { blogSlug: { equals: blogSlug } }
      : {};

    const { comments, count } = await this.blogCommentsService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery, ...commentsByBlogSlugQuery } },
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
    @Query() qs: BlogCommentFindOneQuery,
  ) {
    this.policy.canFindOne();

    const { selectQuery } = generateCommonPrismaQuery(qs);

    const comment = await this.blogCommentsService.findOne({
      where: { id: +id },
      select: selectQuery,
    });
    return CustomRes({ code: HttpStatus.OK, success: true, data: comment });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBlogCommentDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canUpdate(authUser);

    const comment = await this.blogCommentsService.update(id, dto);

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

    const comments = await this.blogCommentsService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: comments,
      message: 'Comment deleted',
    });
  }
}
