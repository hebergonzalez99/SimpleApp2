import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private Auth:AuthServiceService, private router: Router) { }

  ngOnInit() {
    
  }



  onSubmit() {
    // Handle login logic here
    this.Auth.login(this.email, this.password)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['']);
          // do something after successful login
        },
        err => {
          console.log(err);
          this.errorMessage = 'Invalid email or password';
          // do something after failed login
        }
      );
  }
}
