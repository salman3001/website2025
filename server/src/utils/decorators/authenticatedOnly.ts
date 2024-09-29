import { UserType } from '@prisma/client';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { AuthUserType } from 'src/utils/types/common';

export function AuthenticatedOnly(opt?: { allowedUserTypes?: UserType[] }) {
  return function (target: any, key: string, discriptor: PropertyDescriptor) {
    const orginalFn = discriptor.value;

    const modifier = (...args: any[]) => {
      const user = args[0] as AuthUserType | null;

      if (!user) {
        throw new CustomHttpException({
          code: 401,
          message: 'UnAuthorized',
          success: false,
        });
      }

      if (
        opt.allowedUserTypes &&
        !opt.allowedUserTypes.includes(user.userType)
      ) {
        throw new CustomHttpException({
          code: 403,
          message: 'Forbidden',
          success: false,
        });
      }

      const isValid = orginalFn.apply(this, args);

      if (!isValid) {
        throw new CustomHttpException({
          code: 403,
          message: 'Forbidden',
          success: false,
        });
      } else {
        return isValid;
      }
    };

    discriptor.value = modifier;
  };
}
