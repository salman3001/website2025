import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { ContactMessagesPolicy } from './contact-messages.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';
import { ContactMessageQueryDto } from './dto/contact-message-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('Contact Messages')
@Controller('contact-messages')
export class ContactMessagesController {
  constructor(
    private readonly contactMessagesService: ContactMessagesService,
    private readonly policy: ContactMessagesPolicy,
  ) {}

  @Post()
  async create(@Body() dto: CreateContactMessageDto) {
    this.policy.canCreate();
    const message = await this.contactMessagesService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: message,
      message: 'Contact Message Created',
    });
  }

  @Get()
  async findAll(
    @AuthUser() authUser: AuthUserType,
    @Query() qs: ContactMessageQueryDto,
  ) {
    this.policy.canFindAll(authUser);

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(qs);

    const { messages, count } = await this.contactMessagesService.findAll({
      skip,
      take,
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: messages, count },
    });
  }

  @Get(':id')
  async findOne(@Param('slug') id: number, @AuthUser() authUser: AuthUserType) {
    this.policy.canFindOne(authUser);

    const message = await this.contactMessagesService.findOne({ id });
    return CustomRes({ code: HttpStatus.OK, success: true, data: message });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    this.policy.canDelete(authUser);
    const message = await this.contactMessagesService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: message,
      message: 'Comment deleted',
    });
  }
}
