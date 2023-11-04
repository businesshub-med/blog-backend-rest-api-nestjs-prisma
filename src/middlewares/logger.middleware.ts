import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Nest-API');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const requestLength = +request.get('content-length');
    let requestBody = request.body;
    if (requestLength > 500) {
      requestBody = request.body.substring(0, 500);
    }

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      // this.logger.log(`request:`, {
      //   headers: request.headers,
      //   body: requestBody,
      //   original_url: originalUrl,
      //   user_agent: userAgent,
      //   ip: ip,
      //   request_method: method,
      //   request_length: requestLength,
      //   response_code: statusCode,
      //   response_length: contentLength,
      // });

      // this.logger.log(
      //   `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      // , response);
    });

    next();
  }
}
