"use client"

// Store credentials
const CREDENTIALS = {
  email: "plukbluesapphire2025@gmail.com",
  password: "PlukOliveros17@",
}

// Login function
export function login(email: string, password: string): { success: boolean; message: string } {
  // Check credentials
  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
    // Set cookie in client-side
    document.cookie = "admin-auth=authenticated; path=/; max-age=7200; SameSite=Strict"
    return { success: true, message: "Login successful" }
  }

  return { success: false, message: "Invalid email or password" }
}

// Check if user is logged in (client-side)
export function isLoggedIn(): boolean {
  return document.cookie.includes("admin-auth=authenticated")
}

// Logout function
export function logout(): void {
  document.cookie = "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

// Get current user email
export function getCurrentUser(): string | null {
  return isLoggedIn() ? CREDENTIALS.email : null
}
