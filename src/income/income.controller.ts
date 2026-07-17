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
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('income')
export class IncomeController {
  constructor(
    private readonly incomeService: IncomeService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createIncome(
    @Req() req: any,
    @Body() createIncomeDto: CreateIncomeDto,
  ) {
    return this.incomeService.createIncome(
      req.user.uid,
      createIncomeDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAllIncome(@Req() req: any) {
    return this.incomeService.getAllIncome(
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  getIncomeById(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.incomeService.getIncomeById(
      req.user.uid,
      id,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateIncome(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    return this.incomeService.updateIncome(
      req.user.uid,
      id,
      updateIncomeDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteIncome(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.incomeService.deleteIncome(
      req.user.uid,
      id,
    );
  }
}