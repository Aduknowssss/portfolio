"use client"

import React, { type ReactNode } from "react"
import { useIntersectionObserver } from "@/app/hooks/use-intersection-observer"

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

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  id,
  style,
}: AnimatedSectionProps) {
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
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} ${animationClass} ${isIntersecting ? "appear" : ""}`}
      style={{ ...style, ...delayStyle }}
      id={id}
    >
      {children}
    </section>
  )
}

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  threshold?: number
  rootMargin?: string
  as?: keyof JSX.IntrinsicElements
  style?: React.CSSProperties
}

export function AnimatedElement({
  children,
  className = "",
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  as: Element = "div",
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
    <Element
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} ${animationClass} ${isIntersecting ? "appear" : ""}`}
      style={{ ...style, ...delayStyle }}
    >
      {children}
    </Element>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
  rootMargin?: string
  as?: keyof JSX.IntrinsicElements
  childClassName?: string
  style?: React.CSSProperties
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 100,
  threshold = 0.1,
  rootMargin = "0px",
  as: Element = "div",
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
      className: `stagger-item ${childClassName} ${isIntersecting ? "appear" : ""} ${child.props.className || ""}`,
      style: {
        ...child.props.style,
        "--stagger-delay": `${index * staggerDelay}ms`,
      },
    })
  })

  return (
    <Element ref={ref as React.RefObject<HTMLElement>} className={className} style={style}>
      {staggeredChildren}
    </Element>
  )
}

