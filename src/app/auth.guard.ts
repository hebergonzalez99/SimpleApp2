import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthServiceService } from './Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService,
    private router: Router,
    private jwtHelper: JwtHelperService){ }
    checkToken(){
      console.log("checking token");
      const token = localStorage.getItem('refresh_token');
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      return false;
    }
  
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.checkToken()){
        return true;
      }
      alert("No se ha iniciado sesion");
      this.router.navigate(['/login']);
      return false;
    }
    
  
}
