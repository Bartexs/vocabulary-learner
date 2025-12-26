import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../security/services/auth-service.service';
import { AuthRequest } from '../security/models/AuthRequest';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vocabulary-learner';
  isUser = false;

  constructor (
    public authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.verifyLocalStorage();
  }

  verifyLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setUser();
    }
  }

  logoutUser() {
    this.authService.logout();
  }

  setUser() {
    this.authService.loadCurrentUser();
      this.authService.appUser$.subscribe((user) => {
          if(user) this.isUser = true
        }
    )
  }
}
