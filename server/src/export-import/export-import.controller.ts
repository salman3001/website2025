import { Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { ExportImportService } from './export-import.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagsImportDto } from './dto/tags-import.dto';
import { BlogategoryImportDto } from './dto/blog-category-import.dto';
import { ImportPost } from './decorators/import-post';
import { BlogCommentImportDto } from './dto/blog-comment-import.dto';
import { BlogsImportDto } from './dto/blogsimport.dto';
import { ContactMessageImportDto } from './dto/contact-message-import.dto';
import { DiscussionCommentImportDto } from './dto/discussion-comment-import.dto';
import { DiscussionImportDto } from './dto/discussion-import.dto';
import { EmailSubscriptionImportDto } from './dto/emailSubscription-import.dto';
import { MediaCategoriesModule } from 'src/media-categories/media-categories.module';
import { MediaImportDto } from './dto/media-import.dto';
import { MediaCategoryImportDto } from './dto/media-category-import.dto';
import { ProjectImportDto } from './dto/project-import.dto';
import { SeoImportDto } from './dto/seo-import.dto';
import { UserImportDto } from './dto/user-import.dto';

@ApiTags('export-import')
@ApiBearerAuth()
@Controller('export-import')
export class ExportImportController {
  constructor(private exportImportService: ExportImportService) {}

  // tags
  @Get('tags')
  async exportTags() {
    return await this.exportImportService.export('tag', 'tags');
  }

  @ImportPost('tags')
  async importTags(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'tag',
      'slug',
      'tags',
      file,
      TagsImportDto,
    );
  }

  // blog categories
  @Get('blog-categories')
  async exportBlogCategories() {
    return await this.exportImportService.export(
      'blogCategory',
      'blogCategories',
    );
  }

  @ImportPost('blog-categories')
  async importBlogCategories(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'blogCategory',
      'slug',
      'blogCategories',
      file,
      BlogategoryImportDto,
    );
  }

  // blog comments
  @Get('blog-comments')
  async exportBlogComments() {
    return await this.exportImportService.export('blogComment', 'blogComments');
  }

  @ImportPost('blog-comments')
  async importBlogComments(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'blogComment',
      'id',
      'blogComments',
      file,
      BlogCommentImportDto,
    );
  }

  // blogs
  @Get('blogs')
  async exportBlogs() {
    return await this.exportImportService.export('blog', 'blogs');
  }

  @ImportPost('blogs')
  async importBlogs(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'blog',
      'id',
      'blogs',
      file,
      BlogsImportDto,
    );
  }

  // contact messages
  @Get('contact-messages')
  async exportContactMessages() {
    return await this.exportImportService.export(
      'contactMessage',
      'contactMessages',
    );
  }

  @ImportPost('contact-messages')
  async importContactMessages(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'contactMessage',
      'id',
      'contactMessages',
      file,
      ContactMessageImportDto,
    );
  }

  // Discussion comments
  @Get('discussion-comments')
  async exportDiscussionComments() {
    return await this.exportImportService.export(
      'discussionComment',
      'discussionComments',
    );
  }

  @ImportPost('discussion-comments')
  async importDiscussionComments(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'discussionComment',
      'id',
      'discussionComments',
      file,
      DiscussionCommentImportDto,
    );
  }

  // Discussions
  @Get('discussions')
  async exportDiscussions() {
    return await this.exportImportService.export('discussion', 'discussions');
  }

  @ImportPost('discussions')
  async importDiscussions(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'discussion',
      'id',
      'discussions',
      file,
      DiscussionImportDto,
    );
  }

  // Email Subscriptions
  @Get('email-subscriptions')
  async exportEmailSubscriptions() {
    return await this.exportImportService.export(
      'emailSubscription',
      'emailSubscriptions',
    );
  }

  @ImportPost('email-subscriptions')
  async importEmailSubscriptions(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'emailSubscription',
      'id',
      'emailSubscriptions',
      file,
      EmailSubscriptionImportDto,
    );
  }

  // media
  @Get('media')
  async exportMedia() {
    return await this.exportImportService.export('media', 'medias');
  }

  @ImportPost('media')
  async importMedia(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'media',
      'id',
      'medias',
      file,
      MediaImportDto,
    );
  }

  // media category
  @Get('media-categories')
  async exportMediaCategories() {
    return await this.exportImportService.export(
      'mediaCategory',
      'mediaCategories',
    );
  }

  @ImportPost('media-categories')
  async importMediaCategories(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'mediaCategory',
      'id',
      'mediaCategories',
      file,
      MediaCategoryImportDto,
    );
  }

  // Projects
  @Get('projects')
  async exportProjects() {
    return await this.exportImportService.export('project', 'projects');
  }

  @ImportPost('projects')
  async importProjects(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'project',
      'id',
      'projects',
      file,
      ProjectImportDto,
    );
  }

  // Seo
  @Get('seo')
  async exportSeos() {
    return await this.exportImportService.export('seo', 'seos');
  }

  @ImportPost('seo')
  async importSeos(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'seo',
      'id',
      'seos',
      file,
      SeoImportDto,
    );
  }

  // Seo
  @Get('users')
  async exportUsers() {
    return await this.exportImportService.export('user', 'users');
  }

  @ImportPost('users')
  async importUsers(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return await this.exportImportService.import(
      'user',
      'id',
      'users',
      file,
      UserImportDto,
    );
  }
}
