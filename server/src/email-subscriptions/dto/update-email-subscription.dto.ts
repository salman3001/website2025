import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmailSubscriptionDto } from './create-email-subscription.dto';

export class UpdateEmailSubscriptionDto extends OmitType(
  PartialType(CreateEmailSubscriptionDto),
  ['email'],
) {}
