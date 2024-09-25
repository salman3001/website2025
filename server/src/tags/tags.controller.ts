import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  Inject,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { TagPolicy } from './tags.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    @Inject('TagPolicy') private readonly policy: PolicyService<TagPolicy>,
  ) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateTagDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('create', authUser);
    const tag = this.tagsService.create(createBlogDto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { tag },
      message: 'Tag Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    await this.policy.authorize('findAll');

    const { tags, count } = await this.tagsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { tags, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    await this.policy.authorize('findOne');

    const tag = await this.tagsService.findOne({ slug });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { tag } });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateTagDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('update', authUser);
    const blogCategory = await this.tagsService.update(slug, updateBlogDto);

    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { blogCategory },
      message: 'Tag Updated',
    });
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('delete', authUser);
    const tag = await this.tagsService.remove(slug);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { tag },
      message: 'Tag deleted',
    });
  }
}
