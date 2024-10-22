import { config } from "dotenv";
import { join } from "path";

export class EnvConfig {
  constructor() {
    config({ path: join(process.cwd(), ".env") });
    this.validate();
  }

  get envs() {
    return {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT as unknown as number,
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
      appSecrete: process.env.APP_SECRETE,
      frontUrl: process.env.FRONT_URL,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS,
      resendKey: process.env.RESEND_KEY,
      uploadsPath: process.env.UPLOADS_PATH,
      dbAdapter: process.env.DB_ADAPTER,
      pgConnString: process.env.PG_CONN_STRING,
      mongoUri: process.env.MONGO_URI,
    };
  }

  validate() {
    for (const key in this.envs) {
      if (Object.prototype.hasOwnProperty.call(this.envs, key)) {
        const element = this.envs[key as keyof typeof this.envs];
        if (!element) {
          throw new Error(`Environment variable "${key}" is not defined`);
        }
      }
    }
  }
}
