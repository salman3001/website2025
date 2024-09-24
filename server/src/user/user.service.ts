import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: dto,
    });

    this.eventEmitter.emit('user:created');

    return user;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    include?: Prisma.UserInclude;
    select?: Prisma.UserSelect;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    const [count, users] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        omit: { password: true },
        skip,
        take,
        cursor,
        where,
        orderBy,
        include,
      }),
    ]);

    return { count, users };
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });

    return this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
