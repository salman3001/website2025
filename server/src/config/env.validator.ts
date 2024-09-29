import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  APP_NAME: string;

  @IsString()
  @IsNotEmpty()
  APP_URL: string;

  @IsString()
  @IsNotEmpty()
  APP_SECRETE: string;

  @IsString()
  @IsNotEmpty()
  FRONT_URL: string;

  @IsString()
  @IsNotEmpty()
  SMTP_HOST: string;

  @IsString()
  @IsNotEmpty()
  SMTP_PORT: string;

  @IsString()
  @IsNotEmpty()
  SMTP_USER: string;

  @IsString()
  @IsNotEmpty()
  SMTP_PASS: string;

  @IsString()
  @IsNotEmpty()
  RESEND_KEY: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

export function envValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
