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
  ],
  controllers: [],
  providers: [SeoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
