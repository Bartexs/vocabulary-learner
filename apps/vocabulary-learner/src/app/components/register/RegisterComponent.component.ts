import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService } from 'apps/vocabulary-learner/src/security/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './RegisterComponent.component.html',
  styleUrl: './RegisterComponent.component.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  form: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    localStorage.removeItem('token');

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.register(this.form.value).subscribe({
      next: (res) => {
        this.message = 'Registration successful! Token: ' + res.token;
        this.refreshUser();
      },
      error: () => {
        this.message = 'Registration failed.';
      }
    });
  }

  refreshUser(): void {
    this.authService.loadCurrentUser();
        this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}