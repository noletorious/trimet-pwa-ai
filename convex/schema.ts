import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId'])
    .index('by_stripeCustomerId', ['stripeCustomerId']),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    stripeProductId: v.string(),
    stripePriceId: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_stripeProductId', ['stripeProductId'])
    .index('by_stripePriceId', ['stripePriceId']),

  orders: defineTable({
    userId: v.id('users'),
    productId: v.id('products'),
    stripeOrderId: v.string(),
    status: v.union(
      v.literal('pending'),
      v.literal('completed'),
      v.literal('failed'),
      v.literal('cancelled')
    ),
    amount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_userId', ['userId'])
    .index('by_stripeOrderId', ['stripeOrderId'])
    .index('by_status', ['status']),

  sessions: defineTable({
    userId: v.id('users'),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index('by_token', ['token'])
    .index('by_userId', ['userId']),
})
