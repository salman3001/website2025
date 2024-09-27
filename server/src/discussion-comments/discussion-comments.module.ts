import { Module } from '@nestjs/common';
import { DiscussionCommentsService } from './discussion-comments.service';
import { DiscussionCommentsController } from './discussion-comments.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { PrismaService } from 'src/prisma/prisma.service';
import { discussionCommentsPolicy } from './discussion-comments.policy';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'DiscussionCommentsPolicy', policy: discussionCommentsPolicy },
    ]),
  ],
  controllers: [DiscussionCommentsController],
  providers: [DiscussionCommentsService, PrismaService],
})
export class DiscussionCommentsModule {}
