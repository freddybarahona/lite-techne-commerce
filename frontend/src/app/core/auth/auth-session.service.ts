import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtPayload } from '../interfaces/jwt-payload';
import { jwtDecode } from 'jwt-decode';

export type UserRole = 'ADMINISTRATOR' | 'SELLER' | 'CUSTOMER';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly tokenKey = 'token';
  saveToken(token: string){
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(this.tokenKey, token)
    }
  }

  deleteToken(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem(this.tokenKey)
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(this.tokenKey);
  }

  getPayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try{
      return jwtDecode<JwtPayload>(token)
    }catch{
      return null
    }
  }

  isAuthenticated(): boolean {
    const payload = this.getPayload();
    if (!payload) {
      return false;
    }

    return !payload.exp // ¿no tiene expiración? → considerado válido
    || payload.exp * 1000 > Date.now(); // ¿o aún no expiró? → válido
    //valida el tiempo de expiracion si existe o si es mayor que el tiempo actual
  }

  getRole(): UserRole | null {
    const role = this.getPayload()?.role;
    switch(Number(role)){
      case 1:
        return 'ADMINISTRATOR'
      case 2:
        return 'SELLER'
      case 3:
        return 'CUSTOMER'
      default: 
        return null
    }
  }

  getDashboard(): string {
    switch (this.getRole()) {
      case 'ADMINISTRATOR':
        return '/administrator'
      case 'SELLER':
        return '/seller'
      case 'CUSTOMER':
        return '/customer'
      default:
        return '/auth/login'
    }
  }
}
