import { dbConfig } from '@config/index';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@Inject(dbConfig.KEY) private dbConf: ConfigType<typeof dbConfig>) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connect database successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
