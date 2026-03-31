import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { MapControls } from './MapControls'

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [lng] = useState(-122.6587) // Portland, OR approx
  const [lat] = useState(45.5122)
  const [zoom] = useState(11)

  useEffect(() => {
    if (map.current || !mapContainer.current) return // initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Placeholder style
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false // Usually custom attribution is placed
    })

  }, [lng, lat, zoom])

  return (
    <div className="relative w-full h-full bg-slate-900">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* 
        Map controls positioning: 
        Desktop: Bottom Right
        Mobile: Top Left 
      */}
      <div className="absolute top-0 left-0 md:top-auto md:left-auto md:bottom-2 md:right-2 z-10">
        <MapControls />
      </div>
    </div>
  )
}
