import { PgMigration } from "../types/index.js";

export const migrationOne: PgMigration = {
  name: "migrationOne",
  query: `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            fullName VARCHAR(50)
        )
    `,
  rollbackQuery: `
        DROP TABLE IF EXISTS 
        users;
  `,
};
