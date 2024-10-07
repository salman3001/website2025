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
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

import { TagPolicy } from './tags.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly policy: TagPolicy,
  ) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateTagDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
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
    this.policy.canFindAll();

    const { tags, count } = await this.tagsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: tags, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    this.policy.canFindOne();

    const tag = await this.tagsService.findOne({ slug });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { tag } });
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateTagDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canUpdate(authUser);

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
    this.policy.canDelete(authUser);

    const tag = await this.tagsService.remove(slug);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { tag },
      message: 'Tag deleted',
    });
  }
}
