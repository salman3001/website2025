import { Module } from '@nestjs/common';
import { ExportImportService } from './export-import.service';
import { ExportImportController } from './export-import.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
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
  providers: [ExportImportService, PrismaService],
  controllers: [ExportImportController],
})
export class ExportImportModule {}
