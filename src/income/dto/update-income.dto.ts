import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateIncomeDto {
  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  note?: string;
}