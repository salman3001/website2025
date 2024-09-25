import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Query,
  Inject,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/media/helpers/fileFIlter';
import { ApiBody, ApiConsumes, IntersectionType } from '@nestjs/swagger';
import { UploadFileDto } from 'src/media/dto/upload-file.dto';
import { AuthUserType } from 'src/utils/types/common';
import { BlogPolicy } from './blogs.policy';
import { PolicyService } from '@salman3001/nest-policy-module';
import CustomRes from 'src/utils/CustomRes';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    @Inject('BlogPolicy') private readonly policy: PolicyService<BlogPolicy>,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  @ApiBody({
    description: 'Image',
    type: IntersectionType(UploadFileDto, CreateBlogDto),
  })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    await this.policy.authorize('create', authUser);
    const blog = this.blogsService.create(createBlogDto, image);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { blog },
      message: 'Blog Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    await this.policy.authorize('findAll');

    const { blogs, count } = await this.blogsService.findAll(qs);
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { blogs, count },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    await this.policy.authorize('findOne');

    const blog = await this.blogsService.findOne({ slug });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { blog } });
  }

  @Patch(':slug')
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  @ApiBody({
    description: 'Image',
    type: IntersectionType(UploadFileDto, CreateBlogDto),
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile() image: Express.Multer.File,
  ) {
    await this.policy.authorize('update', authUser);
    const blog = await this.blogsService.update(slug, updateBlogDto, image);
    return CustomRes({
      success: true,
      code: HttpStatus.CREATED,
      data: { blog },
      message: 'Blog Updated',
    });
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('delete', authUser);
    const blog = await this.blogsService.remove(slug);
    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { blog },
      message: 'Blog deleted',
    });
  }
}
