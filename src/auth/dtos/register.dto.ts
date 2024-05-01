import { UserRole } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { UserCreateDto } from 'user/dtos/create.dto';

export class RegisterDto extends UserCreateDto {
  @IsOptional()
  role: UserRole;
}
