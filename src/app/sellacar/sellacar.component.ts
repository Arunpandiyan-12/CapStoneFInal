import { Component } from '@angular/core';
import { Car, CardataService } from '../cardata.service';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

@Component({
  selector: 'app-sellacar',
  standalone: true,  // <-- Use standalone: true
  imports: [FormsModule],  // <-- Add FormsModule here
  templateUrl: './sellacar.component.html',
  styleUrls: []  // <-- Use styleUrls instead of styleUrl
})
export class SellacarComponent {
  car!:Car;

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
