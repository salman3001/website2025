import { IsNumber, IsString } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class ContactMessageImportDto {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  @IsOptionalEmpty()
  phone: string;

  @IsString()
  message: string;
}
