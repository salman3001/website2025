import { PgMigration } from "../types/index.js";
import { migrationOne } from "./migrationOne.js";
import { migrationTwo } from "./migrationTwo.js";

export default [migrationOne, migrationTwo] as PgMigration[];
