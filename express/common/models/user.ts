import { z } from "zod";
import { UserType } from "./enums/UserType.js";

export const UserSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).optional(),
  userType: z.nativeEnum(UserType),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
