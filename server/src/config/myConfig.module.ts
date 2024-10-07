import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './env.config';
import { envValidator } from './env.validator';
import appConfig from './app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig, appConfig],
      cache: true,
      validate: envValidator,
      isGlobal: true,
    }),
  ],
})
export class MyConfigModule {}
