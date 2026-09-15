import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionService } from '../auth/auth-session.service';

/** Adds the current JWT to API requests; it is a no-op during server rendering. */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthSessionService).getToken();

  return next(
    token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request,
  );
};
