import { Suspense } from 'react'

import { Navbar } from '@/components/Navbar'
import { ContentPanel } from '@/components/ContentPanel'
import { Map } from '@/components/Map'
import { AIChatModal } from '@/components/AIChatModal'

function AppContent() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Navbar />

      <main className="flex-1 relative flex flex-col md:block overflow-hidden">
        {/* Map Container */}
        <div className="relative h-[50vh] min-h-[300px] max-h-[500px] shrink-0 md:absolute md:inset-0 md:h-auto md:min-h-0 md:max-h-none z-0">
          <Map />
        </div>

        {/* Content Panel Container */}
        <div className="flex-1 relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:shadow-xl md:absolute md:left-0 md:top-0 md:h-full md:w-[400px] bg-background flex flex-col">
          <ContentPanel />
        </div>

        {/* AI Action Button & Modal */}
        <AIChatModal />

      </main>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
      <AppContent />
    </Suspense>
  )
}
