import { Gender, UserRole } from '@prisma/client';
import { AuthCredentialsDto } from 'auth/dtos';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UserCreateDto extends AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsOptional()
  @Matches(/^\+?(\(\d{1,4}\))?[-\s]?(\d{1,4})?[-\s]?(\d{1,4})?[-\s]?(\d{1,4})?[-\s]?(\d{1,4})$/)
  phone: string;

  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
