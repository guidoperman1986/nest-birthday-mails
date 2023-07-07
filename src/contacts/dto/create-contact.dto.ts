import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  surname: string;
  @IsString()
  birthdayDate: string;
  @IsString()
  phone: string;
  @IsString()
  male: string;
}
