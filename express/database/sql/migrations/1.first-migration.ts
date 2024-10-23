import { Kysely, Migration, sql } from "kysely";

export const firstMigration: Migration = {
  async up(db: Kysely<any>): Promise<void> {
    await db.schema.createType("userType").asEnum(["Admin", "User"]).execute();

    await db.schema
      .createTable("users")
      .addColumn("id", "serial", (col) => col.primaryKey().autoIncrement())
      .addColumn("fullName", "varchar", (col) => col.notNull())
      .addColumn("email", "varchar", (col) => col.notNull().unique())
      .addColumn("userType", sql`userType`, (col) =>
        col.notNull().defaultTo("User"),
      )
      .addColumn("isActive", "boolean", (col) => col.notNull().defaultTo(false))
      .addColumn("emailVerified", "boolean", (col) =>
        col.notNull().defaultTo(false),
      )
      .addColumn("createdAt", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull(),
      )
      .addColumn("updatedAt", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull(),
      )
      .execute();
  },

  async down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("person").execute();
    await db.schema.dropType("userType").execute();
  },
};
