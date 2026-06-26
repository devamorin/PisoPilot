/**
 * JWT utility functions for token validation and decoding
 * Note: JWT verification happens on the server. This is for client-side validation only.
 */

export interface JWTPayload {
  id: number
  name: string
  email: string
  iat: number
  exp: number
}

/**
 * Decode JWT token without verification (for client-side use)
 * Note: This is for basic payload extraction. Verification happens on the server.
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    return null
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token)
  if (!payload) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}

/**
 * Validate token format and expiration
 */
export function isValidToken(token: string): boolean {
  if (!token) return false

  // Check basic JWT format (3 parts separated by dots)
  const parts = token.split('.')
  if (parts.length !== 3) return false

  // Check if expired
  if (isTokenExpired(token)) return false

  return true
}
