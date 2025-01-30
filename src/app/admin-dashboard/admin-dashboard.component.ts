import { Component, OnInit } from '@angular/core';
import { CardataService, Car } from '../cardata.service';
import { UsersService, User } from '../users.service';
import { HttpClient } from '@angular/common/http';
import { AdminAnalyticsService, AdminAnalyticalDto } from '../admin-analytics.service';  // Import the AdminAnalyticsService

import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminData: AdminAnalyticalDto | null = null;
  private userApiUrl = 'http://localhost:8080/api/users';
  analytics: any = {
    totalUsers: 0,
    totalCarsListed: 0,
    pendingCarListings: 0,
    carsSold: 0,
    topSellingCar: [],
    biddingEnabledCount: 0,
    totalBookings: 0,
    activeUsers: 0,
    activeBookings: 0
  };
  inventory: Car[] = [];
  users: User[] = [];
  loading: boolean = false;
  error: boolean = false;
  cars: Car[] = [];

  constructor(private http: HttpClient,
    private cardataService: CardataService,
    private userService: UsersService,
    private adminAnalyticsService: AdminAnalyticsService  // Inject the AdminAnalyticsService
  ) {}

  ngOnInit(): void {
    this.loadCars();             // Load cars when the component initializes
    this.getAllUsers();          // Load all users for analytics
    this.loadAdminAnalytics();   // Fetch the admin analytics data
  }

  loadCars() {
    this.loading = true;
    this.error = false;

    this.cardataService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  getAllUsers() {
    this.loading = true;
    this.error = false;
  
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.analytics.totalUsers = users.length;
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  // Fetch admin analytics data
  loadAdminAnalytics() {
    this.adminAnalyticsService.getAdminAnalytics().subscribe((data: AdminAnalyticalDto) => {
      this.adminData = data;
      // Update analytics object with fetched data
      this.analytics.totalCarsListed = data.totalCarsListed;
      this.analytics.pendingCarListings = data.pendingCarListings;
      this.analytics.carsSold = data.carsSold;
      this.analytics.topSellingCar = data.topSellingCar;
      this.analytics.biddingEnabledCount = data.biddingEnabledCount;
      this.analytics.totalBookings = data.totalBookings;
      this.analytics.activeUsers = data.activeUsers;
    });
  }

  editCar(car: Car): void {
    console.log(`Editing car: ${car.carModel}`);
  }

  markAsSold(car: Car): void {
    car.isSold = true;
    this.cardataService.updateCar(car.id, car).subscribe(updatedCar => {
      const index = this.inventory.findIndex(c => c.id === car.id);
      if (index !== -1) {
        this.inventory[index] = updatedCar;
      }
    });
  }

  deleteCar(car: Car): void {
    this.cardataService.deleteCar(car.id).subscribe(() => {
      this.inventory = this.inventory.filter(c => c.id !== car.id);
    });
  }

  approveCar(carId: number) {
    this.userService.approveCar(carId).subscribe(response => {
      alert(response);
      this.loadCars();  // Refresh car list after approval
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.analytics.totalUsers = this.users.length;
    });
  }
  changeUserRole(userId: number, role: string): Observable<any> {
    const url = `${this.userApiUrl}/${userId}/role?role=${role}`;
    return this.http.put<any>(url, null).pipe(
      catchError(error => {
        console.error(`Error changing role for user ${userId}:`, error);
        return of(error); // return error observable
      })
    );
  }
}
