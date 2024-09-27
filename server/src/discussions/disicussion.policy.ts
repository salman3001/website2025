import { UserType } from '@prisma/client';
import { AuthUserType } from 'src/utils/types/common';

export const discussionPolicy = {
  create: (user: AuthUserType) => {
    if (user) return true;
    return false;
  },

  findAll: () => {
    return true;
  },

  findOne: () => {
    return true;
  },

  update: (user: AuthUserType) => {
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

export type DiscussionPolicy = typeof discussionPolicy;
