import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { projectPolicy } from './project-policy.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([{ token: 'ProjectPolicy', policy: projectPolicy }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
