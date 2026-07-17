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

import { GoalsService } from './goals.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createGoal(
    @Req() req: any,
    @Body() createGoalDto: CreateGoalDto,
  ) {
    return this.goalsService.createGoal(
      req.user.uid,
      createGoalDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAllGoals(@Req() req: any) {
    return this.goalsService.getAllGoals(
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  getGoalById(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.goalsService.getGoalById(
      req.user.uid,
      id,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  updateGoal(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.updateGoal(
      req.user.uid,
      id,
      updateGoalDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  deleteGoal(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.goalsService.deleteGoal(
      req.user.uid,
      id,
    );
  }
}