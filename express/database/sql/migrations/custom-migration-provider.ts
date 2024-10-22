import { Migration, MigrationProvider } from "kysely";
import migrations from "./index.js";

export class CustomMigrationProvider implements MigrationProvider {
  async getMigrations(): Promise<Record<string, Migration>> {
    return migrations;
  }
}
