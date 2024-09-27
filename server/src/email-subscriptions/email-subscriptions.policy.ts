import { UserType } from '@prisma/client';
import { AuthUserType } from 'src/utils/types/common';

export const emailSubscriptionPolicy = {
  create: () => {
    return true;
  },

  findAll: (user: AuthUserType) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    return false;
  },

  findOne: (user: AuthUserType, subscriptionEmail: string) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    if (user && user.tokenType === 'auth' && user.email === subscriptionEmail)
      return true;
    return false;
  },

  update: (user: AuthUserType, subscriptionEmail: string) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    if (user && user.tokenType === 'auth' && user.email === subscriptionEmail)
      return true;
  },

  delete: (user: AuthUserType) => {
    if (user && user.tokenType === 'auth' && user.userType === UserType.Admin)
      return true;
    return false;
  },
};

export type EmailSubscriptionPolicy = typeof emailSubscriptionPolicy;
