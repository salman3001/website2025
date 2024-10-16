import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogsQueryDto extends CommonQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  blogCategorySlug: string;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  tagSlug: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptionalEmpty()
  isFeatured: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptionalEmpty()
  isPublished: boolean;
}

export class BlogsFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
