import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { discussionPolicy } from './disicussion.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'DiscussionPolicy', policy: discussionPolicy },
    ]),
  ],
  controllers: [DiscussionsController],
  providers: [DiscussionsService, PrismaService],
})
export class DiscussionsModule {}
