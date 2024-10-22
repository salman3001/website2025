import { Migration } from "database/interfaces/Migration.js";

export const migrationTwo: Migration = {
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
