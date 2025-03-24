"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    } else {
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }

    // Update body background and text colors
    if (theme === "dark" || (!storedTheme && prefersDark)) {
      document.body.style.backgroundColor = "var(--background)"
      document.body.style.color = "var(--text-light)"
    } else {
      document.body.style.backgroundColor = "var(--background)"
      document.body.style.color = "var(--text-color)"
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  return <ThemeProviderContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => useContext(ThemeProviderContext)

