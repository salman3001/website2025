import { Module } from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { EmailSubscriptionPolicy } from './email-subscriptions.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmailSubscriptionsController],
  providers: [
    EmailSubscriptionsService,
    PrismaService,
    EmailSubscriptionPolicy,
  ],
})
export class EmailSubscriptionsModule {}
