import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  const router = inject(Router);

  return next(authReq).pipe(
    catchError(error => {
      if(error.error === "TOKEN_EXPIRED") {
        authService.refreshToken().subscribe({
         next: () => token = localStorage.getItem('token'),
        });
      }
        
      console.log(authReq);
      return throwError(() => error);
    })
  );
  
};