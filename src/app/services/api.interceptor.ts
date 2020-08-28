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
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

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
        this.showNotification({message:"API Call failed"});
        return throwError(error);
      })
    );
  }
  showNotification(notificationData){
    this.snackBar.openFromComponent(NotificationMessageComponent,{
      data:notificationData,
      duration:2000,
      panelClass: "notification-snackbar"
    });
  }
}
