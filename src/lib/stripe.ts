import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    )
  }
  return stripePromise
}

/**
 * Create a checkout session
 * @param items Array of items with price ID and quantity
 */
export const createCheckoutSession = async (items: Array<{
  priceId: string
  quantity: number
}>) => {
  const stripe = await getStripe()
  if (!stripe) throw new Error('Stripe failed to load')

  // This should call your backend to create a checkout session
  // Example:
  // const response = await fetch('/api/checkout', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ items }),
  // })
  // const { sessionId } = await response.json()
  // const result = await stripe.redirectToCheckout({ sessionId })

  return null
}

/**
 * Format price in cents to currency format
 */
export const formatPrice = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100)
}
