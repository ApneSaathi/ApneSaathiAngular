import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let httpReq = request.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    console.log("Request:",request);
    return next.handle(httpReq);
  }
}
