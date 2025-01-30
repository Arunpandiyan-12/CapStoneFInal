import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardataService, Car } from '../cardata.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CarDetailComponent implements OnInit {
  carData!: Car; // Holds the selected car details
  estimatedPrice = 0; // Will hold the fetched estimated price
  bidPrice: number = 1000; // Default bid
  message: string = '';
  currentImageIndex: number=0;

  constructor(
    private route: ActivatedRoute,
    private carService: CardataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCarDetails(id);
  }

  loadCarDetails(id: number) {
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        if (data) {
          this.carData = data;
          // Fetch estimated car price based on the car details (location, year, model)
          this.fetchEstimatedCarPrice();
        } else {
          console.error('No car data found');
        }
      },
      error: (error: any) => {
        console.error('Error fetching car details:', error);
      }
    });
  }

  fetchEstimatedCarPrice() {
    // Fetch the estimated price based on location, year, and carModel
    const { location, year, carModel } = this.carData;
    this.carService.fetchEstimatedCarPrice(location, year, carModel).subscribe({
      next: (estimatedPrice) => {
        this.estimatedPrice = estimatedPrice; // Set the fetched estimated price
      },
      error: (error) => {
        console.error('Error fetching estimated price:', error);
      }
    });
  }
  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.carData.imageUrl.length - 1;
    }
  }

  // Navigate to the next image
  nextImage(): void {
    if (this.currentImageIndex < this.carData.imageUrl.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }
  // Bid submission logic
  onBidChange(): void {
    const slider = document.querySelector('.bid-slider') as HTMLInputElement;
    const value = ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #920000 0%, #920000 ${value}%, #000 ${value}%, #000 100%)`;
  }

  sendBid(): void {
    alert(`Hi, I would like to bid $${this.bidPrice} for this vehicle.\n\nMessage: ${this.message}`);
  }
}
