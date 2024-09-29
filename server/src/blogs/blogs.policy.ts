import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { AuthenticatedOnly } from 'src/utils/decorators';
import { AuthUserType } from 'src/utils/types/common';

@Injectable()
export class BlogPolicy {
  @AuthenticatedOnly({ allowedUserTypes: [UserType.Admin] })
  canCreate(user: AuthUserType) {
    return true;
  }

  canFindAll() {
    return true;
  }

  canFindOne() {
    return true;
  }

  @AuthenticatedOnly({ allowedUserTypes: [UserType.Admin] })
  canUpdate(user: AuthUserType) {
    return true;
  }

  @AuthenticatedOnly({ allowedUserTypes: [UserType.Admin] })
  canDelete(user: AuthUserType) {
    return true;
  }
}
