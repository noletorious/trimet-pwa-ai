import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Train, Bus, MapPin } from 'lucide-react'

export function ContentPanel() {
  return (
    <div className="w-full h-full bg-background border-r border-border flex flex-col overflow-y-auto">
      <div className="p-4 space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-4 tracking-tight">Plan a Trip</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <MapPin className="text-muted-foreground w-5 h-5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">Start location</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
                  <div className="text-sm text-foreground">Destination</div>
                </div>
              </div>
              <Button className="w-full">Get Directions</Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3">Nearby Services</h2>
          <div className="grid gap-3">
            <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-blue-500/10 p-2 rounded-full text-blue-500">
                  <Train className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">MAX Light Rail</div>
                  <div className="text-sm text-muted-foreground">Blue, Red, Green Lines</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-orange-500/10 p-2 rounded-full text-orange-500">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Frequent Service Buses</div>
                  <div className="text-sm text-muted-foreground">Within 15 minutes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
