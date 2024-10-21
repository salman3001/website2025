import { PgMigration } from "../types/index.js";

export const migrationTwo: PgMigration = {
  name: "migrationTwo",
  query: `
        CREATE TABLE IF NOT EXISTS profiles (
            id SERIAL PRIMARY KEY
        )
    `,
  rollbackQuery: `
    DROP TABLE IF EXISTS 
    profiles;
`,
};
