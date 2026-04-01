import { Suspense } from 'react'

import { Navbar } from '@/components/Navbar'
import { ContentPanel } from '@/components/ContentPanel'
import { Map } from '@/components/Map'

function AppContent() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background tracking-tight">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Map Layer: Fixed background on mobile, full screen on desktop */}
        <div className="absolute inset-0 z-0 h-[50vh] min-h-[300px] max-h-[500px] md:h-full md:min-h-0 md:max-h-none">
          <Map />
        </div>

        {/* Content Layer: Scrollable overlay on mobile, positioned container on desktop */}
        <div className="absolute inset-0 z-10 overflow-y-auto md:overflow-visible">
          {/* Mobile spacer: allows map to be visible initially */}
          <div className="h-[50vh] min-h-[300px] max-h-[500px] md:hidden pointer-events-none" />

          {/* Content Panel Wrapper/Container */}
          <div className="relative md:absolute md:left-6 md:top-4 md:h-[calc(100%-1rem)] md:w-[400px] w-full ml-0 bg-[#084c8d] md:bg-transparent flex flex-col rounded-t-2xl overflow-hidden border border-gray-200 shadow-none md:shadow-md">
            <ContentPanel />
          </div>
        </div>
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
