import { EnvConfig } from "./env-config.js";

class ConfigModule {
  private _envConfig: EnvConfig;
  get EnvConfig() {
    if (!this._envConfig) this._envConfig = new EnvConfig();
    return this._envConfig;
  }
}

export const configModule = new ConfigModule();
