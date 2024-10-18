import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { IAppConfig } from 'src/config/app.config';
import { PrismaService } from 'src/prisma/prisma.service';
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
      for (const [key, value] of Object.entries(r)) {
        if (
          typeof value === 'string' ||
          typeof value === 'boolean' ||
          typeof value === 'number'
        ) {
          dataTobeExported.push({ [key]: value });
        }
      }
    });

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(dataTobeExported);
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const exportDir = join(
      this.config.get<IAppConfig>('App').appPath,
      'public',
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

    return filePath;
  }

  public async import<T>(
    file: Express.Multer.File,
    workSheetName: string,
    validationDto: T,
    uniqueKey: string,
  ) {
    const book = XLSX.readFile(file.path);
    const sheet = book.Sheets[workSheetName];
    const json = XLSX.utils.sheet_to_json(sheet) as unknown as string;

    const objArray = JSON.parse(json);

    const validateData = objArray.map((obj: any) => {
      return this.validate(obj, validationDto);
    });

    for (const entry of validateData) {
      await this.prisma.tag.upsert({
        where: { [uniqueKey]: entry[uniqueKey] },
        update: { ...entry, uniqueKey: undefined },
        create: entry,
      });
    }
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
