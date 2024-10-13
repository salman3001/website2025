import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IEnvConfig } from 'src/config/env.config';
import { JwtUserPayload } from 'src/utils/types/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}
  use(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers?.authorization || '';
    const auth_token = authHeader.split(' ')[1];

    if (!auth_token) {
      req['user'] = null;
    } else {
      const payload = this.varifyToken(auth_token) as JwtUserPayload;
      if (payload && payload.tokenType === 'auth') {
        req['user'] = payload;
      } else {
        req['user'] = null;
      }
    }

    next();
  }

  varifyToken(token: string): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(
        token,
        this.config.get<IEnvConfig>('env').appSecrete,
      );
      return payload;
    } catch (error) {
      return null;
    }
  }
}
