import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CustomHttpException } from './CustomHttpException';
import { NestPolicyError } from '@salman3001/nest-policy-module';
import { unlinkSync } from 'fs';

@Catch()
export class GlobalHttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const file = request.file;
    const files = request.files;

    if (file) {
      unlinkSync(file.path);
    }

    if (files && files instanceof Array) {
      files.forEach((file) => {
        unlinkSync(file.path);
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      if (exception instanceof CustomHttpException) {
        return response.status(status).json({
          success: false,
          message: message,
          data: null,
          code: status,
          errors: exception.errors,
        });
      } else {
        return response.status(status).json({
          success: false,
          message: message,
          data: null,
          code: status,
          cause: exception.cause,
        });
      }
    }

    if (exception instanceof NestPolicyError) {
      const status = exception.getStatus();
      const message = exception.message;

      return response.status(status).json({
        success: false,
        message: message,
        data: null,
        code: status,
        cause: exception.cause,
      });
    }

    return response.status(500).json({
      success: false,
      message: 'Server Error ' + (exception as any)?.message,
      data: null,
      code: 200,
    });
  }
}
