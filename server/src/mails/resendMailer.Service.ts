import { Resend } from 'resend';
import { IMailService } from './interface/ImailService';
import { IEnvConfig } from 'src/config/env.config';
import { IMailSendProps } from './interface/IMailSendProps';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResendMailService implements IMailService {
  private readonly envConfig: IEnvConfig;
  private resend: Resend;

  constructor(private config: ConfigService) {
    this.envConfig = config.get<IEnvConfig>('env');
    this.resend = new Resend(this.envConfig.resendKey);
  }

  async send(sendProps: IMailSendProps) {
    const appName = this.envConfig.appName;
    const from = `admin@${appName}.com`;
    try {
      await this.resend.emails.send({
        from,
        to: sendProps.to,
        subject: sendProps.subject,
        react: sendProps.react(),
      });
    } catch (error) {
      console.log('Faled to send email : Error -', error);
    }
  }
}
