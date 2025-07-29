import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../security/services/auth-service.service';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vocabulary-learner';
  isUser = false;

  constructor (private authService: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      this.authService.loadCurrentUser();
      this.authService.appUser$.subscribe((user) => {
          if(user) this.isUser = true
        }
      )
    }
  }

  logoutUser() {
    this.authService.logout();
  }

}
