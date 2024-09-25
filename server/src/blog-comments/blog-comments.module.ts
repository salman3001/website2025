import { Module } from '@nestjs/common';
import { BlogCommentsService } from './blog-comments.service';
import { BlogCommentsController } from './blog-comments.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { blogCommentPolicy } from './blog-comment.policy';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'blogCommentPolicy', policy: blogCommentPolicy },
    ]),
  ],
  controllers: [BlogCommentsController],
  providers: [BlogCommentsService],
})
export class BlogCommentsModule {}
