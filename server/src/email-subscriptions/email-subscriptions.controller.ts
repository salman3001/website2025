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
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';
import {
  EmailSubscriptionFindOneQuery,
  EmailSubscriptionQueryDto,
} from './dto/email-subscription-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('Email Subscriptions')
@Controller('email-subscriptions')
export class EmailSubscriptionsController {
  constructor(
    private readonly emailSubscriptionsService: EmailSubscriptionsService,
    private readonly policy: EmailSubscriptionPolicy,
  ) {}

  @Post()
  async create(@Body() dto: CreateEmailSubscriptionDto) {
    this.policy.canCreate();
    const subscription = await this.emailSubscriptionsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: subscription,
      message: 'Subscription Created',
    });
  }

  @Get()
  async findAll(
    @Query() qs: EmailSubscriptionQueryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canFindAll(authUser);

    const { search, ...commonQueryDto } = qs;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const { subscriptions, count } =
      await this.emailSubscriptionsService.findAll({
        skip,
        take,
        orderBy: orderByQuery,
        select: selectQuery,
      });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: subscriptions, count },
    });
  }

  @Get(':email')
  async findOne(
    @Param('email') email: string,
    @AuthUser() authUser: AuthUserType,
    @Query() qs: EmailSubscriptionFindOneQuery,
  ) {
    const { selectQuery } = generateCommonPrismaQuery(qs);

    const subscription = await this.emailSubscriptionsService.findOne({
      where: { email },
      select: selectQuery,
    });

    this.policy.canFindOne(authUser, subscription.email);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: subscription,
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

    this.policy.canUpdate(authUser, subscription.email);

    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: subscription,
      message: 'Subscription Updated',
    });
  }

  @Delete(':email')
  async remove(
    @Param('email') email: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canDelete(authUser);
    const subscription = await this.emailSubscriptionsService.remove(email);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: subscription,
      message: 'Subscription deleted',
    });
  }
}
