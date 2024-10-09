import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { generateClassValidatorErrors } from '../helpers';
import { CustomHttpException } from '../Exceptions/CustomHttpException';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory(errors) {
        return new CustomHttpException({
          success: false,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Validation Failed',
          errors: generateClassValidatorErrors(errors),
        });
      },
    });
  }
}
