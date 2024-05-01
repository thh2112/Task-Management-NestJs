import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '@shared/providers';
import { UserCreateDto } from './dtos/create.dto';
import { User } from '@prisma/client';
import { HashService } from '@security/providers';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private hashService: HashService,
  ) {}

  private hiddenPassword(user: User) {
    delete user.password;
    return user;
  }

  async getAllUsers() {
    try {
      const users = await this.prismaService.user.findMany();
      for (const user of users) {
        this.hiddenPassword(user);
      }
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(userCreateDto: UserCreateDto) {
    try {
      const { email, password, name, role, phone, address, gender } = userCreateDto;
      const existedEmail = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (existedEmail) {
        throw new UnprocessableEntityException('Email is existed');
      }

      const user = await this.prismaService.user.create({
        data: {
          email,
          password: await this.hashService.hashPassword(password),
          name,
          role,
          phone,
          address,
          gender,
        },
      });

      return this.hiddenPassword(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      if (!email) {
        throw new UnprocessableEntityException();
      }

      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('Please check your credential information');
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUserLoggedAt(userId: string) {
    try {
      const user = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          loggedAt: moment().format(),
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.hiddenPassword(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserProfile(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        include: {
          creator: true,
          updater: true,
        },
      });

      if (!user) {
        throw new UnprocessableEntityException('User not found');
      }

      this.hiddenPassword(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
