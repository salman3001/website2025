import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 50)
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 50)
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptionalEmpty()
  phone: string;

  @ApiProperty({ type: 'select', enum: UserType })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsBoolean()
  emailVerified: boolean;
}
