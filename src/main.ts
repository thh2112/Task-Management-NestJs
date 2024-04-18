import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from '@shared/filters';
import { ConfigService } from '@nestjs/config';
import { Environment } from '@shared/constants/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === Environment.Production
        ? ['error', 'warn']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(configService));

  await app.listen(3000);
}
bootstrap();
