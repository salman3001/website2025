import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from 'src/config/env.config';

@Injectable()
export class ImageUploadService {
  constructor(private configService: ConfigService) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<{ url: string }> {
    const url = await this.processImageAndSave(file, folder);

    return { url };
  }

  async deleteImage(fileUrl: string): Promise<void> {
    const filePath = join(
      this.configService.get<IEnvConfig>('env').uploadsPath,
      fileUrl,
    );
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  private async processImageAndSave(
    file: Express.Multer.File,
    folder: string = '',
    width?: number,
    height?: number,
  ): Promise<string> {
    sharp.cache(false);

    const resizedBuffer = await sharp(file.path)
      .resize(width, height, { fit: 'cover' })
      .toFormat('webp')
      .toBuffer();

    const url = await this.writeImage(folder, resizedBuffer, 'webp');
    return url;
  }

  private async writeImage(
    folder: string = '',
    buffer: Buffer,
    extName: string,
  ): Promise<string> {
    const fileName = Date.now() + uuidv4() + `.${extName}`;
    const url = join(folder, fileName);
    const uploadPath = this.configService.get<IEnvConfig>('env').uploadsPath;

    const outputPath = join(uploadPath, folder, fileName);

    if (!existsSync(dirname(outputPath))) {
      mkdirSync(dirname(outputPath), { recursive: true });
    }

    writeFileSync(outputPath, buffer);

    return url.replace(/\\/g, '/');
  }
}
