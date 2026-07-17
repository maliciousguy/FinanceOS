import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsString()
  type: string;

  @IsString()
  note: string;
}