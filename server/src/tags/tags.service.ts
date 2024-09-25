import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTagDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });

    const existTag = await this.prisma.tag.findFirst({
      where: { slug },
    });

    if (existTag) {
      throw new CustomHttpException({
        code: HttpStatus.CONFLICT,
        message: 'Tag Slug Already Exist',
        success: false,
      });
    }

    const tag = await this.prisma.tag.create({
      data: {
        ...dto,
        slug,
      },
    });

    return tag;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
    select?: Prisma.TagSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, tags] = await this.prisma.$transaction([
      this.prisma.tag.count(),
      this.prisma.tag.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, tags };
  }

  findOne(where: Prisma.BlogWhereUniqueInput) {
    return this.prisma.blog.findUnique({
      where,
    });
  }

  async update(slug: string, dto: UpdateTagDto) {
    const existTag = await this.prisma.tag.findFirstOrThrow({
      where: { slug },
    });

    if (!existTag) {
      throw new CustomHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'No Tag found',
        success: false,
      });
    }

    const newSlug: string =
      existTag.title !== dto.title
        ? slugify(dto.title, { lower: true, strict: true })
        : undefined;

    const tag = await this.prisma.blog.update({
      where: { slug },
      data: {
        ...dto,
        slug: newSlug ? newSlug : existTag.slug,
      },
    });

    return tag;
  }

  async remove(slug: string) {
    const tag = await this.prisma.tag.delete({
      where: { slug },
    });

    return tag;
  }
}
