import { Migration } from "database/interfaces/Migration.js";
import { migrationOne } from "./migrationOne.js";
import { migrationTwo } from "./migrationTwo.js";

export default [migrationOne, migrationTwo] as Migration[];
