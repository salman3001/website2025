import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageUploadService } from './imageUpload.service';
import { FilesUploadService } from './fileUpload.service';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private imageUpload: ImageUploadService,
    private fileUpload: FilesUploadService,
  ) {}

  async create(dto: CreateMediaDto, file: Express.Multer.File) {
    const { mediaCategoryId, ...restDto } = dto;

    const url = await this.uploadMedia(file, dto.type);

    const media = await this.prisma.media.create({
      data: {
        ...restDto,
        url,
        type: dto.type,
        MediaCategory: {
          connect: mediaCategoryId ? { id: mediaCategoryId } : undefined,
        },
      },
    });

    return media;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MediaWhereUniqueInput;
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const [count, media] = await this.prisma.$transaction([
      this.prisma.media.count(),
      this.prisma.media.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    ]);
    return { count, media };
  }

  findOne(where: Prisma.MediaWhereUniqueInput) {
    return this.prisma.media.findUnique({
      where,
    });
  }

  async update(id: number, dto: UpdateMediaDto, file: Express.Multer.File) {
    const media = await this.prisma.media.findFirstOrThrow({
      where: {
        id,
      },
    });

    const url = await this.uploadMedia(file, media.type);

    const updatedMedia = await this.prisma.media.update({
      where: {
        id: media.id,
      },
      data: {
        ...dto,
        url,
      },
    });

    await this.removeMedia(media.url, media.type);

    return updatedMedia;
  }

  async remove(id: number) {
    const media = await this.prisma.media.findFirstOrThrow({
      where: {
        id,
      },
    });

    await this.removeMedia(media.url, media.type);
    await this.prisma.media.delete({ where: { id } });
    return media;
  }

  private async uploadMedia(file: Express.Multer.File, type: MediaType) {
    if (!file) {
      throw new CustomHttpException({
        success: false,
        code: 400,
        message: 'File is required',
      });
    }

    if (type === MediaType.Image) {
      const { url } = await this.imageUpload.uploadImage(file, 'images');
      return url;
    }

    if (type === MediaType.document) {
      const url = await this.fileUpload.uploadFile(file, 'documents');
      return url;
    }
  }

  private async removeMedia(url: string, type: MediaType) {
    if (type === MediaType.Image) {
      await this.imageUpload.deleteImage(url);
    }

    if (type === MediaType.document) {
      await this.fileUpload.deleteFile(url);
    }
  }
}
