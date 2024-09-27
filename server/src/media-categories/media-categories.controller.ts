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
import { MediaCategoriesService } from './media-categories.service';
import { CreateMediaCategoryDto } from './dto/create-media-category.dto';
import { UpdateMediaCategoryDto } from './dto/update-media-category.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { MediaCategoryPolicy } from './media-category.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Media Categories')
@Controller('media-categories')
export class MediaCategoriesController {
  constructor(
    private readonly mediaCategoriesService: MediaCategoriesService,
    @Inject('MediaCategoryPolicy')
    private readonly policy: PolicyService<MediaCategoryPolicy>,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateMediaCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('create', authUser);
    const mediaCategory = this.mediaCategoriesService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { mediaCategory },
      message: 'Media Category Created',
    });
  }

  @Get()
  async findAll(
    @Query() qs: Record<string, any>,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('findAll', authUser);

    const { mediaCategories, count } =
      await this.mediaCategoriesService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { mediaCategories, count },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    await this.policy.authorize('findOne', authUser);

    const mediaCategory = await this.mediaCategoriesService.findOne({ id });
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { mediaCategory },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMediaCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('update', authUser);
    const mediaCategory = await this.mediaCategoriesService.update(id, dto);
    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { mediaCategory },
      message: 'Media Category Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    await this.policy.authorize('delete', authUser);

    const mediaCategory = await this.mediaCategoriesService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { mediaCategory },
      message: 'Media Category deleted',
    });
  }
}
