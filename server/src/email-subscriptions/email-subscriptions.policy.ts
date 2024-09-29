import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { AuthenticatedOnly } from 'src/utils/decorators';
import { AuthUserType } from 'src/utils/types/common';

@Injectable()
export class EmailSubscriptionPolicy {
  canCreate() {
    return true;
  }

  @AuthenticatedOnly({ allowedUserTypes: [UserType.Admin] })
  canFindAll(user: AuthUserType) {
    return true;
  }

  @AuthenticatedOnly()
  canFindOne(user: AuthUserType, email: string) {
    return user.email === email;
  }

  @AuthenticatedOnly({ allowedUserTypes: [UserType.Admin] })
  canUpdate(user: AuthUserType, email: string) {
    return user.email === email;
  }

  @AuthenticatedOnly({ allowedUserTypes: [UserType.Admin] })
  canDelete(user: AuthUserType) {
    return true;
  }
}
