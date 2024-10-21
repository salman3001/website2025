import { databaseModule } from "database/database.module.js";

databaseModule.PgMigrator.run().finally(() => databaseModule.PgPool.end());
