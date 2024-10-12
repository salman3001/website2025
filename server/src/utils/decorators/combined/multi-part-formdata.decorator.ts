import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, IntersectionType } from '@nestjs/swagger';
import { fileFilter } from 'src/media/helpers/fileFIlter';

export function MultiPartFormData(opt: {
  fileName: string;
  dtos: any[];
  mimeType?: string[];
  maxSizeInMb?: number;
  description?: string;
  multiple?: boolean;
  maxCount?: number;
}) {
  return applyDecorators(
    UseInterceptors(
      opt?.multiple
        ? FilesInterceptor(
            opt.fileName || 'files',
            opt?.maxCount || 1,
            fileFilter({
              maxSizeInMb: opt?.maxSizeInMb || 5,
              mimeType: opt?.mimeType || [],
            }),
          )
        : FileInterceptor(
            opt.fileName || 'file',
            fileFilter({
              maxSizeInMb: opt?.maxSizeInMb || 5,
              mimeType: opt?.mimeType || [],
            }),
          ),
    ),
    ApiBody({
      description: opt?.description || 'File',
      type: IntersectionType(...opt?.dtos),
    }),
    ApiConsumes('multipart/form-data'),
  );
}
