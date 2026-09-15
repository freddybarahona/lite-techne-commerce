/** Claims used by the storefront to route an authenticated user by role. */
export interface JwtPayload {
  exp?: number;
  role?: string;
}
