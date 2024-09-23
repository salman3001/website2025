import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    if ((req as any)?.user) {
      return true;
    }
    throw new CustomHttpException({
      code: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
      success: false,
    });
  }
}
