import { UserRoleRaw } from '@prisma/client';

export type IAuthPayload = {
  email: string;
  name: string;
  role: UserRoleRaw;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
};
