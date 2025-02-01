import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/authservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private subscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.subscription = this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        if (response.token) {
          this.authService.saveToken(response.token); // Save token in local storage
          const userId = this.authService.getUserIdFromToken(); // Retrieve user ID
          console.log('User ID:', userId);
          this.router.navigate(['/sellacar']); // Redirect after login
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', err);
      }
    });
  }

  register(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/registration']);
  }
  

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
