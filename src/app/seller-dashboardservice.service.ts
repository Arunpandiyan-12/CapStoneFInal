import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Car } from './cardata.service';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService {

  private apiUrl = 'http://localhost:8082/cars'; // API URL for cars

  constructor(private http: HttpClient) {}

  // Fetch all cars listed by the current seller (use current logged-in user ID)
  getSellerCars(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching seller cars:', error);
        return of([]);
      })
    );
  }
}
