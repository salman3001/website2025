import { ApiProperty } from '@nestjs/swagger';

export class UpladFileDto {
  @ApiProperty({ type: 'file' })
  file: any;
}
