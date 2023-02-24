import { Component } from '@angular/core';
import { Person } from 'src/app/Classes/person';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  gender = ['Male', 'Female', 'Other'];
  today = new Date()

  model = new Person(18, 'Heber', 'Gonzalez', this.today, this.gender[0]);

  submitted = false;

 

  onSubmit() { this.submitted = true; }

  newPerson(){
    this.model = new Person(42, '', '', this.today);
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
