/**
 * Common application types
 */

export interface User {
  _id: string
  email: string
  name: string
  clerkId: string
  stripeCustomerId?: string
  createdAt: number
  updatedAt: number
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  stripeProductId: string
  stripePriceId: string
  imageUrl?: string
  createdAt: number
  updatedAt: number
}

export interface Order {
  _id: string
  userId: string
  productId: string
  stripeOrderId: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  amount: number
  createdAt: number
  updatedAt: number
}

export interface Session {
  _id: string
  userId: string
  token: string
  expiresAt: number
  createdAt: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  product?: Product
}
