import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { userPolicy } from './user.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PolicyModule.register([{ token: 'UserPolicy', policy: userPolicy }]),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
