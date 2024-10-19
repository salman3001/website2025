import { MediaType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class MediaImportDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsOptionalEmpty()
  mediaCategoryId: number;
}
