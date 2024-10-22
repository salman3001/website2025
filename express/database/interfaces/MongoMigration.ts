export interface MongoMigration {
  name: string;
  query: Record<string, any>;
  rollbackQuery: Record<string, any>;
}
