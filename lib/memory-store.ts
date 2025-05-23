// In-memory storage for feedback/testimonials

export interface Feedback {
  id: string
  name: string
  title: string
  feedback: string
  rating: number
  approved: boolean
  createdAt: number
}

class MemoryStore {
  private feedback: Map<string, Feedback> = new Map()
  private subscribers: Set<(feedback: Feedback[]) => void> = new Set()

  constructor() {
    // Initialize with some sample data
    this.initializeSampleData()
  }

  private initializeSampleData() {
    const sampleData: Feedback[] = [
      {
        id: "1",
        name: "Maria Santos",
        title: "Business Owner",
        feedback:
          "Rona helped me secure my family's future with a comprehensive life insurance plan. Her expertise and dedication are unmatched!",
        rating: 5,
        approved: true,
        createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      },
      {
        id: "2",
        name: "Juan Dela Cruz",
        title: "School Teacher",
        feedback:
          "I was overwhelmed by insurance options until I met Rona. She simplified everything and found the perfect plan for my retirement needs.",
        rating: 5,
        approved: true,
        createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
      },
      {
        id: "3",
        name: "Anna Reyes",
        title: "Healthcare Professional",
        feedback:
          "Professional, knowledgeable, and genuinely cares about her clients. Rona has been managing my family's insurance needs for years.",
        rating: 4,
        approved: true,
        createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      },
    ]

    sampleData.forEach((item) => {
      this.feedback.set(item.id, item)
    })
  }

  // Get all feedback
  getAllFeedback(): Feedback[] {
    return Array.from(this.feedback.values()).sort((a, b) => b.createdAt - a.createdAt)
  }

  // Get approved feedback only
  getApprovedFeedback(): Feedback[] {
    return this.getAllFeedback().filter((item) => item.approved)
  }

  // Add new feedback
  addFeedback(data: Omit<Feedback, "id" | "approved" | "createdAt">): Feedback {
    const id = Math.random().toString(36).substring(2, 15)
    const newFeedback: Feedback = {
      ...data,
      id,
      approved: false, // New feedback starts as unapproved
      createdAt: Date.now(),
    }

    this.feedback.set(id, newFeedback)
    this.notifySubscribers()

    return newFeedback
  }

  // Update feedback
  updateFeedback(id: string, data: Partial<Feedback>): Feedback | null {
    const existingFeedback = this.feedback.get(id)

    if (!existingFeedback) {
      return null
    }

    const updatedFeedback = {
      ...existingFeedback,
      ...data,
    }

    this.feedback.set(id, updatedFeedback)
    this.notifySubscribers()

    return updatedFeedback
  }

  // Delete feedback
  deleteFeedback(id: string): boolean {
    const result = this.feedback.delete(id)

    if (result) {
      this.notifySubscribers()
    }

    return result
  }

  // Approve feedback
  approveFeedback(id: string): Feedback | null {
    return this.updateFeedback(id, { approved: true })
  }

  // Subscribe to changes
  subscribe(callback: (feedback: Feedback[]) => void): () => void {
    this.subscribers.add(callback)

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
    }
  }

  // Notify all subscribers of changes
  private notifySubscribers(): void {
    const allFeedback = this.getAllFeedback()

    this.subscribers.forEach((callback) => {
      callback(allFeedback)
    })
  }

  updateFeedbackApproval(id: string, approved: boolean): boolean {
    const existingFeedback = this.feedback.get(id)

    if (!existingFeedback) {
      return false
    }

    const updatedFeedback = {
      ...existingFeedback,
      approved: approved,
    }

    this.feedback.set(id, updatedFeedback)
    this.notifySubscribers()

    return true
  }
}

// Create a singleton instance
export const memoryStore = new MemoryStore()

export const getAllFeedback = () => memoryStore.getAllFeedback()
export const addFeedback = (data: Omit<Feedback, "id" | "approved" | "createdAt">) => memoryStore.addFeedback(data)
export const updateFeedbackApproval = (id: string, approved: boolean) =>
  memoryStore.updateFeedbackApproval(id, approved)
export const deleteFeedback = (id: string) => memoryStore.deleteFeedback(id)
