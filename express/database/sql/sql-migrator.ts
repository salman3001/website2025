import { Migrator } from "database/interfaces/Migrator.js";
import { SqlDb } from "./sql-db.js";
import { NO_MIGRATIONS } from "kysely";

export class SqlMigrator implements Migrator {
  constructor(private sqlDb: SqlDb) {}
  async run(): Promise<void> {
    const { error, results } = await this.sqlDb.Migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(
          `migration "${it.migrationName}" was executed successfully`,
        );
      } else if (it.status === "Error") {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
    }

    await this.sqlDb.Db.destroy();
  }

  async resetLast(): Promise<void> {
    const { results, error } = await this.sqlDb.Migrator.migrateDown();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(`migration "${it.migrationName}" was reset successfully`);
      } else if (it.status === "Error") {
        console.error(`failed to reset migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to reset last migration");
      console.error(error);
      process.exit(1);
    }

    await this.sqlDb.Db.destroy();
  }

  async resetDb(): Promise<void> {
    const { results, error } = await this.sqlDb.Migrator.migrateTo(
      NO_MIGRATIONS,
    );

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(`migration "${it.migrationName}" was reset successfully`);
      } else if (it.status === "Error") {
        console.error(`failed to reset migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to reset last migration");
      console.error(error);
      process.exit(1);
    }

    await this.sqlDb.Db.destroy();
  }

  // async run() {
  //   await this.createMigrationTableIfNotExits();
  //   const dbMigrations = await this.getAllMigrationsFromDb();

  //   await this.pgPool.transaction(async (client) => {
  //     for (const migration of this.migrations) {
  //       if (
  //         dbMigrations.rows.some((row: any) => row?.name === migration.name)
  //       ) {
  //         console.log(
  //           `SKIPED - Migration -- "${migration.name}" is already is db`,
  //         );
  //       } else {
  //         await client.query(migration.query);
  //         await this.addMigrationToDb(migration);

  //         console.log(`Success - Migration -- "${migration.name}" applied`);
  //       }
  //     }
  //   });
  //   this.pgPool.end();
  // }

  // async resetLast() {
  //   await this.createMigrationTableIfNotExits();
  //   const dbMigrations = await this.getAllMigrationsFromDb();
  //   const dbLastMigration = dbMigrations.rows.at(-1);

  //   if (dbLastMigration) {
  //     const lastMigrationToReset = this.migrations.find(
  //       (mig) => mig.name === dbLastMigration.name,
  //     );
  //     if (lastMigrationToReset) {
  //       await this.pgPool.transaction(async (client) => {
  //         await client.query(lastMigrationToReset?.rollbackQuery);
  //         console.log(
  //           `Success - Migration -- "${lastMigrationToReset.name}" reset successfully`,
  //         );
  //         await client.query(
  //           `
  //             DELETE FROM migrations
  //             WHERE name = $1;
  //         `,
  //           [lastMigrationToReset.name],
  //         );
  //       });
  //     } else {
  //       console.log(
  //         "No local migration name found matching the db migrations. Please check your local migrations. If any name is changed",
  //       );
  //     }
  //   } else {
  //     console.log("No migration to reset");
  //   }
  //   this.pgPool.end();
  // }

  // async resetDb() {
  //   const tables = await this.getAllTables();
  //   for (const table of tables.rows) {
  //     const query = `
  //     DROP TABLE IF EXISTS ${table.tablename} CASCADE;
  //     `;
  //     await this.pgPool.query(query);
  //     console.log("Db Reset Successfully");
  //   }
  //   this.pgPool.end();
  // }

  // private async createMigrationTableIfNotExits() {
  //   const query = `
  //   CREATE TABLE IF NOT EXISTS migrations (
  //       id SERIAL PRIMARY KEY,
  //       name VARCHAR(256) UNIQUE NOT NULL
  //    );
  //   `;

  //   await this.pgPool.transaction(async (client) => {
  //     await client.query(query);
  //   });
  // }

  // private async getAllMigrationsFromDb() {
  //   const query = `
  //   SELECT * from migrations;
  //   `;

  //   const results = await this.pgPool.transaction(async (client) => {
  //     const results = await client.query<PgMigration>(query);
  //     return results;
  //   });

  //   return results;
  // }

  // private async addMigrationToDb(migration: PgMigration) {
  //   const query = `
  //   INSERT INTO migrations (name)
  //   VALUES ($1)
  //   `;

  //   await this.pgPool.transaction(async (client) => {
  //     await client.query<PgMigration>(query, [migration.name]);
  //   });
  // }

  // private async getAllTables() {
  //   const tables = await this.pgPool.query<{ tablename: string }>(
  //     "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
  //   );
  //   return tables;
  // }
}
