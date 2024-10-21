import { ExpressApp } from "app.js";
import { configModule } from "config/config.module.js";

const { EnvConfig } = configModule;

export const app = new ExpressApp();

app.boot(EnvConfig.envs.port);
