import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  @IsString()
  name: string;
  @MinLength(6)
  password: string;
}
