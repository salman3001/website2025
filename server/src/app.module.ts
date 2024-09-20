import { Module } from '@nestjs/common';
import { MyConfigModule } from './config/myConfig.module';
import { PrismaService } from './prisma/prisma.service';
import { EventsModule } from './events/events.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [MyConfigModule, EventsModule, MediaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
