import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionCommentsController } from './discussion-comments.controller';
import { DiscussionCommentsService } from './discussion-comments.service';

describe('DiscussionCommentsController', () => {
  let controller: DiscussionCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionCommentsController],
      providers: [DiscussionCommentsService],
    }).compile();

    controller = module.get<DiscussionCommentsController>(
      DiscussionCommentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
