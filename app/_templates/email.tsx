import { Html, Head, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"

interface FeedbackEmailProps {
  name: string
  title: string
  feedback: string
  rating: number
  email?: string
  isTestMode?: boolean
  intendedRecipient?: string
}

export default function FeedbackEmail({
  name,
  title,
  feedback,
  rating,
  email,
  isTestMode = false,
  intendedRecipient,
}: FeedbackEmailProps) {
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
            <Heading style={styles.heading}>New Feedback Received</Heading>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.label}>
              From: <span style={styles.value}>{name}</span>
            </Text>
            {email && (
              <Text style={styles.label}>
                Email: <span style={styles.value}>{email}</span>
              </Text>
            )}
            <Text style={styles.label}>
              Title/Profession: <span style={styles.value}>{title}</span>
            </Text>
            <Text style={styles.label}>
              Rating:{" "}
              <span style={styles.stars}>
                {stars} ({rating}/5)
              </span>
            </Text>

            <Hr style={styles.hr} />

            <Heading as="h3" style={styles.feedbackHeading}>
              Feedback:
            </Heading>
            <Text style={styles.feedback}>{feedback}</Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>This email was sent from your website's feedback form.</Text>
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
    backgroundColor: "#e53e3e",
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
  label: {
    color: "#333333",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  value: {
    color: "#333333",
    fontSize: "16px",
    fontWeight: "normal",
  },
  stars: {
    color: "#f6ad55",
    fontSize: "18px",
  },
  hr: {
    borderColor: "#e2e8f0",
    margin: "20px 0",
  },
  feedbackHeading: {
    color: "#333333",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
  },
  feedback: {
    color: "#333333",
    fontSize: "16px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap" as const,
  },
  footer: {
    marginTop: "20px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "#999999",
    fontSize: "12px",
  },
}
