import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './env.config';
import { envValidator } from './env.validator';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      cache: true,
      validate: envValidator,
    }),
  ],
})
export class MyConfigModule {}
