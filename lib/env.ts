/**
 * Environment variables configuration and validation
 * This file centralizes all environment variable access and provides type safety
 */

// Public environment variables (exposed to the browser)
export const publicEnv = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || 'juniorcarrillo',
} as const

// Private environment variables (server-side only)
export const privateEnv = {
  DISQUS_API_KEY: process.env.DISQUS_API_KEY,
  DISQUS_API_SECRET: process.env.DISQUS_API_SECRET,
  DISQUS_ACCESS_TOKEN: process.env.DISQUS_ACCESS_TOKEN,
} as const

// Vercel-specific environment variables
export const vercelEnv = {
  IS_VERCEL: process.env.VERCEL === '1',
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_ENV: process.env.VERCEL_ENV as 'development' | 'preview' | 'production' | undefined,
  VERCEL_REGION: process.env.VERCEL_REGION,
} as const

/**
 * Get the base URL for the application
 * Handles different environments (local, preview, production)
 */
export function getBaseUrl(): string {
  // If we have a public site URL, use it
  if (publicEnv.SITE_URL && publicEnv.SITE_URL !== 'http://localhost:3000') {
    return publicEnv.SITE_URL
  }

  // If we're on Vercel, use the Vercel URL
  if (vercelEnv.VERCEL_URL) {
    return `https://${vercelEnv.VERCEL_URL}`
  }

  // Fallback to localhost for development
  return 'http://localhost:3000'
}

/**
 * Get the environment-specific site URL
 */
export function getSiteUrl(): string {
  return getBaseUrl()
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return vercelEnv.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
}

/**
 * Check if we're in development environment
 */
export function isDevelopment(): boolean {
  return vercelEnv.VERCEL_ENV === 'development' || process.env.NODE_ENV === 'development'
}

/**
 * Check if we're in preview environment (Vercel preview deployments)
 */
export function isPreview(): boolean {
  return vercelEnv.VERCEL_ENV === 'preview'
}

/**
 * Validate required environment variables
 * Call this function at application startup to ensure all required variables are set
 */
export function validateEnvironmentVariables(): void {
  const errors: string[] = []

  // Validate required public variables
  if (!publicEnv.DISQUS_SHORTNAME) {
    errors.push('NEXT_PUBLIC_DISQUS_SHORTNAME is required for blog comments')
  }

  // Log warnings for optional variables
  if (!privateEnv.DISQUS_API_KEY && isProduction()) {
    console.warn('DISQUS_API_KEY is not set. Advanced Disqus features will be disabled.')
  }

  // Throw error if any required variables are missing
  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`)
  }
}

/**
 * Environment configuration object for easy access
 */
export const env = {
  ...publicEnv,
  ...privateEnv,
  ...vercelEnv,
  getBaseUrl,
  getSiteUrl,
  isProduction,
  isDevelopment,
  isPreview,
  validateEnvironmentVariables,
} as const

// Type definitions for environment variables
export type PublicEnv = typeof publicEnv
export type PrivateEnv = typeof privateEnv
export type VercelEnv = typeof vercelEnv
export type Env = typeof env