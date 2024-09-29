import { Module } from '@nestjs/common';
import { DiscussionCommentsService } from './discussion-comments.service';
import { DiscussionCommentsController } from './discussion-comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscussionCommentsPolicy } from './discussion-comments.policy';

@Module({
  controllers: [DiscussionCommentsController],
  providers: [
    DiscussionCommentsService,
    PrismaService,
    DiscussionCommentsPolicy,
  ],
})
export class DiscussionCommentsModule {}
