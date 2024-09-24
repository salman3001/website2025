import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageUploadService } from 'src/media/imageUpload.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private imageUploadService: ImageUploadService,
  ) {}

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async updateByUserId(
    userId: number,
    dto: UpdateProfileDto,
    file: Express.Multer.File,
  ) {
    let avatarUr: string | undefined = undefined;

    const profile = await this.prisma.profile.findFirstOrThrow({
      where: { userId },
    });

    if (file) {
      if (profile.avatar) {
        await this.imageUploadService.deleteImage(profile.avatar);
      }
      const { url } = await this.imageUploadService.uploadImage(file);
      avatarUr = url;
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: { avatar: avatarUr, ...dto },
    });

    return updatedProfile;
  }
}
