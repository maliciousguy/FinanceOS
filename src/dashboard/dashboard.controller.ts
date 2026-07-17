import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getDashboard(@Req() req: any) {
    return this.dashboardService.getDashboard(
      req.user.uid,
    );
  }
}