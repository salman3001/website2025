import { Migrator } from "database/interfaces/Migrator.js";
import { MongoMigration } from "database/interfaces/MongoMigration.js";

export class MongoMigrator implements Migrator {
  constructor(private migrations: MongoMigration[]) {}
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
