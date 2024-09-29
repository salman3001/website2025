import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogPolicy } from './blogs.policy';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [MediaModule],
  controllers: [BlogsController],
  providers: [BlogsService, PrismaService, BlogPolicy],
})
export class BlogsModule {}
