import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    FirebaseModule,
    AuthModule,
  ],
  controllers: [
    AccountsController,
  ],
  providers: [
    AccountsService,
  ],
})
export class AccountsModule {}