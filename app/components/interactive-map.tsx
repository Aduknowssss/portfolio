"use client"
import { MapPin, Navigation } from "lucide-react"

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
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=${zoom}`

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

      {/* Overlay with location marker */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative animate-bounce-slow">
          <MapPin className="h-10 w-10 text-white drop-shadow-lg" strokeWidth={1.5} />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full text-white opacity-20 animate-ping"></div>
        </div>
      </div>

      {/* Map controls */}
      {showControls && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-primary/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-white hover:bg-primary transition-all duration-200 hover:scale-105"
            aria-label="Open in Google Maps"
          >
            <Navigation className="h-5 w-5 text-white" />
          </a>
        </div>
      )}

      {/* Map attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">Google Maps</div>
    </div>
  )
}

