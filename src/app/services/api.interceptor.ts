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
    /* Setting headers for the http calls **/
    let httpReq=request;
    if(request.url !="http://15.207.42.209:8080/Volunteer/getCSVFile"){
      httpReq = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    console.log("Request:",request);
    return next.handle(httpReq).pipe(
      //retry(1),
      /* Handling errors of http call */
      catchError((error: HttpErrorResponse) => {
        let error_message="API Call failed";
        if(error.error.message !=''){
          error_message=error.error.message;
        }
        else if(error.message !=''){
          error_message=error.message;
        }
        if(error.status==404){
          error_message="API not found"
        }
        if(error.status==503){
          error_message="Service Unavailable"
        }
        if((request.url !="http://15.207.42.209:8080/Volunteer/getVolunteersList" && error.status!=409) || error.status==503 || error.status==404)
          this.showNotification({message:error_message}); // ivoking error notification function
        return throwError(error);
      })
    );
  }
  /**
   * showNotification function is to display notification
   * @param notificationData 
   */
  showNotification(notificationData){
    this.snackBar.openFromComponent(NotificationMessageComponent,{
      data:notificationData,
      duration:2000,
      panelClass: "notification-snackbar"
    });
  }
}
