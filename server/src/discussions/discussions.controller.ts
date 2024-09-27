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
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { DiscussionPolicy } from './disicussion.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Discusions')
@Controller('discussions')
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,
    @Inject('DiscussionPolicy')
    private readonly policy: PolicyService<DiscussionPolicy>,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateDiscussionDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('create', authUser);
    const userId = authUser.id;
    const discussion = this.discussionsService.create(dto, userId);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { discussion },
      message: 'Discussion Category Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    await this.policy.authorize('findAll');

    const { discussions, count } = await this.discussionsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { discussions, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    await this.policy.authorize('findOne');

    const discussion = await this.discussionsService.findOne({ slug });
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { discussion },
    });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: UpdateDiscussionDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('update', authUser);
    const discussion = await this.discussionsService.update(slug, dto);
    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { discussion },
      message: 'Discussion Updated',
    });
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('delete', authUser);
    const discussion = await this.discussionsService.remove(slug);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { discussion },
      message: 'Discusssion deleted',
    });
  }
}
