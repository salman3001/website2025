import { UserType } from '@prisma/client';
import { AuthUserType } from 'src/utils/types/common';

export const contactMessagesPolicy = {
  create: (user: AuthUserType) => {
    if (user) return true;
    return false;
  },

  findAll: (user: AuthUserType) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    return false;
  },

  findOne: (user: AuthUserType) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    return false;
  },

  delete: (user: AuthUserType) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    return false;
  },
};

export type ContactMessagesPolicy = typeof contactMessagesPolicy;
