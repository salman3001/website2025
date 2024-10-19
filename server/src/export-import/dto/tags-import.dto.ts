import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';

export class TagsImportDto extends CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;
}
