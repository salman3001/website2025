import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscussionCommentDto } from './dto/create-discussion-comment.dto';
import { UpdateDiscussionCommentDto } from './dto/update-discussion-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { AuthUserType } from 'src/utils/types/common';

@Injectable()
export class DiscussionCommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiscussionCommentDto, user: AuthUserType) {
    const comment = await this.prisma.discussionComment.create({
      data: {
        message: dto.message,
        isApproved: false,
        discussion: { connect: { slug: dto.discussionSlug } },
        parent: dto.parentId
          ? {
              connect: { id: dto.parentId },
            }
          : {},
        user: { connect: { id: user.id } },
      },
    });

    return comment;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiscussionCommentWhereUniqueInput;
    where?: Prisma.DiscussionCommentWhereInput;
    orderBy?: Prisma.DiscussionCommentOrderByWithRelationInput;
    select?: Prisma.DiscussionCommentSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, comments] = await this.prisma.$transaction([
      this.prisma.discussionComment.count(),
      this.prisma.discussionComment.findMany({
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

  findOne(params: {
    where: Prisma.DiscussionCommentWhereUniqueInput;
    select: Prisma.DiscussionCommentSelect;
  }) {
    const { where, select } = params;

    return this.prisma.discussionComment.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateDiscussionCommentDto) {
    const existComment = await this.prisma.discussionComment.findFirstOrThrow({
      where: { id },
    });

    if (!existComment) {
      throw new CustomHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'No Comment found',
        success: false,
      });
    }

    const comment = await this.prisma.discussionComment.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    return comment;
  }

  async remove(id: number) {
    const comment = await this.prisma.discussionComment.delete({
      where: { id },
    });

    return comment;
  }
}
