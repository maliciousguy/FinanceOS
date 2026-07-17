import { IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  amount: number;

  @IsString()
  source: string;

  @IsString()
  note: string;
}