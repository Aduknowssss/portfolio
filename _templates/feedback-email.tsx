import type React from "react"
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from "@react-email/components"

interface FeedbackEmailProps {
  name: string
  email: string
  title: string
  feedback: string
  rating: number
}

export const FeedbackEmail: React.FC<FeedbackEmailProps> = ({ name, email, title, feedback, rating }) => {
  // Create star rating display
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating)

  return (
    <Html>
      <Head />
      <Preview>New feedback submission from {name}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0, backgroundColor: "#f5f5f5" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#ffffff" }}>
          <Heading as="h2">New Feedback Submission</Heading>

          <Section style={{ marginBottom: "20px" }}>
            <Text style={{ margin: "5px 0" }}>
              <strong>From:</strong> {name} ({email})
            </Text>
            <Text style={{ margin: "5px 0" }}>
              <strong>Title/Profession:</strong> {title}
            </Text>
            <Text style={{ margin: "5px 0" }}>
              <strong>Rating:</strong> {stars} ({rating}/5)
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e5e5", margin: "20px 0" }} />

          <Section style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
            <Heading as="h3" style={{ margin: "0 0 10px 0" }}>
              Feedback:
            </Heading>
            <Text>{feedback}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
