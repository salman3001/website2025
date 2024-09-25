import { UserType } from '@prisma/client';
import { AuthUserType } from 'src/utils/types/common';

export const blogCommentPolicy = {
  create: (user: AuthUserType) => {
    if (user && user.userType === UserType.Admin) return true;
    return false;
  },

  findAll: () => {
    return true;
  },

  findOne: () => {
    return true;
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

export type BlogCommentPolicy = typeof blogCommentPolicy;
