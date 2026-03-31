import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query('products').collect()
  },
})

export const getProductById = query({
  args: { productId: v.id('products') },
  handler: async (ctx, args) => {
    return ctx.db.get(args.productId)
  },
})

export const getProductByStripeId = query({
  args: { stripeProductId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query('products')
      .withIndex('by_stripeProductId', (q) =>
        q.eq('stripeProductId', args.stripeProductId)
      )
      .first()
  },
})

export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    stripeProductId: v.string(),
    stripePriceId: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const productId = await ctx.db.insert('products', {
      name: args.name,
      description: args.description,
      price: args.price,
      stripeProductId: args.stripeProductId,
      stripePriceId: args.stripePriceId,
      imageUrl: args.imageUrl,
      createdAt: now,
      updatedAt: now,
    })
    return productId
  },
})

export const updateProduct = mutation({
  args: {
    productId: v.id('products'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { productId, ...updates } = args
    await ctx.db.patch(productId, {
      ...updates,
      updatedAt: Date.now(),
    })
    return ctx.db.get(productId)
  },
})

export const deleteProduct = mutation({
  args: { productId: v.id('products') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.productId)
    return { success: true }
  },
})
