import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateContactMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptionalEmpty()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 1500)
  message: string;
}
