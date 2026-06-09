import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response<any,Record<string, any>> = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
