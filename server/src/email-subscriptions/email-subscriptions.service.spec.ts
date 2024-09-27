import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriptionsService } from './email-subscriptions.service';

describe('EmailSubscriptionsService', () => {
  let service: EmailSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSubscriptionsService],
    }).compile();

    service = module.get<EmailSubscriptionsService>(EmailSubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
