import { Suspense } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LogOut, Settings } from 'lucide-react'

function AppContent() {
  const user = useQuery(api.users.getCurrentUser)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">Vite Starter</h1>
            <span className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full">
              v0.1.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            {user && (
              <Button variant="ghost" size="icon" aria-label="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Welcome to Your Production Starter</CardTitle>
              <CardDescription>
                A full-stack template with React, TypeScript, Tailwind, shadcn, Convex, and Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This starter includes:
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Authentication system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Theme system (light/dark/system)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Stripe payment integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Convex database setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Accessible components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Multiple color schemes</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Authentication</CardTitle>
              <CardDescription>
                User login and signup with secure sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Integrated with Convex for secure authentication.
              </p>
              <Button variant="outline" className="w-full">
                View Auth Example
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payments</CardTitle>
              <CardDescription>
                Stripe integration for checkout flows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ready to accept payments with Stripe.
              </p>
              <Button variant="outline" className="w-full">
                View Payment Flow
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Routes</CardTitle>
              <CardDescription>
                Convex mutations and queries examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                See example database operations.
              </p>
              <Button variant="outline" className="w-full">
                View API Docs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Set up environment variables</h3>
              <code className="block bg-muted p-2 rounded text-sm overflow-x-auto">
                VITE_CONVEX_URL=https://your-deployment.convex.cloud<br />
                VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
              </code>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Start the development server</h3>
              <code className="block bg-muted p-2 rounded text-sm">
                npm run dev
              </code>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Deploy to production</h3>
              <code className="block bg-muted p-2 rounded text-sm">
                npm run build
              </code>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent />
    </Suspense>
  )
}
