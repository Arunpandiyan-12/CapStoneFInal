import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

// Define the DTO interface structure in TypeScript
export interface CarDetailDto {
  carMake: string;
  carModel: string;
  salesCount: number;
}

export interface AdminAnalyticalDto {
  totalUsers: number;
  totalCarsListed: number;
  pendingCarListings: number;
  carsSold: number;
  topSellingCar: CarDetailDto[];
  biddingEnabledCount: number;
  totalBookings: number;
  activeUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAnalyticsService {
  // Base API URL
  private apiUrl = 'https://your-backend-api.com/api/admin/analytics';  // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to get the admin analytics data
  getAdminAnalytics(): Observable<AdminAnalyticalDto> {
    return this.http.get<AdminAnalyticalDto>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching admin analytics:', error);
        return of({} as AdminAnalyticalDto);  // Returning an empty object of type AdminAnalyticalDto
      })
    );
  }
  
}
