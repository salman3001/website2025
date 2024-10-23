import { ColumnType, Generated } from "kysely";

export interface Database {
  users: UsersTable;
}

export interface UsersTable {
  id: Generated<number>;
  fullName: string;
  email: string;
  password: ColumnType<never, string, string>;
  phone: string | undefined;
  userType: "Admin" | "User";
  isActive: boolean;
  emailVerified: boolean;
  createdAt: ColumnType<Date, never, never>;
  updatedAt: ColumnType<Date, never, Date>;
}
