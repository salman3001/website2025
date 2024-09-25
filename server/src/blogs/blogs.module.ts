import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { blogPolicy } from './blogs.policy';

@Module({
  imports: [
    PolicyModule.register([{ token: 'BlogPolicy', policy: blogPolicy }]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
