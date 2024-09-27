import { Module } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { ContactMessagesController } from './contact-messages.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { contactMessagesPolicy } from './contact-messages.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'ContactMessagesPolicy', policy: contactMessagesPolicy },
    ]),
  ],
  controllers: [ContactMessagesController],
  providers: [ContactMessagesService, PrismaService],
})
export class ContactMessagesModule {}
