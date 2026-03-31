# Setup Guide

This guide will walk you through setting up the Vite.js production starter for your first production deployment.

## Prerequisites

- Node.js 18.0 or higher
- npm 9+ or yarn 3+
- Git
- A Convex account (https://www.convex.dev)
- A Stripe account (https://stripe.com)

## Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React and TypeScript
- Vite build tool
- Tailwind CSS v4
- shadcn/ui components
- Convex backend SDK
- Stripe payment SDK

## Step 2: Set Up Convex

### Create a Convex Project

1. Sign up at [convex.dev](https://www.convex.dev)
2. Create a new project in the Convex dashboard
3. Copy your deployment URL (looks like `https://xxx.convex.cloud`)

### Initialize Convex Locally

```bash
npx convex init
```

Follow the prompts to connect your Convex deployment to this project.

### Push Your Schema

```bash
npx convex push
```

This pushes the schema defined in `convex/schema.ts` to your Convex deployment.

### Copy Environment Variable

Add your Convex deployment URL to `.env`:

```env
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

## Step 3: Set Up Stripe

### Create Stripe API Keys

1. Log in to your Stripe dashboard (https://dashboard.stripe.com)
2. Go to Developers → API Keys
3. Copy your **Publishable Key** (starts with `pk_`)
4. Copy your **Secret Key** (starts with `sk_`) - **keep this secret!**

### Add Environment Variables

Add your Stripe keys to `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
# Secret key should NOT be exposed to frontend
# Store it in backend environment variables instead
```

### Install Stripe CLI (Optional but Recommended)

For local testing with webhooks:

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux/Windows - Download from https://stripe.com/docs/stripe-cli
```

## Step 4: Start Development

```bash
npm run dev
```

This starts:
- Local development server at `http://localhost:5173`
- Convex backend in development mode
- Hot module reloading for instant updates

## Step 5: Customize for Your App

### Update App Details

Edit `src/lib/constants.ts`:

```typescript
export const APP_NAME = 'Your App Name'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Your app description'
```

### Configure Tailwind Colors

Customize your brand colors in `src/index.css`:

```css
:root {
  --color-primary: 217 91% 60%; /* Change to your brand color */
  --color-accent: 217 91% 60%;
  /* ... more variables */
}
```

### Add Your Products

Define your products in `convex/products.ts` or use the admin panel to add them to your database.

### Implement Authentication

The starter includes an example login flow. Integrate with your auth provider:

- Clerk (recommended)
- Auth0
- NextAuth.js
- Custom JWT authentication

See `src/pages/LoginPage.tsx` for the example.

## Step 6: Build for Production

### Test Production Build Locally

```bash
npm run build
npm run preview
```

### Deploy to Production

Choose your hosting provider:

#### Vercel (Recommended for Vite)

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

#### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Step 7: Configure Environment Variables for Production

Set these environment variables in your hosting provider's dashboard:

```env
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # Use live keys in production
```

## Step 8: Security Checklist

Before deploying to production, ensure:

- [ ] Never commit `.env` files (check `.gitignore`)
- [ ] Use production keys for Stripe (pk_live_*, sk_live_*)
- [ ] Enable HTTPS only
- [ ] Set up CORS properly for your domain
- [ ] Enable rate limiting on API endpoints
- [ ] Implement proper error handling
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable database backups
- [ ] Set up monitoring and alerting
- [ ] Review authentication security
- [ ] Validate all user inputs
- [ ] Use secure password hashing for auth

## Troubleshooting

### Convex Connection Issues

```bash
# Check Convex status
npx convex status

# Re-authenticate
npx convex auth
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check
```

### Hot Module Replacement Not Working

```bash
# Restart dev server
npm run dev
```

## Next Steps

1. **Add Authentication** - Implement user login/signup
2. **Create Admin Panel** - Manage products and orders
3. **Set Up Webhooks** - Handle Stripe payment events
4. **Add Email Service** - Send transactional emails (SendGrid, etc.)
5. **Set Up Analytics** - Track user behavior
6. **Add Testing** - Unit and integration tests
7. **Performance Monitoring** - Monitor app performance

## Learn More

- [Convex Documentation](https://docs.convex.dev)
- [Stripe Integration Guide](https://stripe.com/docs/stripe-js)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vite Guide](https://vitejs.dev/guide)

## Support

For help, check:
- Project README.md
- Official documentation links above
- Community Discord/forums
- GitHub Issues (if using version control)

---

Ready to build something great! 🚀
