import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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
  @IsString()
  @IsOptionalEmpty()
  isFeatured: boolean;

  @ApiProperty()
  @IsString()
  @IsOptionalEmpty()
  isPublished: boolean;
}

export class BlogsFindOneQuery extends PickType(CommonQueryDto, ['select']) {}
