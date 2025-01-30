import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Car } from './cardata.service';

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
  private carApiUrl = 'http://localhost:8082/cars';

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

  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${this.userApiUrl}/${id}`).pipe(
      tap(data => console.log('User Data:', data)),
      catchError(error => {
        console.error(`Error fetching user with ID ${id}:`, error);
        return of(undefined);
      })
    );
  }

  getCarsByUserId(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(this.carApiUrl).pipe(
      map((cars: Car[]) => cars.filter(car => car.userId === userId)),
      catchError(error => {
        console.error(`Error filtering cars for user ID ${userId}:`, error);
        return of([]);
      })
    );
  }

  approveCar(carId: number): Observable<string> {
    return this.http.put<string>(`${this.carApiUrl}/${carId}/approve`, {}).pipe(
      catchError(error => {
        console.error(`Error approving car with ID ${carId}:`, error);
        return of('Failed to approve car');
      })
    );
  }
}
