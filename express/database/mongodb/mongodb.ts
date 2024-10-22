import { configModule } from "config/config.module.js";
import { EnvConfig } from "config/env-config.js";
import { Collection, Db, MongoClient } from "mongodb";

export class MongoDb {
  private _client: MongoClient;
  private _db: Db;

  constructor(private config: EnvConfig) {}

  get Client() {
    if (!this._client) {
      this._client = new MongoClient(this.config.envs.mongoUri!);
    }
    return this._client;
  }

  get Db() {
    if (!this._db) {
      this._db = this.Client.db(this.config.envs.mongoDbName);
    }
    return this._db;
  }

  getCollection(name: string) {
    return this.Db.collection(name) as Collection<any>;
  }
}
