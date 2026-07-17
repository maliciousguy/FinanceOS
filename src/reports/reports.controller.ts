import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('monthly-summary')
  getMonthlySummary(
    @Req() req: any,
    @Query('month') month: string,
  ) {
    return this.reportsService.getMonthlySummary(
      req.user.uid,
      month,
    );
  }
}