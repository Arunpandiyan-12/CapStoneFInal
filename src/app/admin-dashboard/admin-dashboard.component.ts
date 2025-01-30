import { Component, OnInit } from '@angular/core';
import { CardataService, Car } from '../cardata.service';
import { UsersService, User } from '../users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  totalInventory = 0;
  totalUsers = 0;
  carsSoldThisMonth = 12;
  revenueGenerated = '$250,000';
  customerSatisfaction = '4.8/5';

  inventory: Car[] = [];
  users: User[] = [];

  constructor(private cardataService: CardataService, private userService: UsersService) {}

  ngOnInit(): void {
    this.getCars();
    this.getAllUsers();
  }

  // Fetch all cars
  getCars(): void {
    this.cardataService.getCars().subscribe((cars: Car[]) => {
      this.inventory = cars;
      this.totalInventory = cars.length;
    });
  }

  // Fetch all users
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.totalUsers = users.length;
    });
  }

  // Edit car
  editCar(car: Car): void {
    console.log(`Editing car: ${car.carModel}`);
  }

  // Mark car as sold
  markAsSold(car: Car): void {
    car.isSold = true;
    this.cardataService.updateCar(car.id, car).subscribe(updatedCar => {
      const index = this.inventory.findIndex(c => c.id === car.id);
      if (index !== -1) {
        this.inventory[index] = updatedCar;
      }
    });
  }

  // Delete car
  deleteCar(car: Car): void {
    this.cardataService.deleteCar(car.id).subscribe(() => {
      this.inventory = this.inventory.filter(c => c.id !== car.id);
    });
  }

  // Approve listing
  approveCarListing(car: Car): void {
    car.status = 'Approved';
    this.cardataService.updateCar(car.id, car).subscribe(updatedCar => {
      const index = this.inventory.findIndex(c => c.id === car.id);
      if (index !== -1) {
        this.inventory[index] = updatedCar;
      }
    });
  }

  // Delete user
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.totalUsers = this.users.length;
    });
  }
}
