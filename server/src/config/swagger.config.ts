import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (appName: string) =>
  new DocumentBuilder()
    .setTitle(appName)
    .setDescription('All server apis documented here')
    .setVersion('1.0')
    .addTag(appName)
    .build();
