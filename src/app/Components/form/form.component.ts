import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/Classes/person';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  gender = ['Male', 'Female', 'Other', "I'd rather not say"];
  today = new Date()
  fifteenYears = new Date(new Date().setFullYear(this.today.getFullYear() - 15))
  model = new Person('', '', this.fifteenYears, '');
  bd = '';
  submitted = false;
  
  constructor(private API:APIService, private router: Router){}
 

  onSubmit() { 
    this.submitted = true; 
    this.bd = this.model.birthdate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  sendData(){
    
    let ageInMillis = Date.now() - this.model.birthdate.getTime();
    let age = Math.floor(ageInMillis / (1000*60*60*24*365.25));
    this.API.post( 
    {
      "name":this.model.name,
      "lastname":this.model.lastname,
      "gender":this.model.gender,
      "birthdate":this.bd,
      "age":age
    }
    ).subscribe(res => {
      console.log("success!");
    })
    window.location.reload();
  }

  newPerson(){
    this.model = new Person('', '', this.fifteenYears);
  }

  ngOnInit(){
    let today = new Date()
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);

  }
}
