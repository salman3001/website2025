import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MediaPolicy } from './media.policy';
import { ImageUploadService } from './imageUpload.service';
import { FilesUploadService } from './fileUpload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './temp',
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
