import { Module } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { ContactMessagesController } from './contact-messages.controller';
import { ContactMessagesPolicy } from './contact-messages.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ContactMessagesController],
  providers: [ContactMessagesService, PrismaService, ContactMessagesPolicy],
})
export class ContactMessagesModule {}
