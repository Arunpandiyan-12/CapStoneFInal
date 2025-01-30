import { Component, OnInit } from '@angular/core';
import { CardataService, Car } from '../cardata.service';
import { UsersService, User } from '../users.service';
import { CommonModule } from '@angular/common';
import { AdminAnalyticsService } from '../admin-analytics.service';  // Assuming this service fetches analytics data

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
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

  constructor(
    private cardataService: CardataService, 
    private userService: UsersService, 
    private adminAnalyticsService: AdminAnalyticsService  // Service to fetch analytics
  ) {}

  ngOnInit(): void {
    this.loadCars();
    this.getAllUsers();
    this.loadAdminAnalytics();  // Fetch the admin analytics data
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

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.analytics.totalUsers = users.length;
    });
  }

  loadAdminAnalytics() {
    this.adminAnalyticsService.getAdminAnalytics().subscribe((data: any) => {
      this.analytics = data;
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
      this.loadCars(); 
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.analytics.totalUsers = this.users.length;
    });
  }
}
