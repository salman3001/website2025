import { UserType } from "./enums/UserType.js";

export class User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string | undefined;
  userType: UserType;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
