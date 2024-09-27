import { Test, TestingModule } from '@nestjs/testing';
import { MediaCategoriesService } from './media-categories.service';

describe('MediaCategoriesService', () => {
  let service: MediaCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaCategoriesService],
    }).compile();

    service = module.get<MediaCategoriesService>(MediaCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
