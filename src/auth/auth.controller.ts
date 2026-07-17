import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './firebase-auth/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return {
      message: 'Welcome to FinanceOS Authentication API',
    };
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return {
      message: 'Protected route accessed successfully',
      user: req.user,
    };
  }
}