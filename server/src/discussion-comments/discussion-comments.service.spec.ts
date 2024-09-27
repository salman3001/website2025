import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionCommentsService } from './discussion-comments.service';

describe('DiscussionCommentsService', () => {
  let service: DiscussionCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionCommentsService],
    }).compile();

    service = module.get<DiscussionCommentsService>(DiscussionCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
