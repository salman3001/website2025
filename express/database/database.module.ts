import { configModule } from "config/config.module.js";
import { PgPool } from "./postgres/pgPool.js";
import { PgMigrator } from "./postgres/pg-migrator.js";
import migrations from "./postgres/migrations/index.js";

class DataBaseModule {
  private _pgPool: PgPool;
  get PgPool() {
    if (!this._pgPool) {
      this._pgPool = new PgPool(configModule.EnvConfig);
    }
    return this._pgPool;
  }

  private _pgMigrator: PgMigrator;
  get PgMigrator() {
    if (!this._pgMigrator) {
      this._pgMigrator = new PgMigrator(this.PgPool, migrations);
    }
    return this._pgMigrator;
  }
}

export const databaseModule = new DataBaseModule();
