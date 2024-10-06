import { registerAs } from '@nestjs/config';
import path, { join } from 'path';

const appConfig = registerAs('app', () => ({
  appPath: join(process.cwd(), '..'),
}));

export default appConfig;

export type IAppConfig = ReturnType<typeof appConfig>;
