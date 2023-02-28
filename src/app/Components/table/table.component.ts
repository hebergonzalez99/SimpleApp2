import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  public data:any = [];

  constructor(private API:APIService, private router: Router) {}

  ngOnInit(): void {
    this.loadData()
  }

  public loadData(){
    this.API.get().subscribe(res=>{
      this.data = res;
    })
  }

  public editInfo(id:number){
    console.log(id);
    this.router.navigate(['/edit'], { queryParams: { id: id } });
  }

}
