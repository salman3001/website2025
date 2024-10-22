export interface Migrator {
  run(): Promise<void>;
  resetLast(): Promise<void>;
  resetDb(): Promise<void>;
}
