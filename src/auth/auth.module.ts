import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthGuard } from './firebase-auth/firebase-auth.guard';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    FirebaseAuthGuard,
  ],
})
export class AuthModule {}