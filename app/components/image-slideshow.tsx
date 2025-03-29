"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSlideShowProps {
  images: string[]
  interval?: number
  className?: string
  showNumbers?: boolean
  showCaptions?: boolean
  captions?: string[]
  showControls?: boolean
  showIndicators?: boolean
  height?: string
  width?: string
  effect?: "fade" | "slide" | "zoom" | "flip" | "cube" | "kenburn" | "morph" | "glitch"
  theme?: "light" | "dark" | "glass" | "neon" | "minimal"
}

export function ImageSlideShow({
  images,
  interval = 3000,
  className = "",
  showNumbers = false,
  showCaptions = false,
  captions = [],
  showControls = true,
  showIndicators = true,
  height = "100%",
  width = "100%",
  effect = "kenburn",
  theme = "glass",
}: ImageSlideShowProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const slideContainerRef = useRef<HTMLDivElement>(null)

  // Handle slide transition
  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setPrevIndex(slideIndex)
    setSlideIndex(index)
    setTimeout(() => setIsAnimating(false), 800) // Match with animation duration
  }

  const nextSlide = () => {
    const newIndex = (slideIndex + 1) % images.length
    goToSlide(newIndex)
    resetProgress()
  }

  const prevSlide = () => {
    const newIndex = slideIndex === 0 ? images.length - 1 : slideIndex - 1
    goToSlide(newIndex)
    resetProgress()
  }

  // Progress bar
  const resetProgress = () => {
    setProgress(0)
    if (progressRef.current) {
      clearInterval(progressRef.current)
    }

    if (!isPaused) {
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (interval || 3000)) * 10
          return newProgress > 100 ? 100 : newProgress
        })
      }, 10)
    }
  }

  // Auto-advance slides
  useEffect(() => {
    if (images.length <= 1 || isPaused) return

    resetProgress()

    timerRef.current = setTimeout(() => {
      nextSlide()
    }, interval)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [slideIndex, isPaused, interval, images.length])

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setIsHovering(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovering) return

      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isHovering, slideIndex])

  // Get animation class based on effect
  const getAnimationClass = () => {
    switch (effect) {
      case "slide":
        return "slide-effect"
      case "zoom":
        return "zoom-effect"
      case "flip":
        return "flip-effect"
      case "cube":
        return "cube-effect"
      case "kenburn":
        return "kenburn-effect"
      case "morph":
        return "morph-effect"
      case "glitch":
        return "glitch-effect"
      case "fade":
      default:
        return "fade-effect"
    }
  }

  // Get theme class
  const getThemeClass = () => {
    switch (theme) {
      case "dark":
        return "theme-dark"
      case "glass":
        return "theme-glass"
      case "neon":
        return "theme-neon"
      case "minimal":
        return "theme-minimal"
      case "light":
      default:
        return "theme-light"
    }
  }

  // Get direction for slide animation
  const getDirection = (current: number, previous: number) => {
    if (current === 0 && previous === images.length - 1) return "next"
    if (current === images.length - 1 && previous === 0) return "prev"
    return current > previous ? "next" : "prev"
  }

  const direction = getDirection(slideIndex, prevIndex)

  if (images.length === 0) {
    return null
  }

  return (
    <div
      className={`slideshow-container ${getThemeClass()} ${className}`}
      style={{ height, width }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={slideContainerRef}
    >
      {/* 3D perspective wrapper */}
      <div className="perspective-wrapper">
        {/* Slides */}
        <div className={`slides-wrapper ${getAnimationClass()}`}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${getAnimationClass()} ${slideIndex === index ? "active" : ""} ${
                prevIndex === index ? "previous" : ""
              } direction-${direction}`}
              style={{
                zIndex: slideIndex === index ? 2 : prevIndex === index ? 1 : 0,
                transform: effect === "slide" ? `translateX(${(index - slideIndex) * 100}%)` : "none",
              }}
            >
              {showNumbers && (
                <div className="numbertext">
                  {index + 1} / {images.length}
                </div>
              )}

              <div className="image-container">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="slide-image"
                  priority={index === 0}
                />

                {/* Overlay effects */}
                <div className="slide-overlay"></div>
                <div className="slide-glow"></div>
                <div className="slide-particles"></div>
              </div>

              {showCaptions && captions[index] && <div className="caption">{captions[index]}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Navigation controls */}
      {showControls && images.length > 1 && (
        <>
          <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous slide">
            <div className="btn-background"></div>
            <ChevronLeft className="nav-icon" />
          </button>
          <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next slide">
            <div className="btn-background"></div>
            <ChevronRight className="nav-icon" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${slideIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="indicator-inner"></span>
            </button>
          ))}
        </div>
      )}

      {/* Frame decoration */}
      <div className="slideshow-frame">
        <div className="frame-corner top-left"></div>
        <div className="frame-corner top-right"></div>
        <div className="frame-corner bottom-left"></div>
        <div className="frame-corner bottom-right"></div>
      </div>
    </div>
  )
}

