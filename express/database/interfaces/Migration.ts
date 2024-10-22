export interface Migration {
  name: string;
  query: string;
  rollbackQuery: string;
}
