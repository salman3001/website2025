import { Post, applyDecorators } from '@nestjs/common';
import { UploadFileDto } from 'src/media/dto/upload-file.dto';
import { MultiPartFormData } from 'src/utils/decorators/combined/multi-part-formdata.decorator';

export function ImportPost(routeName: string) {
  return applyDecorators(
    Post(routeName),
    MultiPartFormData({
      mimeType: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      maxSizeInMb: 50,
      dtos: [UploadFileDto],
      fileName: 'file',
    }),
  );
}
