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

import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';


@Controller('accounts')
export class AccountsController {

  constructor(
    private readonly accountsService: AccountsService,
  ) {}


  @UseGuards(FirebaseAuthGuard)
  @Post()
  createAccount(
    @Req() req: any,
    @Body() createAccountDto: CreateAccountDto,
  ) {

    return this.accountsService.createAccount(
      req.user.uid,
      createAccountDto,
    );

  }



  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAccounts(
    @Req() req: any,
  ) {

    return this.accountsService.getAccounts(
      req.user.uid,
    );

  }



  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  getAccountById(
    @Req() req: any,
    @Param('id') accountId: string,
  ) {

    return this.accountsService.getAccountById(
      req.user.uid,
      accountId,
    );

  }



  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateAccount(
    @Req() req: any,
    @Param('id') accountId: string,
    @Body() data: any,
  ) {

    return this.accountsService.updateAccount(
      req.user.uid,
      accountId,
      data,
    );

  }



  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteAccount(
    @Req() req: any,
    @Param('id') accountId: string,
  ) {

    return this.accountsService.deleteAccount(
      req.user.uid,
      accountId,
    );

  }

}