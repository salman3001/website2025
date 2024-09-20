import { User } from '@prisma/client';

export class UserSignedupEvent {
  constructor(public user: User) {}
}
