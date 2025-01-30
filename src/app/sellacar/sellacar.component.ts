import { Component } from '@angular/core';
import { Car, CardataService } from '../cardata.service';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

@Component({
  selector: 'app-sellacar',
  standalone: true,  // <-- Use standalone: true
  imports: [FormsModule],  // <-- Add FormsModule here
  templateUrl: './sellacar.component.html',
  styleUrls: ['./sellacar.component.css']  // <-- Use styleUrls instead of styleUrl
})
export class SellacarComponent {
  car: Car = {
    registrationNumber: '',
    carMake: '',
    carModel: '',
    variant: '',
    manufactureYear: 0,
    expectedPrice: 0,
    kms: 0,
    fuelType: '',
    transmissionType: '',
    bodyType: '',
    vehicleLocation: '',
    biddingAllowed: false,
    imageUrls: [], // Empty array to hold the image URLs,
    id: 0,
    ownerName: '',
    numberOfOwners: 0,
    vin: '',
    description: '',
    status: '',
    userId: 0,
    isSold: false,
    bookingCount: 0
  };

  constructor(private carDataService: CardataService) {}

  onSubmit() {
    this.carDataService.addCar(this.car).subscribe(
      response => {
        console.log('Car added successfully', response);
        alert('Car added successfully!');
      },
      error => {
        console.error('Error adding car:', error);
        alert('There was an error adding the car.');
      }
    );
  }
}
