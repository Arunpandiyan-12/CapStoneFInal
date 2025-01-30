import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private router: Router) {}
  explorecars(){
    this.router.navigate(['/explorecars'])
  }
  serviceproveider(){
    this.router.navigate(['/serviceproveider'])
  }
  sellacar(){
    this.router.navigate(['/sellacar'])
  }
  sigin(){
    this.router.navigate(['/sigin'])
  }
  homepage(){
    this.router.navigate(['/homepage'])
  }
}
