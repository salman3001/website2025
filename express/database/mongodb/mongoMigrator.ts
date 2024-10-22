import { Migration } from "database/interfaces/Migration.js";
import { Migrator } from "database/interfaces/Migrator.js";

export class MongoMigrator implements Migrator {
  constructor(private migrations: Migration[]) {}
  run(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  resetLast(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  resetDb(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
