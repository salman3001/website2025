import { User } from '@prisma/client';

export class UserEmailVerifiedEvent {
  constructor(public user: User) {}
}
