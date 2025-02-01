import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardataService, Car } from '../../services/cardata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-cardetails',
  templateUrl: './car-detail.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carData!: Car; 
  estimatedPrice: string = ''; 
  bidPrice: number = 1000; 
  message: string = '';
  currentImageIndex: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  dealType: string = ''; 
  priceDifference: number = 0; 
  estimatedPriceLong: number = 0; 
  carId!: number;

  constructor(
    private route: ActivatedRoute,
    private carService: CardataService
  ) {}

  ngOnInit() {
    // Get carId from route params
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.carId) {
      this.loadCarDetails(this.carId);  // Load car details by carId
    } else {
      console.error('Car ID is missing or invalid');
    }
  }

  loadCarDetails(id: number) {
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        if (data) {
          this.carData = data;
          console.log(this.carData);
          this.fetchEstimatedCarPrice();  // Fetch estimated price for this car
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
    if (!this.carId) {
      console.error('Car ID is missing');
      return;
    }
  
    this.carService.fetchEstimatedCarPrice(this.carId).subscribe({
      next: (estimatedPrice) => {
        // Convert the fetched price to number
        this.estimatedPriceLong = Number(estimatedPrice);
        this.updateDealInfo();  // Update deal info based on estimated price
      },
      error: (error) => {
        console.error('Error fetching estimated price:', error);
        this.estimatedPriceLong = 0;  // Set default value if error occurs
      }
    });
  }

  updateDealInfo() {
    const expectedPrice = this.carData?.expectedPrice || 0;

    // Calculate the price difference
    this.priceDifference = Math.abs(expectedPrice - this.estimatedPriceLong);

    // Determine deal type
    this.dealType = expectedPrice < this.estimatedPriceLong ? 'Good Deal' : 'Bad Deal';
  }

  updatePriceRange() {
    const expectedPrice = this.carData?.expectedPrice || 0;
    const estimatedPrice = this.estimatedPriceLong;

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
