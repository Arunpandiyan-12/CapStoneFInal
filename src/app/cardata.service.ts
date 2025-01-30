import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Car {
  id: number;
  registrationNumber: string;
  ownerName: string;
  carMake: string;
  carModel: string;
  variant: string;
  year: number;
  price: number;
  imageUrl: string[];
  description: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  engineCapacity: number;
  fuelEfficiency: number;
  emissions: number;
  availability: string;
  location: string;
  userId: number;  // Optional, depending on how you want to associate users with cars
  biddingAllowed: boolean;
  isSold: boolean;
  bookingCount: number;
  status:string;
}

@Injectable({
  providedIn: 'root', // Provide this service globally
})
export class CardataService {
  private apiUrl = 'http://localhost:8080/api/cars'; // Your API URL
  private estimatedPriceUrl = 'http://localhost:8080/api/estimated-price'; // Your estimated price endpoint
  private fallbackCars: Car[] = [
    // Your fallback data for cars
  ];

  constructor(private http: HttpClient) {}

  // Fetch all cars with error handling
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching cars from backend:', error);
        return of(this.fallbackCars); // Return fallback data on error
      })
    );
  }

  // Fetch a specific car by ID with error handling
  getCarById(id: number): Observable<Car | undefined> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching car with ID ${id}:`, error);
        return of(undefined); // Return undefined if not found or error occurs
      })
    );
  }

  // Update an existing car (PUT request to backend)
  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car).pipe(
      catchError(error => {
        console.error(`Error updating car with ID ${id}:`, error);
        return of({} as Car); // Return empty car object in case of error
      })
    );
  }

  // Delete a car (DELETE request to backend)
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting car with ID ${id}:`, error);
        return of(); // Return nothing in case of error
      })
    );
  }

  // Fetch estimated car price based on location, year, and model
  fetchEstimatedCarPrice(location: string, year: number, model: string): Observable<number> {
    return this.http.post<number>(this.estimatedPriceUrl, { location, year, model }).pipe(
      catchError(error => {
        console.error('Error fetching estimated car price:', error);
        return of(0); // Return 0 as a fallback if error occurs
      })
    );
  }
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car).pipe(
      catchError(error => {
        console.error('Error adding car:', error);
        return of({} as Car); // Return empty car object in case of error
      })
    );
  }
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching cars from backend:', error);
        return of([]); 
      })
    );
  }
}
