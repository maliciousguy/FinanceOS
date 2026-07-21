import { IsBoolean, IsString } from 'class-validator';

export class CreateSettingsDto {
  @IsString()
  currency: string;

  @IsString()
  theme: string;

  @IsBoolean()
  notificationsEnabled: boolean;
}