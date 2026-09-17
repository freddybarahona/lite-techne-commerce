import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { AuthSessionService, UserRole } from '../auth/auth-session.service';

/** 
 *  usa route data.roles para restringir una feature a una o a mas roles del negocio
*/
export const roleGuard: CanActivateFn = (route) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const session = inject(AuthSessionService);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as UserRole[] | undefined; //un verificador de rol correcto 
  const role = session.getRole();
  if (session.isAuthenticated() && role && allowedRoles?.includes(role)) {
    return true;
  }

  return router.createUrlTree([session.getDashboard()]);
};
