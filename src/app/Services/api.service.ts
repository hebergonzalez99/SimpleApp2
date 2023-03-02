import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private url = 'http://127.0.0.1:8000/api/person/';

  constructor(private http: HttpClient) { }
  
  public post(body:any){
    return this.http.post(this.url, body);
  }

  public get(id?:Number){
    if(id){
      let idstring = id.toString(); + '/'
      return this.http.get(this.url + idstring)
    }
    return this.http.get(this.url)
  }

  public put(id:Number, body:any){
    let idstring = id.toString() + '/'
    return this.http.put(this.url + idstring, body)
  }


  
}
