import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { GlobalHttpExceptionsFilter } from './utils/Exceptions/GlobalHttpExceptionsFilter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from './config/env.config';
import { CustomValidationPipe } from './utils/pipes/CustomValidationPipe';
import { swaggerConfig } from './config/swagger.config';
import { DeleteTempFilesInterceptor } from './utils/interceptors/deleteTempFile.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  // middlewares
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalHttpExceptionsFilter());
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new DeleteTempFilesInterceptor());

  //cors
  app.enableCors({
    origin: [
      config.get<IEnvConfig>('env').frontUrl,
      config.get<IEnvConfig>('env').appUrl,
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  // swagger
  if (config.get<IEnvConfig>('env').nodeEnv === 'development') {
    const document = SwaggerModule.createDocument(
      app,
      swaggerConfig(config.get<IEnvConfig>('env').appName),
    );
    SwaggerModule.setup('documentation', app, document, {});
  }

  await app.listen(config.get<IEnvConfig>('env').port);
}
bootstrap();
