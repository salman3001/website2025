import { databaseModule } from "database/database.module.js";

databaseModule.PgMigrator.resetDb().finally(() => databaseModule.PgPool.end());
