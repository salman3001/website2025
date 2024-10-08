import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';

@Injectable()
export class BlogCommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBlogCommentDto) {
    const comment = await this.prisma.blogComment.create({
      data: {
        message: dto.message,
        isApproved: false,
        blog: { connect: { slug: dto.blogSlug } },
        parent: dto.parentId
          ? {
              connect: { id: dto.parentId },
            }
          : {},
      },
    });

    return comment;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogCommentWhereUniqueInput;
    where?: Prisma.BlogCommentWhereInput;
    orderBy?: Prisma.BlogCommentOrderByWithRelationInput;
    select?: Prisma.BlogCommentSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, comments] = await this.prisma.$transaction([
      this.prisma.blogComment.count(),
      this.prisma.blogComment.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, comments };
  }

  findOne(where: Prisma.BlogCommentWhereUniqueInput) {
    return this.prisma.blogComment.findUnique({
      where,
    });
  }

  async update(id: number, dto: UpdateBlogCommentDto) {
    const existComment = await this.prisma.blogComment.findFirstOrThrow({
      where: { id },
    });

    if (!existComment) {
      throw new CustomHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'No Comment found',
        success: false,
      });
    }

    const comment = await this.prisma.blogComment.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    return comment;
  }

  async remove(id: number) {
    const comment = await this.prisma.blogComment.delete({
      where: { id },
    });

    return comment;
  }
}
