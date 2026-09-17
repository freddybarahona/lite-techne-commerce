import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSessionService } from '../auth/auth-session.service';
import { JwtPayload } from '../interfaces/jwt-payload';
import { jwtDecode} from 'jwt-decode';
/** 
 * bloquea rutas privada cuando el buscador no tiene un jwt valido
*/
export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const session = inject(AuthSessionService)
  const router = inject(Router);
  
  const token = session.getToken()
  
  if(!token){
    return router.createUrlTree(['auth/login'])
  }

  const payload = jwtDecode<JwtPayload>
  return session.isAuthenticated() || router.createUrlTree(['/auth/login']);
};
