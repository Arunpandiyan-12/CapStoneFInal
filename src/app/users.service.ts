import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  registeredDate: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userApiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]); 
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userApiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting user with ID ${id}:`, error);
        return of();
      })
    );
  }
}
