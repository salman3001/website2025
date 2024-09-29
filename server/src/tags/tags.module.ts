import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagPolicy } from './tags.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService, TagPolicy],
})
export class TagsModule {}
