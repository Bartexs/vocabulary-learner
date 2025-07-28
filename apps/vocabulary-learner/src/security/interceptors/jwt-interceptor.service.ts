import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  const router = inject(Router);

  return next(authReq).pipe(
    catchError(error => {
      if (error.status != 0) {
        localStorage.removeItem('token'); // optional
        router.navigate(['/login']); // or /register
      }

      return throwError(() => error);
    })
  );
};