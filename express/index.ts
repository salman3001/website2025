import express, { static as _static, json, urlencoded } from "express";
import { join } from "node:path";
import { userModule } from "modules/users/user.module.js";
import cookieParser from "cookie-parser";
import { configModule } from "modules/config/config.module.js";

const { EnvConfig } = configModule;

const app = express();

app.use(_static(join(process.cwd(), "public")));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userModule.UserController.router);

app.listen(EnvConfig.envs.port, () => {
  console.log(`app running on localhost:${EnvConfig.envs.port}`);
});
