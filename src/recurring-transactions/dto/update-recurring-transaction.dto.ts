import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRecurringTransactionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  @IsIn(['income', 'expense'])
  type?: string;

  @IsOptional()
  @IsString()
  @IsIn(['daily', 'weekly', 'monthly', 'yearly'])
  frequency?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  nextRun?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}