import { SqlDb } from "./sql/sql-db.js";
import { SqlMigrator } from "./sql/sql-migrator.js";

import mongoMigrations from "./mongodb/migrations/index.js";
import { Migrator } from "./interfaces/Migrator.js";
import { MongoMigrator } from "./mongodb/mongoMigrator.js";
import { configModule } from "../config/config.module.js";
import { MongoDb } from "./mongodb/mongodb.js";

class DataBaseModule {
  private _sqlDb: SqlDb;
  get SqlDb() {
    if (!this._sqlDb) {
      this._sqlDb = new SqlDb(configModule.EnvConfig);
    }
    return this._sqlDb;
  }

  private _mongoDb: MongoDb;
  get MongoDb() {
    if (!this._mongoDb) {
      this._mongoDb = new MongoDb(configModule.EnvConfig);
    }
    return this._mongoDb;
  }

  private _migrator: Migrator;
  get Migrator() {
    if (!this._migrator) {
      this._migrator =
        configModule.EnvConfig.envs.dbAdapter === "mongodb"
          ? new MongoMigrator(mongoMigrations)
          : new SqlMigrator(this.SqlDb);
    }
    return this._migrator;
  }
}

export const databaseModule = new DataBaseModule();
