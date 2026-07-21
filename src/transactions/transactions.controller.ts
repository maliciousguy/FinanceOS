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

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createTransaction(
    @Req() req: any,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.createTransaction(
      req.user.uid,
      createTransactionDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.transactionsService.findOne(id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateTransaction(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.updateTransaction(
      req.user.uid,
      id,
      updateTransactionDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteTransaction(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.transactionsService.deleteTransaction(
      req.user.uid,
      id,
    );
  }
}