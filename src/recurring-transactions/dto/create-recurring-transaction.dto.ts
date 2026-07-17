import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRecurringTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(['income', 'expense'])
  type: string;

  @IsString()
  @IsIn(['daily', 'weekly', 'monthly', 'yearly'])
  frequency: string;

  @IsString()
  startDate: string;

  @IsString()
  nextRun: string;

  @IsBoolean()
  active: boolean;
}