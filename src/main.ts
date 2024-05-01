import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from '@shared/filters';
import { ConfigService } from '@nestjs/config';
import { Environment } from '@shared/constants/environment';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === Environment.Production
        ? ['error', 'warn']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(configService));
  app.useGlobalInterceptors(new AuthInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      enableDebugMessages: process.env.NODE_ENV !== Environment.Production,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      whitelist: true,
      transform: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  if (process.env.NODE_ENV !== Environment.Production) {
    await app.listen(configService.get('PORT'));
    console.log(`✅ Application is 🏃‍♂️ on: ${await app.getUrl()} - ${configService.get('NODE_ENV')}`);
  }
}
bootstrap();
