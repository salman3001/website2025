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
import { BlogCommentsService } from './blog-comments.service';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { PolicyService } from '@salman3001/nest-policy-module';
import { BlogCommentPolicy } from './blog-comment.policy';
import CustomRes from 'src/utils/CustomRes';

@Controller('blog-comments')
export class BlogCommentsController {
  constructor(
    private readonly blogCommentsService: BlogCommentsService,
    @Inject('BlogCommentPolicy')
    private readonly policy: PolicyService<BlogCommentPolicy>,
  ) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateBlogCommentDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('create', authUser);
    const tag = this.blogCommentsService.create(createBlogDto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { tag },
      message: 'Comment Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    await this.policy.authorize('findAll');

    const { comments, count } = await this.blogCommentsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { comments, count },
    });
  }

  @Get(':id')
  async findOne(@Param('slug') id: number) {
    await this.policy.authorize('findOne');

    const comment = await this.blogCommentsService.findOne({ id });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { comment } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogCommentDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('update', authUser);
    const comment = await this.blogCommentsService.update(id, updateBlogDto);

    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { comment },
      message: 'Comment Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    await this.policy.authorize('delete', authUser);
    const tag = await this.blogCommentsService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { tag },
      message: 'Comment deleted',
    });
  }
}
