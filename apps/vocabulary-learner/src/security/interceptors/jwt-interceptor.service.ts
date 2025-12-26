import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

let isRefreshing = false;
const refreshToken$ = new BehaviorSubject<string | null>(null);

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(error => {

      if (error.status === 401 && error.error?.error === 'TOKEN_EXPIRED') {

        if (isRefreshing) {
          return refreshToken$.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token =>
              next(req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              }))
            )
          );
        }

        isRefreshing = true;
        refreshToken$.next(null);

        return authService.refreshToken().pipe(
          switchMap(newToken => {
            isRefreshing = false;
            refreshToken$.next(newToken);

            return next(req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            }));
          }),
          catchError(err => {
            isRefreshing = false;
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
