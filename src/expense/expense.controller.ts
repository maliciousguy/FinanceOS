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
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createExpense(
    @Req() req: any,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expenseService.createExpense(
      req.user.uid,
      createExpenseDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAllExpense(@Req() req: any) {
    return this.expenseService.getAllExpense(
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  getExpenseById(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.expenseService.getExpenseById(
      req.user.uid,
      id,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateExpense(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(
      req.user.uid,
      id,
      updateExpenseDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteExpense(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.expenseService.deleteExpense(
      req.user.uid,
      id,
    );
  }
}