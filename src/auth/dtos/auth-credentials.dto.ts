import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @IsString()
  @Length(10, 80)
  email: string;

  @IsStrongPassword()
  @IsString()
  @Length(6, 20)
  password: string;
}
