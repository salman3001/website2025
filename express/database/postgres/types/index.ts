export interface PgMigration {
  name: string;
  query: string;
  rollbackQuery: string;
}
