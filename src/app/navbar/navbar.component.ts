import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
}
