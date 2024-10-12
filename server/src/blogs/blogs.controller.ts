import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserType } from 'src/utils/types/common';
import { BlogPolicy } from './blogs.policy';
import CustomRes from 'src/utils/CustomRes';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { BlogsFindOneQuery, BlogsQueryDto } from './dto/blogs-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly blogPolicy: BlogPolicy,
  ) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.blogPolicy.canCreate(authUser);

    const userId = authUser.id;
    const blog = await this.blogsService.create(createBlogDto, userId);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: blog,
      message: 'Blog Created',
    });
  }

  @Get()
  async findAll(
    @Query() qs: BlogsQueryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.blogPolicy.canFindAll();
    const { blogCategorySlug, search, ...restQuery } = qs;
    const { orderByQuery, selectQuery, skip, take } =
      generateCommonPrismaQuery(restQuery);

    const searchQuery = search ? { title: { contains: search } } : {};
    const serachByCategoryQuery = blogCategorySlug
      ? { blogCategorySlug: { equals: blogCategorySlug } }
      : {};

    const { blogs, count } = await this.blogsService.findAll({
      skip,
      take,
      where: { ...searchQuery, ...serachByCategoryQuery },
      orderBy: orderByQuery,
      select: selectQuery,
    });
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: blogs, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string, @Query() qs: BlogsFindOneQuery) {
    this.blogPolicy.canFindOne();

    const { selectQuery } = generateCommonPrismaQuery(qs);
    console.log(selectQuery);

    const blog = await this.blogsService.findOne({
      where: { slug },
      select: selectQuery,
    });
    return CustomRes({ code: HttpStatus.OK, success: true, data: blog });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile() image: Express.Multer.File,
  ) {
    this.blogPolicy.canUpdate(authUser);
    const blog = await this.blogsService.update(slug, updateBlogDto);
    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: blog,
      message: 'Blog Updated',
    });
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.blogPolicy.canDelete(authUser);
    const blog = await this.blogsService.remove(slug);
    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: blog,
      message: 'Blog deleted',
    });
  }
}
