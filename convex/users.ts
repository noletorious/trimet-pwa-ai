import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // This is a placeholder - implement based on your auth method
    // For example, get from context/session
    return null
  },
})

export const getUserById = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return ctx.db.get(args.userId)
  },
})

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()
  },
})

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const userId = await ctx.db.insert('users', {
      email: args.email,
      name: args.name,
      clerkId: args.clerkId,
      createdAt: now,
      updatedAt: now,
    })
    return userId
  },
})

export const updateUser = mutation({
  args: {
    userId: v.id('users'),
    name: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    })
    return ctx.db.get(userId)
  },
})

export const deleteUser = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId)
    return { success: true }
  },
})
