import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MediaPolicy } from './media.policy';
import { ImageUploadService } from './imageUpload.service';
import { FilesUploadService } from './fileUpload.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as multer from 'multer';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      preservePath: true,
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(process.cwd(), 'temp'));
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    ImageUploadService,
    FilesUploadService,
    PrismaService,
    MediaPolicy,
  ],
  exports: [ImageUploadService, FilesUploadService],
})
export class MediaModule {}
