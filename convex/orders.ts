import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getOrders = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query('orders').collect()
  },
})

export const getOrdersByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return ctx.db
      .query('orders')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect()
  },
})

export const getOrderById = query({
  args: { orderId: v.id('orders') },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId)
    if (!order) return null

    const user = await ctx.db.get(order.userId)
    const product = await ctx.db.get(order.productId)

    return {
      ...order,
      user,
      product,
    }
  },
})

export const createOrder = mutation({
  args: {
    userId: v.id('users'),
    productId: v.id('products'),
    stripeOrderId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const orderId = await ctx.db.insert('orders', {
      userId: args.userId,
      productId: args.productId,
      stripeOrderId: args.stripeOrderId,
      status: 'pending',
      amount: args.amount,
      createdAt: now,
      updatedAt: now,
    })
    return orderId
  },
})

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id('orders'),
    status: v.union(
      v.literal('pending'),
      v.literal('completed'),
      v.literal('failed'),
      v.literal('cancelled')
    ),
  },
  handler: async (ctx, args) => {
    const { orderId, status } = args
    await ctx.db.patch(orderId, {
      status,
      updatedAt: Date.now(),
    })
    return ctx.db.get(orderId)
  },
})

export const deleteOrder = mutation({
  args: { orderId: v.id('orders') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.orderId)
    return { success: true }
  },
})
