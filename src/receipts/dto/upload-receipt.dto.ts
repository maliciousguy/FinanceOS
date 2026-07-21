import { IsNotEmpty, IsString } from 'class-validator';

export class UploadReceiptDto {
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}