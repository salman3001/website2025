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
import { DiscussionPolicy } from './disicussion.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';
import {
  DiscussionFindOneQuery,
  DiscussionQueryDto,
} from './dto/discussion-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('Discusions')
@Controller('discussions')
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,

    private readonly policy: DiscussionPolicy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateDiscussionDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
    const userId = authUser.id;
    const discussion = await this.discussionsService.create(dto, userId);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: discussion,
      message: 'Discussion Category Created',
    });
  }

  @Get()
  async findAll(@Query() qs: DiscussionQueryDto) {
    this.policy.canFindAll();

    const { search, ...commonQueryDto } = qs;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search
      ? { title: { contains: search, mode: 'insensitive' as any } }
      : {};

    const { discussions, count } = await this.discussionsService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: discussions, count },
    });
  }

  @Get(':slug')
  async findOne(
    @Param('slug') slug: string,
    @Query() qs: DiscussionFindOneQuery,
  ) {
    this.policy.canFindOne();

    const { selectQuery } = generateCommonPrismaQuery(qs);

    const discussion = await this.discussionsService.findOne({
      where: { slug },
      select: selectQuery,
    });
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: discussion,
    });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: UpdateDiscussionDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canUpdate(authUser);

    const discussion = await this.discussionsService.update(slug, dto);
    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: discussion,
      message: 'Discussion Updated',
    });
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canDelete(authUser);

    const discussion = await this.discussionsService.remove(slug);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: discussion,
      message: 'Discusssion deleted',
    });
  }
}
