import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateMediaDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsOptional()
  mediaCategoryId?: number;
}
