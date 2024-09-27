import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';
import { Prisma } from '@prisma/client';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';

@Injectable()
export class DiscussionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiscussionDto, userId: number) {
    const { seo, tagSlugs, ...discussionDto } = dto;

    const slug = slugify(discussionDto.title, { lower: true, strict: true });
    const existBlog = await this.prisma.blog.findFirst({ where: { slug } });
    if (existBlog) {
      throw new CustomHttpException({
        code: HttpStatus.CONFLICT,
        message: 'Slug Already Exist',
        success: false,
      });
    }

    const discussion = await this.prisma.discussion.create({
      data: {
        ...discussionDto,
        slug,
        isPublished: false,
        user: {
          connect: { id: userId },
        },
        seo: { create: seo },
        tags: {
          connect: tagSlugs ? tagSlugs.map((slug) => ({ slug })) : [],
        },
      },
    });

    return discussion;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiscussionWhereUniqueInput;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput;
    select?: Prisma.DiscussionSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, discussions] = await this.prisma.$transaction([
      this.prisma.discussion.count(),
      this.prisma.discussion.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, discussions };
  }

  findOne(where: Prisma.DiscussionWhereUniqueInput) {
    return this.prisma.discussion.findUnique({
      where,
    });
  }

  async update(slug: string, dto: UpdateDiscussionDto) {
    const { seo, tagSlugs, ...discussionDto } = dto;

    const existBlog = await this.prisma.blog.findFirstOrThrow({
      where: { slug },
      include: { image: true },
    });

    if (!existBlog) {
      throw new CustomHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'No Discussion found',
        success: false,
      });
    }

    const newSlug: string =
      existBlog.title !== discussionDto.title
        ? slugify(discussionDto.title, { lower: true, strict: true })
        : undefined;

    const discussion = await this.prisma.discussion.update({
      where: { slug },
      data: {
        ...discussionDto,
        slug: newSlug ? newSlug : existBlog.slug,
        seo: { update: seo },
        tags: {
          set: tagSlugs ? tagSlugs.map((slug) => ({ slug })) : [],
        },
      },
    });

    return discussion;
  }

  async remove(slug: string) {
    const existDiscussion = await this.prisma.discussion.findFirstOrThrow({
      where: { slug },
    });

    await this.prisma.discussion.delete({ where: { slug } });

    return existDiscussion;
  }
}
