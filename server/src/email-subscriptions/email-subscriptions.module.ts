import { Module } from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { emailSubscriptionPolicy } from './email-subscriptions.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'EmailSubscriptionPolicy', policy: emailSubscriptionPolicy },
    ]),
  ],
  controllers: [EmailSubscriptionsController],
  providers: [EmailSubscriptionsService, PrismaService],
})
export class EmailSubscriptionsModule {}
