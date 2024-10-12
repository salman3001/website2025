import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: dto,
    });

    return project;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
    select?: Prisma.ProjectSelect;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;
    const [count, projects] = await this.prisma.$transaction([
      this.prisma.project.count(),
      this.prisma.project.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select,
      }),
    ]);
    return { count, projects };
  }

  findOne(params: {
    where: Prisma.ProjectWhereUniqueInput;
    select: Prisma.ProjectSelect;
  }) {
    const { where, select } = params;
    return this.prisma.project.findUnique({
      where,
      select,
    });
  }

  async update(id: number, dto: UpdateProjectDto) {
    await this.prisma.project.findFirstOrThrow({
      where: { id },
    });

    const project = await this.prisma.project.update({
      where: { id },
      data: dto,
    });

    return project;
  }

  async remove(id: number) {
    const project = await this.prisma.project.delete({
      where: { id },
    });

    return project;
  }
}
