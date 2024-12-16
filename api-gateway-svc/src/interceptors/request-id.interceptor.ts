import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = uuidv4();
    request.requestId = requestId; // Attach to request object

    // Optionally, attach to response headers
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Request-ID', requestId);

    return next.handle();
  }
}
