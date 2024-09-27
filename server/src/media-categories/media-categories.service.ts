import { Injectable } from '@nestjs/common';
import { CreateMediaCategoryDto } from './dto/create-media-category.dto';
import { UpdateMediaCategoryDto } from './dto/update-media-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMediaCategoryDto) {
    const mediaCategory = await this.prisma.mediaCategory.create({
      data: dto,
    });

    return mediaCategory;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MediaCategoryWhereUniqueInput;
    where?: Prisma.MediaCategoryWhereInput;
    orderBy?: Prisma.MediaCategoryOrderByWithRelationInput;
    select?: Prisma.MediaCategorySelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, mediaCategories] = await this.prisma.$transaction([
      this.prisma.mediaCategory.count(),
      this.prisma.mediaCategory.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, mediaCategories };
  }

  findOne(where: Prisma.MediaCategoryWhereUniqueInput) {
    return this.prisma.mediaCategory.findUnique({
      where,
    });
  }

  async update(id: number, dto: UpdateMediaCategoryDto) {
    await this.prisma.mediaCategory.findFirstOrThrow({
      where: { id },
    });

    const mediaCategory = await this.prisma.mediaCategory.update({
      where: { id },
      data: dto,
    });

    return mediaCategory;
  }

  async remove(id: number) {
    const mediaCategory = await this.prisma.mediaCategory.delete({
      where: { id },
    });

    return mediaCategory;
  }
}
