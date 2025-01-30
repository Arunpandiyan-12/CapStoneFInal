import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAnalyticsService {

  // Base API URL
  private apiUrl = 'https://your-backend-api.com/api/admin/analytics';  // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to get the admin analytics data
  getAdminAnalytics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
