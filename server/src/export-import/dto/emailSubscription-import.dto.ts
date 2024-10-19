import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class EmailSubscriptionImportDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptionalEmpty()
  userId: number;
}
