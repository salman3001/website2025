import { UserType } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class UserImportDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @Length(2, 50)
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsPhoneNumber()
  @IsOptionalEmpty()
  phone: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  emailVerified: boolean;
}
