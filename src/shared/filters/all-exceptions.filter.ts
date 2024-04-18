import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { moment, parseErrorStack } from '@shared/utils';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  protected readonly configService?: ConfigService;

  constructor(configService?: ConfigService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const msgError = exception.message ?? 'Internal server error';

    let detail: any = {
      path: request.url,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      statusCode: status,
    };

    if (exception && exception.getResponse) {
      const { message, statusCode, ...args } = exception.getResponse();
      if (_.keys(args).length > 0) {
        detail = { ...detail, ...args };
      }

      if (_.isArray(message) && message.length > 0) {
        detail = { ...detail, message };
      }

      if (status >= 500) {
        const stack = parseErrorStack(exception && exception.stack ? exception.stack : undefined);
        this.logger.error(message, {
          ...detail,
          stack,
        });
      }
    }

    response.status(status).json({
      isSuccess: false,
      message: msgError,
      detail,
    });
  }

  private generateExceptionDetail(exception: any) {}
}
