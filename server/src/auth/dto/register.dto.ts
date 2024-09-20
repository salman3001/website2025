import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ToLowercase } from 'src/utils/validators/ToLowercase';
import { Trim } from 'src/utils/validators/Trim';

export class RegisterDto {
  @ApiProperty()
  @Length(2, 50)
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @ToLowercase()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsPhoneNumber('IN')
  phone?: string;
}
