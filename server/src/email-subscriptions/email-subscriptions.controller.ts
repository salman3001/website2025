import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { UpdateEmailSubscriptionDto } from './dto/update-email-subscription.dto';
import { EmailSubscriptionPolicy } from './email-subscriptions.policy';
import { PolicyService } from '@salman3001/nest-policy-module';
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email Subscriptions')
@Controller('email-subscriptions')
export class EmailSubscriptionsController {
  constructor(
    private readonly emailSubscriptionsService: EmailSubscriptionsService,
    @Inject('EmailSubscriptionPolicy')
    private readonly policy: PolicyService<EmailSubscriptionPolicy>,
  ) {}

  @Post()
  async create(@Body() dto: CreateEmailSubscriptionDto) {
    await this.policy.authorize('create');
    const subscription = this.emailSubscriptionsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { subscription },
      message: 'Subscription Created',
    });
  }

  @Get()
  async findAll(
    @Query() qs: Record<string, any>,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('findAll', authUser);

    const { subscriptions, count } =
      await this.emailSubscriptionsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { subscriptions, count },
    });
  }

  @Get(':email')
  async findOne(
    @Param('email') email: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const subscription = await this.emailSubscriptionsService.findOne({
      email,
    });
    await this.policy.authorize('findOne', authUser, subscription.email);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { subscription },
    });
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() dto: UpdateEmailSubscriptionDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const subscription = await this.emailSubscriptionsService.update(
      email,
      dto,
    );

    await this.policy.authorize('update', authUser, subscription.email);

    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { subscription },
      message: 'Subscription Updated',
    });
  }

  @Delete(':email')
  async remove(
    @Param('email') email: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('delete', authUser);
    const subscription = await this.emailSubscriptionsService.remove(email);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { subscription },
      message: 'Subscription deleted',
    });
  }
}
