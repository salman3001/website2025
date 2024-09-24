import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { userPolicy } from './user.policy';

@Module({
  imports: [
    PolicyModule.register([{ token: 'MediaPolicy', policy: userPolicy }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
