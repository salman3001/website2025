import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { existsSync, unlink, unlinkSync } from 'fs';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class DeleteTempFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const runFileDeletor = () => {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const file = request?.file;
      const files = request?.files;

      if (file?.path && existsSync(file.path)) {
        unlinkSync(file.path);
      }

      if (files && files instanceof Array) {
        if (file?.path && existsSync(file.path)) {
          unlink(file.path, () => {});
        }
      }
    };
    return next.handle().pipe(
      tap(() => {
        runFileDeletor();
      }),
      catchError((err) => {
        console.log('ran deleteors');

        runFileDeletor();
        return throwError(() => err);
      }),
    );
  }
}
