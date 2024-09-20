import * as nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from 'src/config/env.config';
import { IMailService } from './interface/ImailService';
import { IMailSendProps } from './interface/IMailSendProps';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeMailService implements IMailService {
  private envConfig: IEnvConfig;
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.envConfig = this.config.get<IEnvConfig>('env');

    this.transporter = nodemailer.createTransport({
      // @ts-expect-error it is defined
      host: this.envConfig.smtpHost,
      port: this.envConfig.smtpPort,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: this.envConfig.smtpUser,
        pass: this.envConfig.smtpPort,
      },
    });
  }

  async send(sendProps: IMailSendProps) {
    const appName = this.envConfig.appName;
    const from = `admin@${appName}.com`;

    const emailHtml = await render(sendProps.react());
    try {
      await this.transporter.sendMail({
        from,
        to: sendProps.to,
        subject: sendProps.subject,
        html: emailHtml,
      });
    } catch (error) {
      console.log('Faled to send email : Error -', error);
    }
  }
}
