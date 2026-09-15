import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { JwtPayload } from '../interfaces/jwt-payload';

export type UserRole = 'ADMINISTRATOR' | 'SELLER' | 'CUSTOMER';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly tokenKey = 'token';

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

    try {
      const payload = token.split('.')[1];
      if (!payload) {
        return null;
      }

      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)) as JwtPayload;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const payload = this.getPayload();
    if (!payload) {
      return false;
    }

    return !payload.exp || payload.exp * 1000 > Date.now();
  }

  getRole(): UserRole | null {
    const role = this.getPayload()?.role;
    return role === 'ADMINISTRATOR' || role === 'SELLER' || role === 'CUSTOMER'
      ? role
      : null;
  }

  getDashboard(): string {
    switch (this.getRole()) {
      case 'ADMINISTRATOR':
        return '/administrator';
      case 'SELLER':
        return '/seller';
      case 'CUSTOMER':
        return '/customer';
      default:
        return '/auth/login';
    }
  }
}
