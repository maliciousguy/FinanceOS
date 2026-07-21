import { Module } from '@nestjs/common';

import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}