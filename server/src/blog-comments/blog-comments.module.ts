import { Module } from '@nestjs/common';
import { BlogCommentsService } from './blog-comments.service';
import { BlogCommentsController } from './blog-comments.controller';
import { BlogCommentPolicy } from './blog-comment.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BlogCommentsController],
  providers: [BlogCommentsService, PrismaService, BlogCommentPolicy],
})
export class BlogCommentsModule {}
