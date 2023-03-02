import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private Auth:AuthServiceService, private router: Router){ }
  logout(){
    this.Auth.logout();
    this.router.navigate(['/login']);
  }
}
