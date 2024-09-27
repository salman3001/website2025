import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ProjectPolicy } from './project-policy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    @Inject('ProjectPolicy')
    private readonly policy: PolicyService<ProjectPolicy>,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateProjectDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('create', authUser);
    const project = this.projectsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: { project },
      message: 'Project Message Created',
    });
  }

  @Get()
  async findAll(@Query() qs: Record<string, any>) {
    await this.policy.authorize('findAll');

    const { projects, count } = await this.projectsService.findAll(qs);

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { projects, count },
    });
  }

  @Get(':id')
  async findOne(@Param('slug') id: number) {
    await this.policy.authorize('findOne');

    const project = await this.projectsService.findOne({ id });
    return CustomRes({ code: HttpStatus.OK, success: true, data: { project } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    dto: UpdateProjectDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    await this.policy.authorize('update', authUser);
    const project = await this.projectsService.update(id, dto);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { project },
      message: 'Project Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    await this.policy.authorize('delete', authUser);
    const project = await this.projectsService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: { project },
      message: 'Project deleted',
    });
  }
}
