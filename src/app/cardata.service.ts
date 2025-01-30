import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Car {
  id: number; // Match with Long in backend
  registrationNumber: string;
  ownerName: string;
  carMake: string;
  carModel: string;
  variant: string;
  manufactureYear: number; // Match with `int manufactureYear` in backend
  kms: number; // Match with Long in backend
  bodyType: string;
  numberOfOwners: number; // Match with `int numberOfOwners` in backend
  fuelType: string;
  transmissionType: string; // Match with `transmissionType` in backend
  vehicleLocation: string; // Match with `vehicleLocation` in backend
  vin: string;
  expectedPrice: number; // Match with Long in backend
  description: string;

  imageUrls: string[]; // Match with `List<String> imageUrls` in backend

  status: string; // Default to "PENDING", corresponds with backend status

  userId: number; // Match with Long in backend

  biddingAllowed: boolean; // Match with backend's boolean type

  isSold: boolean; // Match with backend's boolean type

  bookingCount: number; // Match with backend's long type
}


@Injectable({
  providedIn: 'root',
})
export class CardataService {
  private apiUrl = 'http://localhost:8082/cars'; 
  private estimatedPriceUrl = 'http://localhost:8090/api/estimated-price'; 

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching cars:', error);
        return of([]);
      })
    );
  }

  // getCarById(id: number): Observable<Car | undefined> {
  //   return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
  //     catchError(error => {
  //       console.error(`Error fetching car with ID ${id}:`, error);
  //       return of(undefined);
  //     })
  //   );
  // }

  getCarById(id: number): Observable<Car | undefined> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Car Data:', data)), // Debug line
      catchError(error => {
        console.error(`Error fetching car with ID ${id}:`, error);
        return of(undefined);
      })
    );
  }
//   getCarById(id: number): Observable<Car> {
//     const dummyCar: Car = {
//         id: 1 ,
//         registrationNumber: "ABC123",
//         ownerName: "John Doe",
//         carMake: "Toyota",
//         carModel: "Camry",
//         variant: "XSE",
//         manufactureYear: 2020,
//         kms: 25000,
//         bodyType: "Sedan",
//         numberOfOwners: 1,
//         fuelType: "Petrol",
//         transmissionType: "Automatic",
//         vehicleLocation: "New York",
//         vin: "1HGCM82633A123456",
//         expectedPrice: 25000,
//         description: "Well-maintained car with excellent mileage.",
//         imageUrls: [
//             "https://via.placeholder.com/600x400",
//             "https://via.placeholder.com/600x400?text=Side+View",
//             "https://via.placeholder.com/600x400?text=Interior"
//         ],
//         status: "AVAILABLE",
//         userId: 1,
//         biddingAllowed: true,
//         isSold: false,
//         bookingCount: 2
//     };

//     return of(dummyCar);
// }


  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car).pipe(
      catchError(error => {
        console.error('Error adding car:', error);
        return of({} as Car);
      })
    );
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}/update`, car).pipe(
      catchError(error => {
        console.error(`Error updating car with ID ${id}:`, error);
        return of({} as Car);
      })
    );
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting car with ID ${id}:`, error);
        return of();
      })
    );
  }

  fetchEstimatedCarPrice(vehicleLocation: string, manufactureYear: number, carMake: string): Observable<number> {
    return this.http.post<number>(this.estimatedPriceUrl, { vehicleLocation, manufactureYear, carMake }).pipe(
      catchError(error => {
        console.error('Error fetching estimated car price:', error);
        return of(0);
      })
    );
  }
}
