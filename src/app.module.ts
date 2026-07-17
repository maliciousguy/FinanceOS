import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoriesModule } from './categories/categories.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BudgetModule } from './budget/budget.module';
import { ReportsModule } from './reports/reports.module';
import { GoalsModule } from './goals/goals.module';
import { RecurringTransactionsModule } from './recurring-transactions/recurring-transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    FirebaseModule,
    UsersModule,
    TransactionsModule,
    AccountsModule,
    IncomeModule,
    ExpenseModule,
    CategoriesModule,
    DashboardModule,
    BudgetModule,
    ReportsModule,
    GoalsModule,
    RecurringTransactionsModule,
  ],
})
export class AppModule {}