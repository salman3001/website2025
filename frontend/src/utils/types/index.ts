import type { UserType } from "../enums";

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  userType: UserType;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
