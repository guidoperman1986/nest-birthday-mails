import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  surname: string;
  @IsDate()
  @Type(() => Date)
  birthdayDate: Date;
  @IsString()
  phone: string;
  @IsBoolean()
  male: boolean;
}
