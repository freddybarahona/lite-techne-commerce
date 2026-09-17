/** Claims used by the storefront to route an authenticated user by role. */
export interface JwtPayload {
  id: number
  email: string
  role: number | string 
  name: string
  exp: number
  iat: number
}
