import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<any>("http://127.0.0.1:8000/api/item/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getDivisions(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:8000/api/divisions/');
  }
  
  getDistricts(division: string): Observable<string[]> {
    return this.http.get<string[]>(`http://127.0.0.1:8000/api/districts/?division=${division}`);
  }
  
  getThanas(division: string, district: string): Observable<string[]> {
    return this.http.get<string[]>(`http://127.0.0.1:8000/api/thanas/?division=${division}&district=${district}`);
  }
  
}
