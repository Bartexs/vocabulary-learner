import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
}