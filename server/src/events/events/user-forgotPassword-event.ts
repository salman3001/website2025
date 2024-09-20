import { User } from '@prisma/client';

export class UserForgotPasswordEvent {
  constructor(public user: User) {}
}
