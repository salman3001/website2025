import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { IAppConfig } from 'src/config/app.config';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomRes from 'src/utils/CustomRes';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { generateClassValidatorErrors } from 'src/utils/helpers';
import * as XLSX from 'xlsx';

@Injectable()
export class ExportImportService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  public async export(modelName: string, fileName: string) {
    const records = await this.prisma[modelName].findMany();
    const dataTobeExported = [];

    records.forEach((r: any) => {
      const newObj = {};
      for (const [key, value] of Object.entries(r)) {
        if (
          typeof value === 'string' ||
          typeof value === 'boolean' ||
          typeof value === 'number'
        ) {
          newObj[key] = value;
        }
      }
      dataTobeExported.push(newObj);
    });

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(dataTobeExported);
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const exportDir = join(
      this.config.get<IAppConfig>('app').appPath,
      'temp',
      'exports',
    );

    if (!existsSync(exportDir)) {
      mkdirSync(exportDir, { recursive: true });
    }

    const filePath = join(exportDir, `${fileName}.xlsx`);

    XLSX.writeFile(workbook, filePath, {
      bookType: 'xlsx',
      type: 'file',
    });

    const streamFile = createReadStream(filePath);
    return new StreamableFile(streamFile, {
      disposition: `attachment; filename="${fileName}.xlsx"`,
    });
  }

  public async import<T>(
    modelName: string,
    uniqueKey: string,
    workSheetName: string,
    file: Express.Multer.File,
    validationDto: T,
  ) {
    const book = XLSX.readFile(file.path);
    const sheet = book.Sheets[workSheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as unknown as object[];

    const validateData = [];

    for (const row of data) {
      const validatedRow = await this.validate(row, validationDto);
      validateData.push(validatedRow);
    }

    for (const entry of validateData) {
      await this.prisma[modelName].upsert({
        where: { [uniqueKey]: entry[uniqueKey] },
        update: { ...entry, [uniqueKey]: undefined },
        create: entry,
      });
    }

    return CustomRes({
      code: 200,
      success: true,
      message: 'Data imported successfully',
    });
  }

  async validate(value: any, metaType: any) {
    const object = plainToInstance(metaType, value);

    const errors = await validate(object, { whitelist: true });

    if (errors.length > 0) {
      throw new CustomHttpException({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Validation failed',
        success: false,
        errors: generateClassValidatorErrors(errors),
      });
    }
    return object;
  }
}
