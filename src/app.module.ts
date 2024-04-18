import * as configurations from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as _ from 'lodash';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production'],
      load: _.values(configurations),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
