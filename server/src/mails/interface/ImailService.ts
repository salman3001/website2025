import { IMailSendProps } from './IMailSendProps';

export abstract class IMailService {
  abstract send(sendProps: IMailSendProps): Promise<void>;
}
