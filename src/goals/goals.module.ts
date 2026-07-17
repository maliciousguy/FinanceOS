import { Module } from '@nestjs/common';

import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}