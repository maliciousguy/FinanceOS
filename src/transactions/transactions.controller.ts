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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

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
  getTransactions(
    @Req() req: any,
  ) {
    return this.transactionsService.getTransactions(
      req.user.uid,
    );
  }


  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  getTransactionById(
    @Req() req: any,
    @Param('id') transactionId: string,
  ) {
    return this.transactionsService.getTransactionById(
      req.user.uid,
      transactionId,
    );
  }


  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateTransaction(
    @Req() req: any,
    @Param('id') transactionId: string,
    @Body() data: any,
  ) {
    return this.transactionsService.updateTransaction(
      req.user.uid,
      transactionId,
      data,
    );
  }


  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteTransaction(
    @Req() req: any,
    @Param('id') transactionId: string,
  ) {
    return this.transactionsService.deleteTransaction(
      req.user.uid,
      transactionId,
    );
  }

}