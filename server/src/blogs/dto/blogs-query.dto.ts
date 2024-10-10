import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommonQueryDto } from 'src/utils/dto/common-query.dto';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class BlogsQueryDto extends CommonQueryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  blogCategoryId: number;
}
