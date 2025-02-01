import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode'; // Fix import issue
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login'; // Update your backend URL
  private tokenKey = 'auth_token';
  private registrationUrl = 'http://localhost:8080/register';  // Update with your registration endpoint
  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Fix: Ensure this method returns an Observable, not a Subscription
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password }).pipe(
      map(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
        return response;
      })
    );
  }
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(this.registrationUrl, { username, password, email });
  }

  // ✅ Fix: Implement saveToken
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ Fix: Implement getUserIdFromToken
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
