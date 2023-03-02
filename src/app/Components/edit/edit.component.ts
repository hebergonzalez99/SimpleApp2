import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/Classes/person';

import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  g = ['Male', 'Female', 'Other', "I'd rather not say"];
  idQP!: number;
  public data:any = [];
  today = new Date()
  fifteenYears = new Date(new Date().setFullYear(this.today.getFullYear() - 15))
  public defaultDate: Date = new Date();
  name: string;
  lastname: string;
  gender: string;
  bd = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idQP = params['id'];
    });
    this.loadData(this.idQP);
    
  }

  public loadData(id:Number){
    this.API.get(id).subscribe(res=>{
      this.data = res;
      this.defaultDate = this.getDateFromString(this.data.birthdate);
      console.log(this.defaultDate);
      this.name = this.data.name;
      this.lastname = this.data.lastname;
      this.gender = this.data.gender;
    });
    
  }
  public getDateFromString(dateString: string): Date {
    const [dd, mm, yyyy] = dateString.split('/');
    const date =  new Date(Number(yyyy), Number(mm) - 1, Number(dd), 0, 0, 0);
    return date;
  }
  onSubmit(){
    this.bd = this.defaultDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    this.sendData(this.idQP);
  }

  sendData(id:Number){
    let ageInMillis = Date.now() - this.defaultDate.getTime();
    let age = Math.floor(ageInMillis / (1000*60*60*24*365.25));
    this.API.put(id, 
    {
      "name":this.name,
      "lastname":this.lastname,
      "gender":this.gender,
      "birthdate":this.bd,
      "age":age
    }
    ).subscribe(res => {
      console.log("success!");
      this.router.navigate(['/table'])
    })
  }
  constructor(private API:APIService, private route: ActivatedRoute, private router: Router){
    this.name = this.data.name;
    this.lastname = this.data.lastname;
    this.gender = this.data.gender;
    
  }
}
