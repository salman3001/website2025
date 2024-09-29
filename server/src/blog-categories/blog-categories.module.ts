import { Module } from '@nestjs/common';
import { BlogCategoriesService } from './blog-categories.service';
import { BlogCategoriesController } from './blog-categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogCategoryPolicy } from './blog-category.policy';

@Module({
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesService, PrismaService, BlogCategoryPolicy],
})
export class BlogCategoriesModule {}
