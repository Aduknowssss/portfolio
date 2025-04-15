"use client"

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  type ReactNode,
  type ElementType,
} from "react"

// Implement the useIntersectionObserver hook directly in this file
function useIntersectionObserver({ threshold = 0.1, rootMargin = "0px", triggerOnce = false } = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && triggerOnce && ref.current) {
          observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isIntersecting }
}

type AnimationType = "fade-in" | "slide-in-left" | "slide-in-right" | "zoom-in" | "stagger" | "none"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  threshold?: number
  rootMargin?: string
  id?: string
  style?: React.CSSProperties
}

export const AnimatedSection = forwardRef<any, AnimatedSectionProps>(
  ({ id, className, style, animation = "fade-in", delay = 0, children }, ref) => {
    const sectionRef = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Expose resetAnimation method to parent components
    useImperativeHandle(ref, () => ({
      resetAnimation: () => {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 50)
      },
    }))

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setHasAnimated(true)
          }
        },
        { threshold: 0.1 },
      )

      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current)
        }
      }
    }, [hasAnimated])

    const animationClass = animation === "none" ? "" : animation
    const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {}

    return (
      <section
        id={id}
        ref={sectionRef}
        className={`${className || ""} ${animationClass} ${isVisible ? "appear" : ""}`}
        style={{ ...style, ...delayStyle }}
      >
        {children}
      </section>
    )
  },
)

AnimatedSection.displayName = "AnimatedSection"

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  threshold?: number
  rootMargin?: string
  as?: ElementType
  style?: React.CSSProperties
}

export function AnimatedElement({
  children,
  className = "",
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  as: Component = "div",
  style,
}: AnimatedElementProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  const getAnimationClass = () => {
    if (animation === "none") return ""
    return animation
  }

  const animationClass = getAnimationClass()
  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} ${animationClass} ${isIntersecting ? "appear" : ""}`}
      style={{ ...style, ...delayStyle }}
    >
      {children}
    </Component>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
  rootMargin?: string
  as?: ElementType
  childClassName?: string
  style?: React.CSSProperties
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 100,
  threshold = 0.1,
  rootMargin = "0px",
  as: Component = "div",
  childClassName = "",
  style,
}: StaggerContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  // Clone children and add stagger classes
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    return React.cloneElement(child as React.ReactElement, {
      className: `stagger-item ${childClassName} ${isIntersecting ? "appear" : ""} ${(child as React.ReactElement).props.className || ""}`,
      style: {
        ...(child as React.ReactElement).props.style,
        "--stagger-delay": `${index * staggerDelay}ms`,
      },
    })
  })

  return (
    <Component ref={ref as React.RefObject<HTMLElement>} className={className} style={style}>
      {staggeredChildren}
    </Component>
  )
}
