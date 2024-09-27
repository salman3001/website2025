import { Module } from '@nestjs/common';
import { BlogCommentsService } from './blog-comments.service';
import { BlogCommentsController } from './blog-comments.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { blogCommentPolicy } from './blog-comment.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'BlogCommentPolicy', policy: blogCommentPolicy },
    ]),
  ],
  controllers: [BlogCommentsController],
  providers: [BlogCommentsService, PrismaService],
})
export class BlogCommentsModule {}
