import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateSeoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  keyword?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  desc?: string;
}
