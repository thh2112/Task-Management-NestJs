import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { RegisterDto } from './dtos';
import { User, UserRole } from '@prisma/client';
import { HashService } from '@security/providers';
import { JwtService } from '@nestjs/jwt';
import { IAuthPayload } from './types';
import appConfig from '@config/app.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
    @Inject(appConfig.KEY) private appConf: ConfigType<typeof appConfig>,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      return await this.userService.createUser({
        ...registerDto,
        role: UserRole.USER,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user: User) {
    const { email, name, role } = user;
    const payload: Partial<IAuthPayload> = {
      email,
      name,
      role,
    };

    return {
      payload,
      token: this.jwtService.sign(payload, {
        secret: this.appConf.secret,
        issuer: this.appConf.name + '_' + this.appConf.env.toUpperCase(),
        subject: user.id.toString(),
      }),
    };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Please check your credential information');
      }

      const isPasswordEqualed = await this.hashService.comparePassword(password, user.password);
      if (!isPasswordEqualed) {
        throw new UnauthorizedException('Please check your credential information');
      }

      return this.userService.updateUserLoggedAt(user.id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async profile(payload: IAuthPayload) {
    try {
      return await this.userService.findUserProfile(payload.sub);
    } catch (error) {
      throw new Error(error);
    }
  }
}
