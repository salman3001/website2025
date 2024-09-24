import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MyConfigModule } from './config/myConfig.module';
import { EventsModule } from './events/events.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './utils/middlewares/auth/auth.middleware';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    MyConfigModule,
    EventsModule,
    MediaModule,
    AuthModule,
    UserModule,
    ProfileModule,
    BlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
