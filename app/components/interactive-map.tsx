"use client"
import { Navigation } from "lucide-react"

interface InteractiveMapProps {
  address: string
  className?: string
  height?: string
  zoom?: number
  showControls?: boolean
}

export function InteractiveMap({
  address = "18th floor Exquadra Tower, 1 Jade Drive Ortigas Center, Pasig, Metro Manila",
  className = "",
  height = "500px",
  zoom = 16,
  showControls = true,
}: InteractiveMapProps) {
  // Encode the address for the Google Maps URL
  const encodedAddress = encodeURIComponent(address)
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg border border-white/20 ${className}`}
      style={{ height }}
    >
      {/* Real Google Map iframe */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
        className="absolute inset-0"
      ></iframe>

      {/* Map controls */}
      {showControls && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-primary/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-white hover:bg-primary transition-all duration-200 hover:scale-105"
            aria-label="Open in Google Maps"
          >
            <Navigation className="h-5 w-5 text-white" />
          </a>
        </div>
      )}
    </div>
  )
}

