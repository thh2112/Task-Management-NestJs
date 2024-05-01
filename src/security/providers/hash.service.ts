import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
@Injectable()
export class HashService {
  public static readonly saltRounds = 10;

  constructor() {}
  async hashPassword(plainPassword: string, saltRounds = HashService.saltRounds) {
    return await hash(plainPassword, saltRounds)
      .then((hash) => hash)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async comparePassword(plainPassword: string, hashPassword: string) {
    return await compare(plainPassword, hashPassword)
      .then((isMatch) => isMatch)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
