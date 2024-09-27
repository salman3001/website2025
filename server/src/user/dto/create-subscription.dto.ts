import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  blogCategorySlugs: string[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tagSlugs: string[];
}
