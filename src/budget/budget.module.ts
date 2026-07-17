import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    FirebaseModule,
    AuthModule,
  ],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}