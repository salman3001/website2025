import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { GlobalHttpExceptionsFilter } from './utils/Exceptions/GlobalHttpExceptionsFilter';
import ValidatorPipe from './utils/pipes/ValidatorPipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalHttpExceptionsFilter());
  app.useGlobalPipes(new ValidatorPipe());

  const config = app.get<ConfigService>(ConfigService);

  //cors
  app.enableCors({
    origin: [config.get<IEnvConfig>('env').frontUrl],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  // swagger
  if (config.get<IEnvConfig>('env').nodeEnv === 'dev') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(config.get<IEnvConfig>('env').appName)
      .setDescription('All server apis documented here')
      .setVersion('1.0')
      .addTag(config.get<IEnvConfig>('env').appName)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('documentation', app, document, {
      useGlobalPrefix: true,
    });
  }

  await app.listen(config.get<IEnvConfig>('env').port);
}
bootstrap();
