/**
 * Application constants
 */

export const APP_NAME = 'Vite Starter'
export const APP_VERSION = '0.1.0'
export const APP_DESCRIPTION = 'Production-ready starter with React, TypeScript, Tailwind, shadcn, Convex, and Stripe'

// API timeouts
export const API_TIMEOUT = 30000 // 30 seconds
export const REQUEST_RETRY_COUNT = 3
export const REQUEST_RETRY_DELAY = 1000 // 1 second

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// File uploads
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

// Validation
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 128
export const EMAIL_MAX_LENGTH = 255
export const NAME_MIN_LENGTH = 2
export const NAME_MAX_LENGTH = 100

// URLs
export const TERMS_URL = '/terms'
export const PRIVACY_URL = '/privacy'
export const SUPPORT_URL = 'https://support.example.com'

// Feature flags
export const FEATURES = {
  ENABLE_STRIPE: true,
  ENABLE_AUTH: true,
  ENABLE_PRODUCTS: true,
} as const
