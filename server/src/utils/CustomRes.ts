import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class ResType<T> {
  @ApiProperty()
  code: HttpStatus;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  @ValidateNested()
  data?: T | null;

  @ApiProperty()
  errors?: Record<string, string[]>[];
}

export default function CustomRes(opt: ResType<any>) {
  return { ...opt, data: opt.data ?? {} };
}
