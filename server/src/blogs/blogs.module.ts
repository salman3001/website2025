import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { blogPolicy } from './blogs.policy';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    MediaModule,
    PolicyModule.register([{ token: 'BlogPolicy', policy: blogPolicy }]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, PrismaService],
})
export class BlogsModule {}
