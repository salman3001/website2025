import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserPolicy } from './user.policy';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly policyService: UserPolicy,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policyService.canCreate(authUser);

    const user = await this.userService.create(createUserDto);
    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      message: 'User Created',
      data: { user },
    });
  }

  @Get()
  async findAll(
    @Query() qs: Record<string, any>,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policyService.canFindAll(authUser);
    const { count, users } = await this.userService.findAll(qs);
    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { data: count, users },
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() qs: Record<string, any>,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policyService.canFindOne(authUser);

    const user = await this.userService.findOne({ id: +id, ...qs });
    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { user },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policyService.canUpdate(authUser);

    const user = await this.userService.update(+id, updateUserDto);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      message: 'User Updated',
      data: { user },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    this.policyService.canDelete(authUser);
    const user = await this.userService.remove(+id);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      message: 'User Deleted',
      data: { user },
    });
  }
}
