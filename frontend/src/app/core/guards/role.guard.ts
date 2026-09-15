import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { AuthSessionService, UserRole } from '../auth/auth-session.service';

/** Use route data.roles to restrict a feature to one or more business roles. */
export const roleGuard: CanActivateFn = (route) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const session = inject(AuthSessionService);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as UserRole[] | undefined;
  const role = session.getRole();

  if (session.isAuthenticated() && role && allowedRoles?.includes(role)) {
    return true;
  }

  return router.createUrlTree([session.getDashboard()]);
};
