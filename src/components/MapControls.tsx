import { Plus, Minus, Navigation, Layers, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MapControls() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-border bg-background">
        <Button variant="ghost" className="rounded-none h-10 w-10 p-0 border-b border-border/50 bg-background/90 backdrop-blur" aria-label="Zoom In">
          <Plus className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-none h-10 w-10 p-0 bg-background/90 backdrop-blur" aria-label="Zoom Out">
          <Minus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-border bg-background">
        <Button variant="ghost" className="rounded-none h-10 w-10 p-0 bg-background/90 backdrop-blur" aria-label="Current Location">
          <Navigation className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-border bg-background">
        <Button variant="ghost" className="rounded-none h-10 w-10 p-0 border-b border-border/50 bg-background/90 backdrop-blur" aria-label="Toggle 2D/3D">
          <Layers className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="rounded-none h-10 w-10 p-0 bg-background/90 backdrop-blur" aria-label="Reset Bearing">
          <Compass className="w-5 h-5 pointer-events-none" />
        </Button>
      </div>
    </div>
  )
}
