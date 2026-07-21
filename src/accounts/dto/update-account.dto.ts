import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { AccountType } from '../enums/account-type.enum';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AccountType)
  @IsOptional()
  type?: AccountType;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @IsOptional()
  openingBalance?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}