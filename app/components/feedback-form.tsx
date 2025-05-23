"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function FeedbackForm({ onSubmitFeedback }: { onSubmitFeedback?: Function }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(4)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setSuccessMessage("")

    if (!name || !email || !title || !feedback || rating === 0) {
      setError("Please complete all fields and select a rating.")
      return
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    try {
      console.log("Submitting form data:", { name, email, title, feedback, rating })

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, title, feedback, rating }),
      })

      console.log("Response status:", res.status)

      let data
      try {
        data = await res.json()
        console.log("Response data:", data)
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError)
        throw new Error("Invalid response from server")
      }

      if (!res.ok) {
        throw new Error(data.error || data.details || "Failed to send feedback")
      }

      // Call the callback if provided
      if (onSubmitFeedback) {
        onSubmitFeedback({ name, email, title, feedback, rating })
      }

      setSuccess(true)
      setSuccessMessage(data.message || "Thank you for your feedback! We've sent you a confirmation email.")
      setName("")
      setEmail("")
      setTitle("")
      setFeedback("")
      setRating(4)
    } catch (err: any) {
      console.error("Form submission error:", err)
      setError(err.message || "Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/1 backdrop-blur-md p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-white mb-2">We'd Love Your Feedback!</h3>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400 text-sm">{successMessage}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-white mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">Title / Profession</label>
        <input
          type="text"
          placeholder="e.g., Web Developer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">Your Feedback</label>
        <textarea
          placeholder="Write your thoughts here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="w-full rounded-lg px-4 py-2 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-1">Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              fill={rating >= i ? "#facc15" : "none"}
              className={`cursor-pointer transition-transform duration-150 hover:scale-125 ${
                rating >= i ? "text-yellow-400" : "text-white-500"
              }`}
              onClick={() => setRating(i)}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 text-white font-semibold text-lg hover:bg-red-400 transition-colors duration-200"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  )
}
