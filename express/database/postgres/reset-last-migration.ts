import { databaseModule } from "database/database.module.js";

databaseModule.PgMigrator.resetLast().finally(() =>
  databaseModule.PgPool.end(),
);
