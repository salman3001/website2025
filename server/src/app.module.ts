import { Module } from '@nestjs/common';
import { MyConfigModule } from './config/myConfig.module';
import { PrismaService } from './prisma/prisma.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [MyConfigModule, EventsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
