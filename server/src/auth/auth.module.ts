import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailsModule } from 'src/mails/mails.module';

@Module({
  imports: [MailsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
