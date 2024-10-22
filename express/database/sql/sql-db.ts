import { PostgressError } from "common/exceptions/postgres-error.js";
import { EnvConfig } from "config/env-config.js";
import pg from "pg";
import {
  FileMigrationProvider,
  MigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
  Migration,
} from "kysely";
import { Database } from "./types/index.js";
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CustomMigrationProvider } from "./migrations/custom-migration-provider.js";

const { Pool } = pg;

export class SqlDb {
  private _db: Kysely<Database>;
  private _migrator: Migrator;

  constructor(private config: EnvConfig) {}

  get Db() {
    if (!this._db) {
      const dialect = new PostgresDialect({
        pool: new Pool({
          connectionString: this.config.envs.pgConnString,
        }),
      });

      this._db = new Kysely({ dialect });
    }
    return this._db;
  }

  get Migrator() {
    if (!this._migrator) {
      const migrationFolder = path.join(
        process.cwd(),
        "database",
        "sql",
        "migrations",
      );

      console.log(migrationFolder);

      this._migrator = new Migrator({
        db: this.Db,
        provider: new CustomMigrationProvider(),
      });
    }

    return this._migrator;
  }
}
