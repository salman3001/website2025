import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MyConfigModule } from './config/myConfig.module';
import { EventsModule } from './events/events.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './utils/middlewares/auth/auth.middleware';

@Module({
  imports: [MyConfigModule, EventsModule, MediaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
