import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
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
        if(error instanceof HttpResponse && error.status === 401){
          return this.handle401Error(request, next);
        }
        else{
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
        //if refresh fails, redirect
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
  }
}
