import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserSignedupEvent } from './events/user-signedup-event';
import { IMailService } from 'src/mails/interface/ImailService';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from 'src/config/env.config';
import * as jwt from 'jsonwebtoken';
import {
  EMAIL_VERIFY_TOKEN_EXPIRY,
  PASSWORD_RESET_TOKEN_EXPIRY,
} from 'src/utils/consts';
import VerifyYourEmail from 'src/mails/templates/VerifyYourEmaill';
import { UserForgotPasswordEvent } from './events/user-forgotPassword-event';
import ForgotPasswordEmail from 'src/mails/templates/ForgotPasswordEmail';

@Injectable()
export class EventsService {
  envConfig: IEnvConfig;
  constructor(
    @Inject(IMailService) private mailService: IMailService,
    config: ConfigService,
  ) {
    this.envConfig = config.get<IEnvConfig>('env');
  }
  @OnEvent('user:signedup')
  async handleUserSignedupEvent(payload: UserSignedupEvent) {
    const token = jwt.sign(
      { tokenType: 'confirm-email', email: payload.user.email },
      this.envConfig.appSecrete,
      { expiresIn: EMAIL_VERIFY_TOKEN_EXPIRY },
    );

    const link = `${this.envConfig.frontUrl}/auth/confirm-email?jwt=${token}`;

    await this.mailService.send({
      subject: 'Please verify your email',
      to: payload.user.email,
      react: () =>
        VerifyYourEmail({ userName: payload.user.fullName, verifyUrl: link }),
    });
  }

  @OnEvent('user:forgot-password')
  async handleUserForgotPasswordEvent(payload: UserForgotPasswordEvent) {
    const token = jwt.sign(
      { tokenType: 'reset-password', id: payload.user.id },
      this.envConfig.appSecrete,
      { expiresIn: PASSWORD_RESET_TOKEN_EXPIRY },
    );

    const link = `${this.envConfig.frontUrl}/auth/reset-password?jwt=${token}`;

    await this.mailService.send({
      subject: 'Reset Your Password',
      to: payload.user.email,
      react: () =>
        ForgotPasswordEmail({
          resetUrl: link,
          userName: payload.user.fullName,
        }),
    });
  }

  //   @OnEvent('user:email-verified')
  //   async handleUserEmailVerifiedEvent(payload: UserEmailVerifiedEvent) {
  //     const token = jwt.sign(
  //       { tokenType: 'reset-password', id: payload.user.id },
  //       this.envConfig.appSecrete,
  //       { expiresIn: PASSWORD_RESET_TOKEN_EXPIRY },
  //     );

  //     const link = `${this.envConfig.frontUrl}/auth/reset-password?jwt=${token}`;

  //     await this.mailService.send({
  //       subject: 'Reset Your Password',
  //       to: payload.user.email,
  //       react: () =>
  //         ForgotPasswordEmail({
  //           resetUrl: link,
  //           userName: payload.user.fullName,
  //         }),
  //     });
  //   }
}
