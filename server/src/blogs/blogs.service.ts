import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBlogDto, userId: number) {
    const { seo, blogCategorySlug, tagSlugs, mediaId, ...blogDto } = dto;

    const slug = slugify(blogDto.title, { lower: true, strict: true });

    const existBlog = await this.prisma.blog.findFirst({ where: { slug } });
    if (existBlog) {
      throw new CustomHttpException({
        code: HttpStatus.CONFLICT,
        message: 'Slug Already Exist',
        success: false,
      });
    }

    const blog = await this.prisma.blog.create({
      data: {
        ...blogDto,
        slug,
        author: { connect: { id: userId } },
        blogCategory: blogCategorySlug
          ? {
              connect: { slug: blogCategorySlug },
            }
          : {},
        seo: { create: seo },
        tags: {
          connect: tagSlugs ? tagSlugs.map((slug) => ({ slug })) : [],
        },
        image: mediaId
          ? {
              connect: {
                id: mediaId,
              },
            }
          : {},
      },
    });

    return blog;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogWhereUniqueInput;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput;
    select?: Prisma.BlogSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, blogs] = await this.prisma.$transaction([
      this.prisma.blog.count(),
      this.prisma.blog.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, blogs };
  }

  findOne(params: {
    where: Prisma.BlogWhereUniqueInput;
    select: Prisma.BlogSelect;
  }) {
    const { where, select } = params;
    return this.prisma.blog.findUnique({
      where,
      select,
    });
  }

  async update(slug: string, dto: UpdateBlogDto) {
    const { seo, blogCategorySlug, tagSlugs, mediaId, ...blogDto } = dto;

    const existBlog = await this.prisma.blog.findFirstOrThrow({
      where: { slug },
      include: { image: true },
    });

    if (!existBlog) {
      throw new CustomHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'No Blog found',
        success: false,
      });
    }

    const newSlug: string =
      existBlog.title !== blogDto.title
        ? slugify(blogDto.title, { lower: true, strict: true })
        : undefined;

    const blog = await this.prisma.blog.update({
      where: { slug },
      data: {
        ...blogDto,
        slug: newSlug ? newSlug : existBlog.slug,
        blogCategory: blogCategorySlug
          ? {
              connect: { slug: blogCategorySlug },
            }
          : {},
        seo: { update: seo },
        tags: {
          set: tagSlugs ? tagSlugs.map((slug) => ({ slug })) : [],
        },
        image: mediaId
          ? {
              connect: {
                id: mediaId,
              },
            }
          : undefined,
      },
    });

    return blog;
  }

  async remove(slug: string) {
    const existBlog = await this.prisma.blog.findFirstOrThrow({
      where: { slug },
    });

    await this.prisma.blog.delete({ where: { slug } });

    return existBlog;
  }
}
