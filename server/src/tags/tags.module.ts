import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { tagPolicy } from './tags.policy';

@Module({
  imports: [PolicyModule.register([{ token: 'TagPolicy', policy: tagPolicy }])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
