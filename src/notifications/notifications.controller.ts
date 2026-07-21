import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  createNotification(
    @Req() req: any,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.createNotification(
      req.user.uid,
      createNotificationDto,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getAllNotifications(@Req() req: any) {
    return this.notificationsService.getAllNotifications(
      req.user.uid,
    );
  }
}