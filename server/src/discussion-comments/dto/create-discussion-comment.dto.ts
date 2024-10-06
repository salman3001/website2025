import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsOptionalEmpty } from 'src/utils/validators/IsOptionalEmpty';

export class CreateDiscussionCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  message: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  discussionSlug: string;

  @ApiProperty()
  @IsNumber()
  @IsOptionalEmpty()
  parentId: number;
}
