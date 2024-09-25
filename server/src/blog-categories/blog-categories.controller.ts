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
import { BlogCategoriesService } from './blog-categories.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import { PolicyService } from '@salman3001/nest-policy-module';
import { BlogCategoryPolicy } from './blog-category.policy';
import CustomRes from 'src/utils/CustomRes';

@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(
    private readonly blogCategoriesService: BlogCategoriesService,
    @Inject('BlogCategoryPolicy')
    private readonly policy: PolicyService<BlogCategoryPolicy>,
  ) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateBlogCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('create', authUser);
    const blogCategory = this.blogCategoriesService.create(createBlogDto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { blogCategory },
      message: 'Blog Category Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    await this.policy.authorize('findAll');

    const { blogCategories, count } =
      await this.blogCategoriesService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { blogCategories, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    await this.policy.authorize('findOne');

    const blog = await this.blogCategoriesService.findOne({ slug });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { blog } });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateBlogCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('update', authUser);
    const blogCategory = await this.blogCategoriesService.update(
      slug,
      updateBlogDto,
    );
    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { blogCategory },
      message: 'Blog Category Updated',
    });
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('delete', authUser);
    const blogCategory = await this.blogCategoriesService.remove(slug);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { blogCategory },
      message: 'Blog Category deleted',
    });
  }
}
