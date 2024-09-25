import { Module } from '@nestjs/common';
import { BlogCategoriesService } from './blog-categories.service';
import { BlogCategoriesController } from './blog-categories.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { blogCategoryPolicy } from './blog-category.policy';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'BlogCategoryPolicy', policy: blogCategoryPolicy },
    ]),
  ],
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesService],
})
export class BlogCategoriesModule {}
