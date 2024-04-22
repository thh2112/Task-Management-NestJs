import { IsNotEmpty, IsString } from 'class-validator';

export class PatchDto<T> {
  @IsNotEmpty()
  type: T;

  @IsNotEmpty()
  @IsString()
  value: string;
}
