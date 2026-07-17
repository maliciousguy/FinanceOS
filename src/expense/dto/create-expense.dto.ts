import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  note: string;
}