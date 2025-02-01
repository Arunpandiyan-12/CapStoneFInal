import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardataService, Car } from '../../services/cardata.service'; // Ensure correct import path

@Component({
  selector: 'app-carslist',
  standalone: true, // This is important for standalone components
  imports: [CommonModule],
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent implements OnInit {
  cars: Car[] = []; // Empty array initially

  loading: boolean = false;
  error: boolean = false;

  constructor(
    private router: Router,
    private carService: CardataService
  ) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.loading = true;
    this.error = false;

    // Fetch cars using the service
    this.carService.getCars().subscribe({
      next: (data) => {
        console.log('Fetched cars:', data); // Log the data for confirmation
        this.cars = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/car-details', id]);
  }
}
