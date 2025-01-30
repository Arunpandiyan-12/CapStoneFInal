import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private router: Router) {}
  register(){
    this.router.navigate(['/registration']);
  }
  sellacar(){
    this.router.navigate(['sellacar']);
  }
}
