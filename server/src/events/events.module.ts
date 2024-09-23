import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsService } from './events.service';
import { MailsModule } from 'src/mails/mails.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [EventEmitterModule.forRoot(), MailsModule],
  providers: [EventsService, PrismaService],
})
export class EventsModule {}
