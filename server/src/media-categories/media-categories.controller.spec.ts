import { Test, TestingModule } from '@nestjs/testing';
import { MediaCategoriesController } from './media-categories.controller';
import { MediaCategoriesService } from './media-categories.service';

describe('MediaCategoriesController', () => {
  let controller: MediaCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaCategoriesController],
      providers: [MediaCategoriesService],
    }).compile();

    controller = module.get<MediaCategoriesController>(
      MediaCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
