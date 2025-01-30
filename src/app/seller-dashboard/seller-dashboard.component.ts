import { Component, OnInit } from '@angular/core';
import { SellerDashboardService } from '../seller-dashboardservice.service';
import { CardataService, Car } from '../cardata.service';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  userId: number = 1;  // Replace with actual logic to fetch logged-in user's ID
  totalListings: number = 0;
  carsSold: number = 0;
  activeListings: number = 0;
  listedCars: Car[] = [];

  constructor(
    private sellerDashboardService: SellerDashboardService,
    private usersService: UsersService,
    private cardataService: CardataService
  ) {}

  ngOnInit(): void {
    this.getSellerCars();
  }

  // Fetch cars listed by the current seller (based on userId)
  getSellerCars(): void {
    this.sellerDashboardService.getSellerCars(this.userId).subscribe(cars => {
      this.listedCars = cars;
      this.totalListings = cars.length;
      this.carsSold = cars.filter(car => car.isSold).length;
      this.activeListings = cars.filter(car => car.status === 'ACTIVE').length;
    });
  }

  // Mark car as sold
  markAsSold(carId: number): void {
    const carToUpdate = this.listedCars.find(car => car.id === carId);
    if (carToUpdate) {
      carToUpdate.isSold = true;
      this.cardataService.updateCar(carId, carToUpdate).subscribe(updatedCar => {
        this.getSellerCars(); // Refresh the cars after update
      });
    }
  }

  // Delete a car listing
  deleteListing(carId: number): void {
    this.cardataService.deleteCar(carId).subscribe(() => {
      this.getSellerCars(); // Refresh the car listings after deletion
    });
  }
}
