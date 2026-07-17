import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  getProfile(@Req() req: any) {
    return {
      message: 'Controller reached',
      user: req.user,
    };
  }
}