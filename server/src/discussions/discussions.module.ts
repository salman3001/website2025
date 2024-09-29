import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { DiscussionPolicy } from './disicussion.policy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiscussionsController],
  providers: [DiscussionsService, PrismaService, DiscussionPolicy],
})
export class DiscussionsModule {}
