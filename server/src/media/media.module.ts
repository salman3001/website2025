import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { mediaPolicy } from './media.policy';
import { ImageUploadService } from './imageUpload.service';
import { FilesUploadService } from './fileUpload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './temp',
      preservePath: true,
    }),
    PolicyModule.register([{ token: 'MediaPolicy', policy: mediaPolicy }]),
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    ImageUploadService,
    FilesUploadService,
    PrismaService,
  ],
  exports: [ImageUploadService, FilesUploadService],
})
export class MediaModule {}
