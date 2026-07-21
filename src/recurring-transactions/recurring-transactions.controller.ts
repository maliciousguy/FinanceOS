import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';

@Controller('recurring-transactions')
@UseGuards(FirebaseAuthGuard)
export class RecurringTransactionsController {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService,
  ) {}

  @Post()
  async create(
    @Req() req,
    @Body() createRecurringTransactionDto: CreateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.createRecurringTransaction(
      req.user.uid,
      createRecurringTransactionDto,
    );
  }

  @Get()
  async findAll(@Req() req) {
    return this.recurringTransactionsService.getAllRecurringTransactions(
      req.user.uid,
    );
  }

  @Get(':id')
  async findOne(
    @Req() req,
    @Param('id') recurringTransactionId: string,
  ) {
    return this.recurringTransactionsService.getRecurringTransactionById(
      req.user.uid,
      recurringTransactionId,
    );
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') recurringTransactionId: string,
    @Body() updateRecurringTransactionDto: UpdateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.updateRecurringTransaction(
      req.user.uid,
      recurringTransactionId,
      updateRecurringTransactionDto,
    );
  }

  @Delete(':id')
  async remove(
    @Req() req,
    @Param('id') recurringTransactionId: string,
  ) {
    return this.recurringTransactionsService.deleteRecurringTransaction(
      req.user.uid,
      recurringTransactionId,
    );
  }
}