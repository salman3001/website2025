import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { MediaType, Prisma } from '@prisma/client';
import { ImageUploadService } from 'src/media/imageUpload.service';

@Injectable()
export class BlogsService {
  constructor(
    private prisma: PrismaService,
    private imageUploadService: ImageUploadService,
  ) {}

  async create(
    dto: CreateBlogDto,
    userId: number,
    image?: Express.Multer.File,
  ) {
    const { seo, blogCategorySlug, tagSlugs, ...blogDto } = dto;
    let imageUrl: string | undefined = undefined;

    const slug = slugify(blogDto.title, { lower: true, strict: true });
    const existBlog = await this.prisma.blog.findFirst({ where: { slug } });
    if (existBlog) {
      throw new CustomHttpException({
        code: HttpStatus.CONFLICT,
        message: 'Slug Already Exist',
        success: false,
      });
    }

    if (image) {
      const { url } = await this.imageUploadService.uploadImage(image);
      imageUrl = url;
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
        image: imageUrl
          ? {
              create: {
                type: MediaType.Image,
                name: `Image - ${blogDto.title}`,
                url: imageUrl,
              },
            }
          : undefined,
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

  findOne(where: Prisma.BlogWhereUniqueInput) {
    return this.prisma.blog.findUnique({
      where,
    });
  }

  async update(slug: string, dto: UpdateBlogDto, image: Express.Multer.File) {
    const { seo, blogCategorySlug, tagSlugs, ...blogDto } = dto;
    let imageUrl: string | undefined = undefined;

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

    if (image) {
      const { url } = await this.imageUploadService.uploadImage(image);
      imageUrl = url;

      if (existBlog.image) {
        await this.imageUploadService.deleteImage(existBlog.image.url);
      }
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
        image: imageUrl
          ? {
              update: {
                type: MediaType.Image,
                name: `Image - ${blogDto.title}`,
                url: imageUrl,
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
      include: { image: true },
    });

    if (existBlog.image) {
      await this.imageUploadService.deleteImage(existBlog.image.url);
    }

    await this.prisma.blog.delete({ where: { slug } });

    return existBlog;
  }
}
