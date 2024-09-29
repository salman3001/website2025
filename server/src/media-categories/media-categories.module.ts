import { Module } from '@nestjs/common';
import { MediaCategoriesService } from './media-categories.service';
import { MediaCategoriesController } from './media-categories.controller';
import { MediaCategoryPolicy } from './media-category.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MediaCategoriesController],
  providers: [MediaCategoriesService, PrismaService, MediaCategoryPolicy],
})
export class MediaCategoriesModule {}
