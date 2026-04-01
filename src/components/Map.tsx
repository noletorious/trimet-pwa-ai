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
    if (map.current || !mapContainer.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.trimet.org/styles/trimet/style.json',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false
    })

    // No need to remove map.current in dev mode, we just let it persist
  }, [])

  return (
    <div id="map-container" className="relative flex-1 w-full h-full bg-slate-900 min-h-[300px]">
      <div ref={mapContainer} className="absolute inset-0" style={{ width: '100%', height: '100%', position: 'absolute' }} />
      {/* 
        Map controls positioning: 
        Desktop: Bottom Right
        Mobile: Top Left 
      */}
      <div className="absolute bottom-2 right-2 z-10">
        <MapControls />
      </div>
    </div>
  )
}
