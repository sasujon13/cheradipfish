import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Update with your API URL
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login/`, loginData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.isAuthenticated = true;
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
  
  signup(email: string, password: string): Observable<any> {
    const signupData = { email, password };
    return this.http.post(`${this.apiUrl}/signup/`, signupData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.isAuthenticated = true;
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
  

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
  }
}
