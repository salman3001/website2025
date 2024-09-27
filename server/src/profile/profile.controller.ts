import {
  Controller,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/media/helpers/fileFIlter';
import { ApiBody, ApiTags, IntersectionType } from '@nestjs/swagger';
import { UploadFileDto } from 'src/media/dto/upload-file.dto';
import CustomRes from 'src/utils/CustomRes';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch(':userId')
  @UseInterceptors(
    FileInterceptor(
      'avatar',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  @ApiBody({
    description: 'File image',
    type: IntersectionType(UploadFileDto),
  })
  async update(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profile = await this.profileService.updateByUserId(
      +userId,
      updateProfileDto,
      file,
    );
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      message: 'Profile Updated',
      data: { profile },
    });
  }
}
