import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardataService, Car } from '../cardata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-cardetails',
  templateUrl: './car-detail.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carData!: Car; // Holds the selected car details
  estimatedPrice = 0; // Will hold the fetched estimated price
  bidPrice: number = 1000; // Default bid
  message: string = '';
  currentImageIndex: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  dealType: string = ''; // Will hold 'Good Deal' or 'Bad Deal'
  priceDifference: number = 0; // Will hold the price difference

  constructor(
    private route: ActivatedRoute,
    private carService: CardataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCarDetails(id);
    this.updatePriceRange();
    this.fetchEstimatedCarPrice();
  }

  loadCarDetails(id: number) {
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        if (data) {
          this.carData = data;
          console.log(this.carData);
          // Fetch estimated car price if needed
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
    const { vehicleLocation, manufactureYear, carMake } = this.carData;
    this.carService.fetchEstimatedCarPrice(vehicleLocation, manufactureYear, carMake).subscribe({
      next: (estimatedPrice) => {
        this.estimatedPrice = estimatedPrice; // Set the fetched estimated price
        this.updateDealInfo(); // Update deal type and price difference
      },
      error: (error) => {
        console.error('Error fetching estimated price:', error);
      }
    });
  }

  updateDealInfo() {
    const expectedPrice = this.carData?.expectedPrice || 0;

    // Calculate the price difference
    this.priceDifference = Math.abs(expectedPrice - this.estimatedPrice);

    // Determine deal type
    if (expectedPrice < this.estimatedPrice) {
      this.dealType = 'Good Deal'; // Expected price is lower than estimated price
    } else {
      this.dealType = 'Bad Deal'; // Expected price is higher than estimated price
    }
  }

  updatePriceRange() {
    const expectedPrice = this.carData?.expectedPrice || 0;
    const estimatedPrice = this.estimatedPrice;

    // Calculate minPrice and maxPrice based on expectedPrice and estimatedPrice
    const min = Math.min(expectedPrice, estimatedPrice);
    const max = Math.max(expectedPrice, estimatedPrice);

    this.minPrice = this.roundToNearestTenThousand(min);
    this.maxPrice = this.roundToNearestTenThousand(max);
  }

  roundToNearestTenThousand(value: number): number {
    return Math.round(value / 10000) * 10000;
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

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.carData.imageUrls.length - 1;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.carData.imageUrls.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }
}
