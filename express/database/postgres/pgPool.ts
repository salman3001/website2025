import { PostgressError } from "common/exceptions/postgres-error.js";
import { EnvConfig } from "config/env-config.js";
import pg from "pg";

const { Pool } = pg;

export class PgPool {
  private pool: pg.Pool;
  constructor(private config: EnvConfig) {
    this.pool = new Pool({ connectionString: this.config.envs.pgConnString });
  }

  async query<T>(text: string, values?: any[]) {
    try {
      // @ts-ignore
      const results = await this.pool.query<T>(text, values);
      return results;
    } catch (error: any) {
      throw new PostgressError(error?.message || "Postgress Error", error);
    }
  }

  async transaction<T>(cb: (client: pg.PoolClient) => Promise<T>) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const results = await cb(client);
      await client.query("COMMIT");
      return results;
    } catch (e: any) {
      await client.query("ROLLBACK");
      throw new PostgressError(e?.message || "Postgress Error", e);
    } finally {
      client.release();
    }
  }

  end() {
    this.pool.end();
  }
}
