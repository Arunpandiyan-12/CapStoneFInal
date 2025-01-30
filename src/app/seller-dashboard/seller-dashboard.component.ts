import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Car {
  id: number;
  name: string;
  image: string;
  price: number; // Adding a price property for display
  description: string; // Adding a description property for additional details
}

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SellerDashboardComponent {
  
  listedCars = [
    { id: 1, model: 'Model S', year: 2019, mileage: '25,000 mi', price: '$45,000', status: 'Available', image: 'modelS.png'},
    { id: 2, model: 'Model 3', year: 2020, mileage: '15,000 mi', price: '$35,000', status: 'Available', image: 'model3.png' },
    { id: 3, model: 'Model X', year: 2018, mileage: '30,000 mi', price: '$50,000', status: 'Sold', image: 'modelX.png' },
  ];

  // Computed properties
  get totalListings(): number {
    return this.listedCars.length;
  }

  get carsSold(): number {
    return this.listedCars.filter(car => car.status === 'Sold').length;
  }

  get activeListings(): number {
    return this.listedCars.filter(car => car.status === 'Available').length;
  }

  // Function to mark a car as sold
  markAsSold(carId: number) {
    const car = this.listedCars.find(c => c.id === carId);
    if (car) {
      car.status = 'Sold';
      alert(`${car.model} marked as sold!`);
    }
  }

  // Function to delete a car listing
  deleteListing(carId: number) {
    this.listedCars = this.listedCars.filter(c => c.id !== carId);
    alert('Listing deleted!');
  }
}