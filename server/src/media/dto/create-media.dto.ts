import { MediaType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsOptional()
  mediaCategoryId?: number;
}
