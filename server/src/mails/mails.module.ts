import { Module } from '@nestjs/common';
import { IMailService } from './interface/ImailService';
import { NodeMailService } from './nodeMailer.service';

@Module({
  providers: [{ provide: IMailService, useClass: NodeMailService }],
  exports: [IMailService],
})
export class MailsModule {}
