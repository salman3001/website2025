import { Injectable } from '@nestjs/common';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { UpdateEmailSubscriptionDto } from './dto/update-email-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmailSubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmailSubscriptionDto) {
    const subscription = await this.prisma.emailSubscription.create({
      data: {
        email: dto.email,
        categories: {
          connect: dto.blogCategorySlugs.map((slug) => ({ slug })),
        },
        tags: {
          connect: dto.tagSlugs.map((slug) => ({ slug })),
        },
      },
    });

    return subscription;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmailSubscriptionWhereUniqueInput;
    where?: Prisma.EmailSubscriptionWhereInput;
    orderBy?: Prisma.EmailSubscriptionOrderByWithRelationInput;
    select?: Prisma.EmailSubscriptionSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, subscriptions] = await this.prisma.$transaction([
      this.prisma.emailSubscription.count(),
      this.prisma.emailSubscription.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, subscriptions };
  }

  findOne(where: Prisma.EmailSubscriptionWhereUniqueInput) {
    return this.prisma.emailSubscription.findUnique({
      where,
    });
  }

  async update(email: string, dto: UpdateEmailSubscriptionDto) {
    await this.prisma.emailSubscription.findFirstOrThrow({
      where: { email },
    });

    const subscription = await this.prisma.emailSubscription.update({
      where: { email },
      data: {
        categories: {
          set: dto.blogCategorySlugs
            ? dto.blogCategorySlugs.map((slug) => ({ slug }))
            : [],
        },
        tags: {
          set: dto.tagSlugs ? dto.tagSlugs.map((slug) => ({ slug })) : [],
        },
      },
    });

    return subscription;
  }

  async remove(email: string) {
    const subscription = await this.prisma.emailSubscription.delete({
      where: { email },
    });

    return subscription;
  }
}
