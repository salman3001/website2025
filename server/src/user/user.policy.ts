import { UserType } from '@prisma/client';
import { AuthUserType } from 'src/utils/types/common';

export const userPolicy = {
  create: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },
  findAll: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },

  findAllByCategory: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },

  findOne: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },

  update: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },

  delete: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },
};

export type UserPolicy = typeof userPolicy;
