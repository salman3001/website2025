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
import { BlogCategoryPolicy } from './blog-category.policy';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blog-categories')
@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(
    private readonly blogCategoriesService: BlogCategoriesService,
    private readonly policy: BlogCategoryPolicy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateBlogCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
    const blogCategory = this.blogCategoriesService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { blogCategory },
      message: 'Blog Category Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    this.policy.canFindAll();

    const { blogCategories, count } =
      await this.blogCategoriesService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: blogCategories, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    this.policy.canFindOne();

    const blog = await this.blogCategoriesService.findOne({ slug });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { blog } });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: UpdateBlogCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canUpdate(authUser);

    const blogCategory = await this.blogCategoriesService.update(slug, dto);
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
    this.policy.canDelete(authUser);

    const blogCategory = await this.blogCategoriesService.remove(slug);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { blogCategory },
      message: 'Blog Category deleted',
    });
  }
}
