import { Controller, Get } from '@nestjs/common';
import { ExportImportService } from './export-import.service';

@Controller('export-import')
export class ExportImportController {
  constructor(private exportImportService: ExportImportService) {}
  @Get('tags')
  async findAll() {
    const { tags, count } = await this.tagsService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });
  }
}
