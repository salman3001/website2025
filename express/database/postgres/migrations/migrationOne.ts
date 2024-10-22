import { Migration } from "database/interfaces/Migration.js";

export const migrationOne: Migration = {
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
