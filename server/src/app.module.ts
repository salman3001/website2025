import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MyConfigModule } from './config/myConfig.module';
import { EventsModule } from './events/events.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './utils/middlewares/auth/auth.middleware';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { BlogsModule } from './blogs/blogs.module';
import { SeoService } from './seo/seo.service';
import { BlogCategoriesModule } from './blog-categories/blog-categories.module';
import { TagsModule } from './tags/tags.module';
import { BlogCommentsModule } from './blog-comments/blog-comments.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { DiscussionCommentsModule } from './discussion-comments/discussion-comments.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { EmailSubscriptionsModule } from './email-subscriptions/email-subscriptions.module';
import { MediaCategoriesModule } from './media-categories/media-categories.module';
import { ProjectsModule } from './projects/projects.module';
import { ExportImportModule } from './export-import/export-import.module';

@Module({
  imports: [
    MyConfigModule,
    EventsModule,
    MediaModule,
    AuthModule,
    UserModule,
    ProfileModule,
    BlogsModule,
    BlogCategoriesModule,
    TagsModule,
    BlogCommentsModule,
    DiscussionsModule,
    DiscussionCommentsModule,
    ContactMessagesModule,
    EmailSubscriptionsModule,
    MediaCategoriesModule,
    ProjectsModule,
    ExportImportModule,
  ],
  controllers: [],
  providers: [SeoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
