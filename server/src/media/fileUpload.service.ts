import { Injectable } from '@nestjs/common';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { join, dirname, extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from 'src/config/env.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesUploadService {
  constructor(private configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<string> {
    const buffer = readFileSync(file.path);
    return await this.writeFile(folder, buffer, extname(file.originalname));
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const filePath = join(
      this.configService.get<IEnvConfig>('env')!.uploadsPath,
      fileUrl,
    );
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  private async writeFile(
    folder: string = '',
    buffer: Buffer,
    extName: string,
  ): Promise<string> {
    const fileName = Date.now() + uuidv4() + `.${extName}`;
    const url = join(folder, fileName);
    const uploadPath = this.configService.get<IEnvConfig>('env')!.uploadsPath;

    const outputPath = join(uploadPath, folder, fileName);

    if (!existsSync(dirname(outputPath))) {
      mkdirSync(dirname(outputPath), { recursive: true });
    }

    writeFileSync(outputPath, buffer);

    return url.replace(/\\/g, '/');
  }
}
