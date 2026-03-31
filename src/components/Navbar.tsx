import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="h-16 border-b border-border bg-background flex flex-none items-center justify-between px-4 sm:px-6 lg:px-8 z-50">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">T</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-primary">TriMet AI Prototype</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}
