import { configModule } from "modules/config/config.module.js";
import mongoose from "mongoose";

const { EnvConfig } = configModule;

export const mongoConection = mongoose.createConnection(
  EnvConfig.envs.mongoUri!,
);
