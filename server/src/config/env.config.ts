import { registerAs } from '@nestjs/config';

const envConfig = registerAs('env', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.NODE_ENV as unknown as number,
  appName: process.env.APP_NAME,
  appSecrete: process.env.APP_SECRETE,
  frontUrl: process.env.FRONT_URL,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  resendKey: process.env.RESEND_KEY,
}));

export default envConfig;

export type IEnvConfig = ReturnType<typeof envConfig>;
