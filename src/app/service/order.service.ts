import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(orderDetails: any): Observable<any> {
    const url = 'your-backend-api-url/save-order'; // Replace with your backend API URL
    return this.http.post(url, orderDetails);
  }
}
