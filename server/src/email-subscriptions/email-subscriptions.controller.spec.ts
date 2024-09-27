import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { EmailSubscriptionsService } from './email-subscriptions.service';

describe('EmailSubscriptionsController', () => {
  let controller: EmailSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSubscriptionsController],
      providers: [EmailSubscriptionsService],
    }).compile();

    controller = module.get<EmailSubscriptionsController>(EmailSubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
