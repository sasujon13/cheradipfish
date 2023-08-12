import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<any>("http://127.0.0.1:8000/item/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
