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
    private readonly policy: MediaCategoryPolicy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateMediaCategoryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
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
    this.policy.canFindAll();

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
    this.policy.canFindOne();

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
    this.policy.canUpdate(authUser);

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
    this.policy.canDelete(authUser);

    const mediaCategory = await this.mediaCategoriesService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { mediaCategory },
      message: 'Media Category deleted',
    });
  }
}
