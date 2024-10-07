import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { existsSync, unlink, unlinkSync } from 'fs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DeleteTempFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const file = request?.file;
        const files = request?.files;
        console.log(file);

        if (file?.path && existsSync(file.path)) {
          unlinkSync(file.path);
        }

        if (files && files instanceof Array) {
          if (file?.path && existsSync(file.path)) {
            unlink(file.path, () => {});
          }
        }
      }),
    );
  }
}
