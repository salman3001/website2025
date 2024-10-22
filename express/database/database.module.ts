import { configModule } from "config/config.module.js";
import { PgPool } from "./postgres/pgPool.js";
import { PgMigrator } from "./postgres/pg-migrator.js";
import pgMigrations from "./postgres/migrations/index.js";
import mongoMigrations from "./mongodb/migrations/index.js";
import { Migrator } from "./interfaces/Migrator.js";
import { MongoMigrator } from "./mongodb/mongoMigrator.js";

class DataBaseModule {
  private _pgPool: PgPool;
  get PgPool() {
    if (!this._pgPool) {
      this._pgPool = new PgPool(configModule.EnvConfig);
    }
    return this._pgPool;
  }

  private _migrator: Migrator;
  get Migrator() {
    if (!this._migrator) {
      this._migrator =
        configModule.EnvConfig.envs.dbAdapter === "mongodb"
          ? new MongoMigrator(mongoMigrations)
          : new PgMigrator(this.PgPool, pgMigrations);
    }
    return this._migrator;
  }
}

export const databaseModule = new DataBaseModule();
