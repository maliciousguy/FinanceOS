import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { ReceiptsService } from './receipts.service';
import { UploadReceiptDto } from './dto/upload-receipt.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(
    private readonly receiptsService: ReceiptsService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('receipt'))
  uploadReceipt(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadReceiptDto: UploadReceiptDto,
  ) {
    return this.receiptsService.uploadReceipt(
      req.user.uid,
      uploadReceiptDto.transactionId,
      file,
    );
  }
}