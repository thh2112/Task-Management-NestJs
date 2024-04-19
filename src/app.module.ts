import * as configurations from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as _ from 'lodash';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production'],
      load: _.values(configurations),
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
