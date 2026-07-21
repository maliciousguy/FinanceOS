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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
@UseGuards(FirebaseAuthGuard)
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
  ) {}

  @Post()
  create(
    @Req() request: Request & { user: any },
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(
      request.user.uid,
      createAccountDto,
    );
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get('workspace/:workspaceId')
  findByWorkspace(
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.accountsService.findByWorkspace(
      workspaceId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(
      id,
      request.user.uid,
      updateAccountDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request & { user: any },
  ) {
    return this.accountsService.delete(
      id,
      request.user.uid,
    );
  }
}