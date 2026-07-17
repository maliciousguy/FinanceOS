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
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createBudget(
    @Req() req: any,
    @Body() createBudgetDto: CreateBudgetDto,
  ) {
    return this.budgetService.createBudget(
      req.user.uid,
      createBudgetDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAllBudgets(@Req() req: any) {
    return this.budgetService.getAllBudgets(
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  getBudgetById(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.budgetService.getBudgetById(
      req.user.uid,
      id,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateBudget(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.updateBudget(
      req.user.uid,
      id,
      updateBudgetDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteBudget(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.budgetService.deleteBudget(
      req.user.uid,
      id,
    );
  }
}