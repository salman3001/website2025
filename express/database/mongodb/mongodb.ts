import { configModule } from "config/config.module.js";
import { Collection, Db, MongoClient } from "mongodb";

export class MongoDb {
  private _client: MongoClient;
  private _db: Db;

  constructor(public dbName: string) {}

  get Client() {
    if (!this._client) {
      this._client = new MongoClient(configModule.EnvConfig.envs.mongoUri!);
    }
    return this._client;
  }

  get Db() {
    if (!this._db) {
      this._db = this.Client.db(this.dbName);
    }
    return this._db;
  }

  getCollection(name: string) {
    return this.Db.collection(name) as Collection<any>;
  }
}

export const mongoDb = new MongoDb(configModule.EnvConfig.envs.mongoDbName!);
