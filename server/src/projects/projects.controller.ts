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
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';
import { ProjectPolicy } from './project.policy';
import { ApiTags } from '@nestjs/swagger';
import { ProjectFindOneQuery, ProjectQueryDto } from './dto/project-query.dto';
import { generateCommonPrismaQuery } from 'src/utils/prisma/generateCommonPrismaQuery';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly policy: ProjectPolicy,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateProjectDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canCreate(authUser);
    const project = await this.projectsService.create(dto);

    return CustomRes({
      code: HttpStatus.CREATED,
      success: true,
      data: project,
      message: 'Project Message Created',
    });
  }

  @Get()
  async findAll(@Query() qs: ProjectQueryDto) {
    this.policy.canFindAll();

    const { search, ...commonQueryDto } = qs;

    const { selectQuery, orderByQuery, skip, take } =
      generateCommonPrismaQuery(commonQueryDto);

    const searchQuery = search ? { title: { contains: search } } : {};

    const { projects, count } = await this.projectsService.findAll({
      skip,
      take,
      where: { AND: { ...searchQuery } },
      orderBy: orderByQuery,
      select: selectQuery,
    });

    return CustomRes({
      code: HttpStatus.OK,
      success: true,
      data: { data: projects, count },
    });
  }

  @Get(':id')
  async findOne(@Param('slug') id: number, @Query() qs: ProjectFindOneQuery) {
    this.policy.canFindOne();

    const { selectQuery } = generateCommonPrismaQuery(qs);

    const project = await this.projectsService.findOne({
      where: { id: +id },
      select: selectQuery,
    });
    return CustomRes({ code: HttpStatus.OK, success: true, data: project });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    dto: UpdateProjectDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    this.policy.canUpdate(authUser);

    const project = await this.projectsService.update(id, dto);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: project,
      message: 'Project Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @AuthUser() authUser: AuthUserType) {
    this.policy.canCreate(authUser);
    const project = await this.projectsService.remove(id);

    return CustomRes({
      success: true,
      code: HttpStatus.OK,
      data: project,
      message: 'Project deleted',
    });
  }
}
