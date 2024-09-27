import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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
  @IsOptional()
  parentId: number;
}
