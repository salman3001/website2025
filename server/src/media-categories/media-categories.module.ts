import { Module } from '@nestjs/common';
import { MediaCategoriesService } from './media-categories.service';
import { MediaCategoriesController } from './media-categories.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { mediaCategoryPolicy } from './media-category.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'MediaCategoryPolicy', policy: mediaCategoryPolicy },
    ]),
  ],
  controllers: [MediaCategoriesController],
  providers: [MediaCategoriesService, PrismaService],
})
export class MediaCategoriesModule {}
