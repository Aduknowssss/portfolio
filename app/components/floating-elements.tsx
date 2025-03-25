"use client"

import type React from "react"
import { useIntersectionObserver } from "@/app/hooks/use-intersection-observer"
import { useEffect, useState } from "react"

interface FloatingElementProps {
  className?: string
  style?: React.CSSProperties
  size?: "sm" | "md" | "lg"
  color?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
  duration?: number
  shape?: "circle" | "square" | "triangle"
  opacity?: number
  blur?: number
}

export function FloatingElement({
  className = "",
  style = {},
  size = "md",
  color = "var(--primary-light)",
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 6,
  shape = "circle",
  opacity = 0.2,
  blur = 0,
}: FloatingElementProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16",
  }

  const getShapeClass = () => {
    switch (shape) {
      case "square":
        return "rounded-md"
      case "triangle":
        return "clip-path-triangle"
      case "circle":
      default:
        return "rounded-full"
    }
  }

  const animationStyle = {
    position: "absolute",
    top,
    left,
    right,
    bottom,
    backgroundColor: color,
    opacity: isIntersecting ? opacity : 0,
    filter: blur ? `blur(${blur}px)` : "none",
    // Use CSS variables to avoid mixing shorthand and non-shorthand properties
    "--float-duration": `${duration}s`,
    "--float-delay": `${delay}s`,
    animationName: isIntersecting ? "float" : "none",
    animationDuration: "var(--float-duration)",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDelay: "var(--float-delay)",
    transition: "opacity 0.5s ease",
    ...style,
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${sizeMap[size]} ${getShapeClass()} ${className}`}
      style={animationStyle as React.CSSProperties}
    />
  )
}

interface FloatingBackgroundProps {
  className?: string
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
  shapes?: Array<"circle" | "square" | "triangle">
  minOpacity?: number
  maxOpacity?: number
  minBlur?: number
  maxBlur?: number
}

export function FloatingBackground({
  className = "",
  count = 10,
  colors = ["var(--primary)", "var(--primary-light)", "var(--secondary)"],
  minSize = 10,
  maxSize = 50,
  minDuration = 5,
  maxDuration = 15,
  shapes = ["circle", "circle", "square"],
  minOpacity = 0.05,
  maxOpacity = 0.15,
  minBlur = 0,
  maxBlur = 5,
}: FloatingBackgroundProps) {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render on the client to avoid hydration mismatches with random values
  if (!isClient) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
  }

  const elements = Array.from({ length: count }, (_, i) => {
    const size = Math.floor(Math.random() * (maxSize - minSize) + minSize)
    const top = `${Math.random() * 100}%`
    const left = `${Math.random() * 100}%`
    const color = colors[Math.floor(Math.random() * colors.length)]
    const duration = Math.random() * (maxDuration - minDuration) + minDuration
    const delay = Math.random() * 5
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity
    const blur = Math.random() * (maxBlur - minBlur) + minBlur

    return (
      <div
        key={i}
        className={`absolute ${shape === "circle" ? "rounded-full" : shape === "square" ? "rounded-md" : "clip-path-triangle"}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top,
          left,
          backgroundColor: color,
          opacity,
          filter: `blur(${blur}px)`,
          // Use separate animation properties instead of the shorthand
          animationName: "float",
          animationDuration: `${duration}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>{elements}</div>
}

