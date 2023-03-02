import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthServiceService } from './Services/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private Auth:AuthServiceService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        //if error is 401, try refreshing the token
        if(error instanceof HttpErrorResponse && error.status === 401){
          return this.handle401Error(request, next);
        }
        else{
          console.log(error instanceof HttpErrorResponse)
          return throwError(() => new Error(error));
        }
      })
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.Auth.refreshToken().pipe(
      switchMap((response) => {
        const accessToken = localStorage.getItem('access_token');
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        return next.handle(request);
      }),
      catchError((error) => {
        if (error.status === 401 && error.error.message === 'Refresh token expired') {
          // Refresh token has also expired, navigate to login page
          this.router.navigate(['/login']);
        }
        console.log(error.status);
        return throwError(error);
      })
    );
  }
}
