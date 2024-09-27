import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBlogCategoryDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });

    const existBlogCetrgory = await this.prisma.blogCategory.findFirst({
      where: { slug },
    });
    if (existBlogCetrgory) {
      throw new CustomHttpException({
        code: HttpStatus.CONFLICT,
        message: 'Slug Already Exist',
        success: false,
      });
    }

    const blogCategory = await this.prisma.blogCategory.create({
      data: {
        ...dto,
        slug,
      },
    });

    return blogCategory;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogCategoryWhereUniqueInput;
    where?: Prisma.BlogCategoryWhereInput;
    orderBy?: Prisma.BlogCategoryOrderByWithRelationInput;
    select?: Prisma.BlogCategorySelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, blogCategories] = await this.prisma.$transaction([
      this.prisma.blogCategory.count(),
      this.prisma.blogCategory.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, blogCategories };
  }

  findOne(where: Prisma.BlogCategoryWhereUniqueInput) {
    return this.prisma.blogCategory.findUnique({
      where,
    });
  }

  async update(slug: string, dto: UpdateBlogCategoryDto) {
    const existBlogCategory = await this.prisma.blogCategory.findFirstOrThrow({
      where: { slug },
    });

    if (!existBlogCategory) {
      throw new CustomHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'No Blog Category found',
        success: false,
      });
    }

    const newSlug: string =
      existBlogCategory.title !== dto.title
        ? slugify(dto.title, { lower: true, strict: true })
        : undefined;

    const blogCategory = await this.prisma.blog.update({
      where: { slug },
      data: {
        ...dto,
        slug: newSlug ? newSlug : existBlogCategory.slug,
      },
    });

    return blogCategory;
  }

  async remove(slug: string) {
    const blogCategory = await this.prisma.blogCategory.delete({
      where: { slug },
    });

    return blogCategory;
  }
}
