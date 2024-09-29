import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectPolicy } from './project.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, ProjectPolicy],
})
export class ProjectsModule {}
