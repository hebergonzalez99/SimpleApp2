import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthServiceService } from './Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService,
    private router: Router,
    private jwtHelper: JwtHelperService){ }
  
    canActivate(): boolean {
      let token = localStorage.getItem('access_token');
  
      if (token && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }
      
      this.router.navigate(['/login']);
      
      return false;
      
    }
  
}
