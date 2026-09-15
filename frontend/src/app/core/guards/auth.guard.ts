import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSessionService } from '../auth/auth-session.service';

/** Blocks private routes when the browser has no valid JWT session. */
export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const session = inject(AuthSessionService);
  const router = inject(Router);

  return session.isAuthenticated() || router.createUrlTree(['/auth/login']);
};
