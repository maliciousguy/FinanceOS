import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { SettingsService } from './settings.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getSettings(@Req() req: any) {
    return this.settingsService.getSettings(
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch()
  updateSettings(
    @Req() req: any,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateSettings(
      req.user.uid,
      updateSettingsDto,
    );
  }
}