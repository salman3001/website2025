import { Migrator } from "database/interfaces/Migrator.js";
import { PgPool } from "./pgPool.js";
import { Migration } from "database/interfaces/Migration.js";

export class PgMigrator implements Migrator {
  constructor(private pgPool: PgPool, private migrations: Migration[]) {}

  async run() {
    await this.createMigrationTableIfNotExits();
    const dbMigrations = await this.getAllMigrationsFromDb();

    await this.pgPool.transaction(async (client) => {
      for (const migration of this.migrations) {
        if (dbMigrations.rows.some((row) => row?.name === migration.name)) {
          console.log(
            `SKIPED - Migration -- "${migration.name}" is already is db`,
          );
        } else {
          await client.query(migration.query);
          await this.addMigrationToDb(migration);

          console.log(`Success - Migration -- "${migration.name}" applied`);
        }
      }
    });
    this.pgPool.end();
  }

  async resetLast() {
    await this.createMigrationTableIfNotExits();
    const dbMigrations = await this.getAllMigrationsFromDb();
    const dbLastMigration = dbMigrations.rows.at(-1);

    if (dbLastMigration) {
      const lastMigrationToReset = this.migrations.find(
        (mig) => mig.name === dbLastMigration.name,
      );
      if (lastMigrationToReset) {
        await this.pgPool.transaction(async (client) => {
          await client.query(lastMigrationToReset?.rollbackQuery);
          console.log(
            `Success - Migration -- "${lastMigrationToReset.name}" reset successfully`,
          );
          await client.query(
            `
              DELETE FROM migrations
              WHERE name = $1;
          `,
            [lastMigrationToReset.name],
          );
        });
      } else {
        console.log(
          "No local migration name found matching the db migrations. Please check your local migrations. If any name is changed",
        );
      }
    } else {
      console.log("No migration to reset");
    }
    this.pgPool.end();
  }

  async resetDb() {
    const tables = await this.getAllTables();
    for (const table of tables.rows) {
      const query = `
      DROP TABLE IF EXISTS ${table.tablename} CASCADE;
      `;
      await this.pgPool.query(query);
      console.log("Db Reset Successfully");
    }
    this.pgPool.end();
  }

  private async createMigrationTableIfNotExits() {
    const query = `
    CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) UNIQUE NOT NULL
     );
    `;

    await this.pgPool.transaction(async (client) => {
      await client.query(query);
    });
  }

  private async getAllMigrationsFromDb() {
    const query = `
    SELECT * from migrations;
    `;

    const results = await this.pgPool.transaction(async (client) => {
      const results = await client.query<Migration>(query);
      return results;
    });

    return results;
  }

  private async addMigrationToDb(migration: Migration) {
    const query = `
    INSERT INTO migrations (name)
    VALUES ($1)
    `;

    await this.pgPool.transaction(async (client) => {
      await client.query<Migration>(query, [migration.name]);
    });
  }

  private async getAllTables() {
    const tables = await this.pgPool.query<{ tablename: string }>(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
    );
    return tables;
  }
}
