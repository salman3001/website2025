import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailsModule } from 'src/mails/mails.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MailsModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
