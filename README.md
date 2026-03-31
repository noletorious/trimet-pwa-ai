# Vite.js Production Starter

A modern, production-ready starter template built with **React**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, **Convex**, and **Stripe**.

## 🎯 Features

- ✅ **React 18** with TypeScript for type safety
- ✅ **Vite** for lightning-fast development and optimized builds
- ✅ **Tailwind CSS v4** with advanced theming
- ✅ **shadcn/ui** - Accessible, composable components
- ✅ **Convex** - Backend-as-a-service for databases and APIs
- ✅ **Stripe** - Integrated payment processing
- ✅ **Theme System** - Light/Dark/System modes with multiple color schemes
- ✅ **Authentication** - Example auth flows with secure sessions
- ✅ **Accessibility** - WCAG 2.1 compliant components
- ✅ **Form Validation** - Zod + React Hook Form integration
- ✅ **DRY Principles** - Reusable components and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
# VITE_CONVEX_URL=https://your-deployment.convex.cloud
# VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:5173
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Base shadcn components
│   ├── ThemeToggle.tsx # Theme switcher component
│   └── ColorSchemeToggle.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   └── ProductsPage.tsx
├── lib/                # Utilities and helpers
│   ├── utils.ts        # Common utilities (cn, etc.)
│   ├── stripe.ts       # Stripe integration
│   └── validations.ts  # Zod schemas
├── hooks/              # Custom React hooks
│   └── useFormState.ts
├── providers/          # Context providers
│   └── ThemeProvider.tsx
├── convex/             # Convex backend functions
│   ├── schema.ts       # Database schema
│   ├── users.ts        # User queries/mutations
│   ├── products.ts     # Product queries/mutations
│   └── orders.ts       # Order queries/mutations
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles with Tailwind

convex.json            # Convex configuration
package.json           # Dependencies
tsconfig.json          # TypeScript configuration
tailwind.config.ts     # Tailwind configuration
vite.config.ts         # Vite configuration
```

## 🎨 Theme System

The starter includes a comprehensive theme system with:

### Dark Mode Toggle
Switch between Light, Dark, and System preference modes.

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Header() {
  return <ThemeToggle />
}
```

### Color Schemes
Four built-in color schemes: Default, Blue, Purple, and Green.

```tsx
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle'
import { useTheme } from '@/providers/ThemeProvider'

export default function Settings() {
  const { colorScheme, setColorScheme } = useTheme()
  return <ColorSchemeToggle />
}
```

## 🔐 Authentication

The starter provides a foundation for user authentication with:

- Secure password handling with bcrypt
- Session-based authentication with Convex
- Example login/signup flows with validation
- Protected queries and mutations

See `src/pages/LoginPage.tsx` for implementation examples.

## 💳 Stripe Integration

Integrated Stripe payment processing with:

- Product management in Convex
- Order tracking and status management
- Checkout session creation
- Price formatting utilities

```tsx
import { createCheckoutSession, formatPrice } from '@/lib/stripe'

// Create a checkout session
const sessionId = await createCheckoutSession([
  { priceId: 'price_xxx', quantity: 1 }
])

// Format prices
console.log(formatPrice(5000)) // $50.00
```

## 🗄️ Database (Convex)

### Schema Overview

The starter includes pre-configured tables for:

- **users** - User accounts and profiles
- **products** - Product catalog with Stripe integration
- **orders** - Order history and tracking
- **sessions** - Auth session management

### API Functions

Query and mutation examples in `convex/` directory:

```tsx
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

// Fetch all products
const products = useQuery(api.products.getProducts)

// Create an order
const createOrder = useMutation(api.orders.createOrder)
await createOrder({ userId, productId, amount })
```

## 📝 Form Handling

Integrated form validation with Zod and React Hook Form:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validations'

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Your form fields */}
    </form>
  )
}
```

## ♿ Accessibility

All components follow WCAG 2.1 guidelines:

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly

## 🛠️ Customization

### Tailwind Colors

Customize colors in `src/index.css`:

```css
:root {
  --color-primary: 0 0% 9%;
  --color-accent: 0 84.2% 60.2%;
  /* ... more variables */
}
```

### Component Variants

Extend shadcn components with new variants in `src/components/ui/button.tsx`:

```tsx
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-styles',
        secondary: 'secondary-styles',
        // Add custom variants
      }
    }
  }
)
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering
- `vite` - Build tool
- `typescript` - Type safety

### Styling
- `tailwindcss` - Utility-first CSS
- `class-variance-authority` - Component variants
- `clsx` - Class merging utility
- `tailwind-merge` - Tailwind class merging

### Components & Forms
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation adapters
- `@radix-ui/*` - Headless component primitives
- `lucide-react` - Icon library

### Backend & Payments
- `convex` - Backend-as-a-service
- `convex/react` - Convex React integration
- `@stripe/react-stripe-js` - Stripe React binding
- `@stripe/stripe-js` - Stripe JavaScript SDK

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Convex
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Convex Documentation](https://docs.convex.dev)
- [Stripe Documentation](https://stripe.com/docs)

## 📄 License

MIT - Feel free to use this starter for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for production-ready applications.
