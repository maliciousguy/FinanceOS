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
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Controller('organizations')
@UseGuards(FirebaseAuthGuard)
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Post()
  create(
    @Req() request: Request & { user: any },
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    return this.organizationsService.create(
      request.user.uid,
      createOrganizationDto,
    );
  }

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(
      id,
      request.user.uid,
      updateOrganizationDto,
    );
  }

  @Post(':id/members')
  addMember(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
    @Body() addMemberDto: AddMemberDto,
  ) {
    return this.organizationsService.addMember(
      id,
      request.user.uid,
      addMemberDto,
    );
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.organizationsService.getMembers(id);
  }

  @Delete(':id/members')
  removeMember(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
    @Body() removeMemberDto: RemoveMemberDto,
  ) {
    return this.organizationsService.removeMember(
      id,
      request.user.uid,
      removeMemberDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
  ) {
    return this.organizationsService.remove(
      id,
      request.user.uid,
    );
  }
}