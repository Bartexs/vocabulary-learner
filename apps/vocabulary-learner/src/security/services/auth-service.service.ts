import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { AuthRequest } from '../models/AuthRequest';
import { environment } from '../../environments/environment';
import { AppUser } from '../../app/core/models/appUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private currentUser$ = new BehaviorSubject<AppUser | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  register(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data).pipe(
      tap(res => { 
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
    window.location.reload();
  }

  loadCurrentUser() {
    this.getCurrentUser().subscribe({
      next: (user) => this.currentUser$.next(user),
    })
  }

  get appUser$(): Observable<AppUser | null> {
    return this.currentUser$.asObservable();
  }

  private getCurrentUser(): Observable<AppUser> {
    return this.http.get<AppUser>(`${environment.apiUrl}/users/me`);
  }

  public generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  registerDemoAccount() {
    const authRequest: AuthRequest = {
      email: 'demo_' + this.generateRandomString(6),
      password: this.generateRandomString(12)
    }

    this.register(authRequest).subscribe({
      next: (res) => {
        this.refreshUser();
      },
      error: (err) => {
        console.error("Registration failed" + err);
      }
    });
  }

  refreshUser(): void {
    this.loadCurrentUser();
        this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http
      .post<{ token: string }>(
        `${this.baseUrl}/refresh`,
        { refreshToken } 
      )
      .pipe(
        tap(res => localStorage.setItem('token', res.token)),
        map(res => res.token)
      );
  }
}