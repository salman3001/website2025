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
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UpladFileDto } from './dto/upload-file.dto';
import { CreateMediaDto } from './dto/create-media.dto';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File image',
    type: UpladFileDto,
  })
  create(
    @Body() dto: CreateMediaDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    const media = this.mediaService.create(dto, file);
    return CustomRes({ code: 200, success: true, data: media });
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    const { skip, take, orderBy, search, mediaCategoryId } = query;
    const searchQuery = search ? { name: { contains: search } } : {};
    const categoryQuery = mediaCategoryId
      ? { mediaCategoryId: { equals: mediaCategoryId } }
      : {};

    const data = await this.mediaService.findAll({
      skip,
      take,
      orderBy,
      where: { AND: { ...searchQuery, ...categoryQuery } },
    });

    return CustomRes({ code: 200, success: true, data });
  }

  @Get('category/:id')
  async findAllByCategory(
    @Param('id') id: string,
    @Query() query: Record<string, any>,
  ) {
    const { skip, take, orderBy, search } = query;
    const searchQuery = search ? { name: { contains: search } } : {};

    const data = await this.mediaService.findAll({
      skip,
      take,
      orderBy,
      where: { AND: { mediaCategoryId: +id, ...searchQuery } },
    });

    return CustomRes({ code: 200, success: true, data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const media = await this.mediaService.findOne({ id: +id });
    return CustomRes({ code: 200, success: true, data: media });
  }

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File image',
    type: UpladFileDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMediaDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    const media = await this.mediaService.update(+id, dto, file);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Media Updated',
      data: media,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const media = await this.mediaService.remove(+id);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Media Deleted',
      data: media,
    });
  }
}
