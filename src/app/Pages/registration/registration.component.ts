import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/authservice.service'; // Import AuthService

@Component({
  selector: 'app-registration',
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']  // Corrected "styleUrls" from "styleUrl"
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  // Registration logic
  register(): void {
    this.authService.register(this.username, this.password, this.email).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/signin']); // Redirect to login page after successful registration
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }

  // Navigation methods (if needed)
  explorecars() {
    this.router.navigate(['/explorecars']);
  }

  serviceproveider() {
    this.router.navigate(['/serviceproveider']);
  }

  sellacar() {
    this.router.navigate(['/sellacar']);
  }

  sigin() {
    this.router.navigate(['/signin']);
  }

  
}
