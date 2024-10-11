import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';

import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFIlter';
import {
  ApiBody,
  ApiConsumes,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import { CreateMediaDto } from './dto/create-media.dto';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { MediaPolicy } from './media.policy';
import { UploadFileDto } from './dto/upload-file.dto';
import { MediaQueryDto } from './dto/media-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly policyService: MediaPolicy,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'file',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  @ApiBody({
    description: 'File image',
    type: IntersectionType(UploadFileDto, CreateMediaDto),
  })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() dto: CreateMediaDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.policyService.canCreate(authUser);

    const media = await this.mediaService.create(dto, file);
    return CustomRes({ code: 201, success: true, data: media });
  }

  @Get()
  async findAll(
    @Query() query: MediaQueryDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policyService.canFindAll();

    const { mediaCategoryId, search, ...commonQueryDto } = query;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search ? { name: { contains: search } } : {};

    const categoryQuery = mediaCategoryId
      ? { mediaCategoryId: { equals: mediaCategoryId } }
      : {};

    const { count, media } = await this.mediaService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery, ...categoryQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return CustomRes({
      code: 200,
      success: true,
      data: { data: media, count },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    this.policyService.canFindOne();

    const media = await this.mediaService.findOne({ id: +id });
    return CustomRes({ code: 200, success: true, data: media });
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'file',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File image',
    type: IntersectionType(UploadFileDto, UpdateMediaDto),
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMediaDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.policyService.canUpdate(authUser);

    const media = await this.mediaService.update(+id, dto, file);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Media Updated',
      data: media,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    this.policyService.canDelete(authUser);

    const media = await this.mediaService.remove(+id);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Media Deleted',
      data: media,
    });
  }
}
