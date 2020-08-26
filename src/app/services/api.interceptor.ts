import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry } from "rxjs/operators"

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
    return next.handle(httpReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        // this.snackBar.open("<div color='warning'>Something went wring</div>",'',{
        //   duration: 2000
        // });
        return throwError(error);
      })
    );
  }
}
