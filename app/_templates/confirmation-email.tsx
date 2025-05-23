import { Html, Head, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"

interface ConfirmationEmailProps {
  name: string
  feedback: string
  rating: number
  isTestMode?: boolean
  intendedRecipient?: string
}

export default function ConfirmationEmail({
  name,
  feedback,
  rating,
  isTestMode = false,
  intendedRecipient,
}: ConfirmationEmailProps) {
  // Generate stars based on rating
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating)

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {isTestMode && intendedRecipient && (
            <Section style={styles.testNotice}>
              <Text style={styles.testNoticeText}>
                <strong>Note:</strong> This email is being sent to you for testing. In production, it would be sent to{" "}
                {intendedRecipient}.
              </Text>
            </Section>
          )}

          <Section style={styles.header}>
            <Heading style={styles.heading}>Thank You for Your Feedback!</Heading>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.greeting}>Dear {name},</Text>

            <Text style={styles.paragraph}>
              We've received your feedback and wanted to thank you for taking the time to share your thoughts with us.
              Your input is incredibly valuable and helps us improve our services.
            </Text>

            <Section style={styles.feedbackBox}>
              <Text style={styles.label}>
                Your Rating:{" "}
                <span style={styles.stars}>
                  {stars} ({rating}/5)
                </span>
              </Text>

              <Text style={styles.label}>Your Feedback:</Text>
              <Text style={styles.feedbackQuote}>"{feedback}"</Text>
            </Section>

            <Text style={styles.paragraph}>
              Our team will review your comments carefully. If you've requested a response or have any questions, we'll
              get back to you as soon as possible.
            </Text>
          </Section>

          <Section style={styles.footer}>
            <Hr style={styles.hr} />
            <Text style={styles.footerText}>
              Best regards,
              <br />
              The Team at Rona Portfolio
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    margin: "0 auto",
    padding: "20px 0",
    width: "100%",
    maxWidth: "600px",
  },
  testNotice: {
    backgroundColor: "#fff3cd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #ffeeba",
  },
  testNoticeText: {
    margin: "0",
    color: "#856404",
    fontSize: "14px",
  },
  header: {
    backgroundColor: "#4299e1",
    borderRadius: "8px 8px 0 0",
    padding: "20px",
    textAlign: "center" as const,
  },
  heading: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
  },
  content: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "0 0 8px 8px",
  },
  greeting: {
    fontSize: "18px",
    marginBottom: "16px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333333",
    marginBottom: "16px",
  },
  feedbackBox: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "5px",
    margin: "20px 0",
  },
  label: {
    color: "#333333",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  stars: {
    color: "#f6ad55",
    fontSize: "18px",
  },
  feedbackQuote: {
    fontStyle: "italic",
    color: "#555555",
    fontSize: "16px",
    lineHeight: "1.5",
    padding: "0 10px",
  },
  hr: {
    borderColor: "#e2e8f0",
    margin: "20px 0",
  },
  footer: {
    marginTop: "20px",
  },
  footerText: {
    color: "#666666",
    fontSize: "14px",
    lineHeight: "1.5",
  },
}
