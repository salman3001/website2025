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
import {
  BlogCategoryFindOneQuery,
  BlogCategoryQueryDto,
} from './dto/blog-category-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

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
    const blogCategory = await this.blogCategoriesService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: blogCategory,
      message: 'Blog Category Created',
    });
  }

  @Get()
  async findAll(@Query() qs: BlogCategoryQueryDto) {
    this.policy.canFindAll();

    const { search, ...commonQueryDto } = qs;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { name: { contains: search, mode: 'insensitive' as any } }
      : {};

    const { blogCategories, count } = await this.blogCategoriesService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: blogCategories, count },
    });
  }

  @Get(':slug')
  async findOne(
    @Param('slug') slug: string,
    @Query() qs: BlogCategoryFindOneQuery,
  ) {
    this.policy.canFindOne();
    const { selectQuery } = generateCommonPrismaQuery(qs);

    const blogCategory = await this.blogCategoriesService.findOne({
      where: { slug },
      select: selectQuery,
    });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: blogCategory,
    });
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
      data: blogCategory,
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
      data: blogCategory,
      message: 'Blog Category deleted',
    });
  }
}
