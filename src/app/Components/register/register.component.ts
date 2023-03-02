import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  rpassword: string = '';
  name:string = '';
  errorMessage: string = '';

  constructor(private Auth:AuthServiceService, private router: Router) { }

  ngOnInit() {
    
  }



  onSubmit() {
    // Handle login logic here
    console.log(this.email);
    this.Auth.register(this.name, this.email, this.password)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['']);
          // do something after successful login
        },
        err => {
          console.log(err);
          this.errorMessage = 'Invalid data. Check them and try again';
          // do something after failed login
        }
      );
  }
}
