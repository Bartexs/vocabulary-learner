import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'apps/vocabulary-learner/src/security/services/auth-service.service';
import { Router } from '@angular/router';
import { AuthRequest } from 'apps/vocabulary-learner/src/security/models/AuthRequest';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  registerDemoAccount() {
    this.authService.registerDemoAccount();
  }

  login() {
    const authRequestExample: AuthRequest  = {
      email: "test1@test",
      password: "passwordTest"
    }

  this.authService.register(authRequestExample).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.refreshUser();
      },
      error: (err) => {
        console.error("Registration failed" + err);
      }
    });
  }
}
