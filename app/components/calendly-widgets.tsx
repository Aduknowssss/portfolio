"use client"

import { useEffect } from "react"

interface CalendlyWidgetProps {
  url: string
  height?: string
  className?: string
}

export function CalendlyWidget({ url, height = "650px", className = "" }: CalendlyWidgetProps) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    // Load the Calendly script
    const loadCalendlyScript = () => {
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }

    const cleanup = loadCalendlyScript()

    return cleanup
  }, [])

  return (
    <div className={`calendly-inline-widget ${className}`} data-url={url} style={{ minWidth: "320px", height }}></div>
  )
}
