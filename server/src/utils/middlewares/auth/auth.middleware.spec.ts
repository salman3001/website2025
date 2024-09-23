import { TestBed } from '@automock/jest';
import { AuthMiddleware } from './auth.middleware';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;

  beforeEach(() => {
    const { unit } = TestBed.create(AuthMiddleware)
      .mock(ConfigService)
      .using({
        get: () => ({ APP_SECRETE: 'salman' }),
      })
      .compile();
    authMiddleware = unit;
  });

  it('should be defined', () => {
    expect(authMiddleware).toBeDefined();
  });

  it('should call  next func', () => {
    const req = { cookies: {} } as any;
    const res = {} as any;
    const next = jest.fn() as any;
    authMiddleware.use(req, res, next);

    expect(req['user']).toBeNull();
    expect(next).toHaveBeenCalled();
  });

  it('should fail jwt verifucation', () => {
    const req = { cookies: { auth_token: 'salman' } } as any;
    const res = {} as any;
    const next = jest.fn() as any;
    authMiddleware.use(req, res, next);

    expect(req['user']).toBeNull();
    expect(next).toHaveBeenCalled();
  });

  it('should pass jwt verifucation', () => {
    const token = jwt.sign({ id: 1 }, 'salman');
    const req = { cookies: { auth_token: token } } as any;
    const res = {} as any;
    const next = jest.fn() as any;
    authMiddleware.use(req, res, next);
    expect(req['user']).toBeDefined();
    expect(next).toHaveBeenCalled();
  });
});
