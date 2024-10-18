import { Module } from '@nestjs/common';
import { ExportImportService } from './export-import.service';
import { ExportImportController } from './export-import.controller';

@Module({
  providers: [ExportImportService],
  controllers: [ExportImportController],
})
export class ExportImportModule {}
