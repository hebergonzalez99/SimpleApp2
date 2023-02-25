import { Component } from '@angular/core';
import { Person } from 'src/app/Classes/person';

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

  submitted = false;
  
 

  onSubmit() { this.submitted = true; }

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
