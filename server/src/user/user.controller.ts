import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
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
    @Inject('UserPolicy')
    private readonly policyService: PolicyService<UserPolicy>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
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
    @AuthUser() user: AuthUserType,
  ) {
    await this.policyService.authorize('findAll', user);
    const { count, users } = await this.userService.findAll(qs);
    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { count, users },
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() qs: Record<string, any>,
    @AuthUser() auhUser: AuthUserType,
  ) {
    await this.policyService.authorize('findOne', auhUser);

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
    await this.policyService.authorize('update', authUser);

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
    await this.policyService.authorize('update', authUser);
    const user = await this.userService.remove(+id);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      message: 'User Deleted',
      data: { user },
    });
  }
}
