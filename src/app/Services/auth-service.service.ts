import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{access: string, refresh: string}>('http://localhost:8000/api/token/', {email, password})
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
        }),
        catchError((err) => {
          // Handle error here
          console.error(err);
          return throwError(err);
        })
      );
  }

  register(name:string, email:string, password:string){
    return this.http.post<{access:string, refresh:string}>('http://localhost:8000/api/register/', {name, email, password}).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      }),
      catchError((err) => {
        // Handle error here
        console.error(err);
        return throwError(err);
      })
    );
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<{access:string}>("localhost:8000/api/token/refresh/", {
      refreshToken
    }).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access);
        return response;
      })
    )
  }
}
