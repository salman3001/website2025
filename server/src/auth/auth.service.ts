import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import {
  IJwtPayload,
  JWTConfirmEmailPayload,
  JWTResetPasswordPayload,
} from 'src/utils/types/common';
import { compareSync, hashSync } from 'bcrypt';
import { confirmEmailDto } from './dto/confirmEmail.dto';
import { forgotPasswordOtpDto } from './dto/forgotPasswordOtp.dto';
import { resetPasswordDto } from './dto/resetPassword.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserType } from '@prisma/client';
import { IEnvConfig } from 'src/config/env.config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserForgotPasswordEvent } from 'src/events/events/user-forgotPassword-event';
import { UserSignedupEvent } from 'src/events/events/user-signedup-event';

@Injectable()
export class AuthService {
  envConfig: IEnvConfig;
  constructor(
    config: ConfigService,
    private events: EventEmitter2,
    private prisma: PrismaService,
  ) {
    this.envConfig = config.get<IEnvConfig>('env');
  }

  async login(dto: LoginDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Login Failed',
      });
    }

    if (!user.isActive || !user.emailVerified) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Account is inactive or unverified',
      });
    }

    const isPasswordValid = compareSync(dto.password, user.password);

    if (!isPasswordValid) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Invalid Credentials',
      });
    }
    return user;
  }

  async register(dto: RegisterDto): Promise<User> {
    const { password, ...rest } = dto;

    const existUser = await this.prisma.user.findFirst({
      where: { email: rest.email },
    });

    if (existUser) {
      throw new CustomHttpException({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        success: false,
        message: 'Account already exist',
      });
    }

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashSync(password, 10),
        emailVerified: false,
        userType: UserType.User,
        isActive: true,
        profile: {},
      },
    });

    if (user) {
      this.events.emit('user:signedup', new UserSignedupEvent(user));
    }

    return user;
  }

  async confirmEmail(dto: confirmEmailDto): Promise<User> {
    const payload = this.varifyToken(dto.jwt) as JWTConfirmEmailPayload;

    if (payload.tokenType !== 'confirm-email') {
      throw new CustomHttpException({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Invalid Token',
      });
    }

    const user = await this.prisma.user.update({
      where: { email: payload.email },
      data: {
        emailVerified: true,
      },
    });

    return user;
  }

  async forgotPasswordOtp(dto: forgotPasswordOtpDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email: dto.email,
      },
    });

    this.events.emit('user:forgot-password', new UserForgotPasswordEvent(user));
  }

  async resetPassword(dto: resetPasswordDto): Promise<User> {
    const payload = this.varifyToken(dto.jwt) as JWTResetPasswordPayload;

    if (payload.tokenType !== 'reset-password' && !payload?.id) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'Invalid token',
      });
    }

    const user = await this.prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        password: hashSync(dto.password, 10),
      },
    });

    return user;
  }

  getToken(payload: IJwtPayload, opt?: jwt.SignOptions) {
    return jwt.sign(payload, this.envConfig.appSecrete, opt);
  }

  varifyToken(token: string): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(token, this.envConfig.appSecrete);
      return payload;
    } catch (error) {
      throw new CustomHttpException({
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: error?.message,
      });
    }
  }
}
