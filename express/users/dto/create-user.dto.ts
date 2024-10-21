import { UserSchema } from "common/models/user.js";
import { z } from "zod";

export const createUserDtoSchema = UserSchema.pick({
  fullName: true,
  email: true,
  password: true,
  phone: true,
  isActive: true,
  emailVerified: true,
  userType: true,
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
