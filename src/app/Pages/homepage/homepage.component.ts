import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) {}
  login(){
    this.router.navigate(['/signin']);
  }
  sellacar(){
    this.router.navigate(['/sellacar']);
  }
  explorecars(){
    this.router.navigate(['/carslist']);
  }
  Serviceprovider(){
    this.router.navigate(['/serviceprovider']);
  }
  homepage(){
    this.router.navigate(['/homepage']);
  }
  register()
  {
    this.router.navigate(['/registration']);
  }

  cars = [
    { name: 'Toyota', imgPath: 'toyota.png' },
    { name: 'Volkswagen', imgPath: 'volkswagen.png' },
    { name: 'Ford', imgPath: 'ford.png' },
    { name: 'Audi', imgPath: 'audi.png' },
    { name: 'Kia', imgPath: 'kia.png' },
    { name: 'Hyundai', imgPath: 'hyundai.png' },
    { name: 'Mahindra', imgPath: 'mahindra.png' },
    { name: 'BMW', imgPath: 'bmw.png' }
  ];
}
