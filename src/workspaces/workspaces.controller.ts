import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
@UseGuards(FirebaseAuthGuard)
export class WorkspacesController {
  constructor(
    private readonly workspacesService: WorkspacesService,
  ) {}

  @Post()
  create(
    @Req() request: Request & { user: any },
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspacesService.create(
      request.user.uid,
      createWorkspaceDto,
    );
  }

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(
      id,
      request.user.uid,
      updateWorkspaceDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
  ) {
    return this.workspacesService.remove(
      id,
      request.user.uid,
    );
  }
}