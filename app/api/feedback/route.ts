import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = "plukbluesapphire2025@gmail.com"
const INTENDED_RECIPIENT = "plukbluesapphire2025@gmail.com"
const FROM_EMAIL = "To Rona Oliveros <onboarding@resend.dev>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Request body:", body)

    const { name, email, title, feedback, rating } = body

    // Validate required fields
    if (!name || !email || !title || !feedback || !rating) {
      console.log("Missing required fields:", { name, email, title, feedback, rating })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f6f9fc;">
        <div style="background-color: #fff3cd; padding: 10px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #ffeeba;">
          <p style="margin: 0; color: #856404;"><strong>Note:</strong> This email is being sent to you for testing. In production, it would be sent to ${INTENDED_RECIPIENT}.</p>
        </div>
        
        <div style="background-color: #003b5c; border-radius: 8px 8px 0 0; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">New Feedback Received</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Title/Profession:</strong> ${title}</p>
          <p><strong>Rating:</strong> <span style="color: #f6ad55;">${stars} (${rating}/5)</span></p>
          <hr />
          <h3>Feedback:</h3>
          <p>${feedback.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <p style="color: #999999; font-size: 12px;">This email was sent from the feedback form at <a href="https://portfolio-dusky-tau-54.vercel.app">portfolio-dusky-tau-54.vercel.app</a></p>
        </div>
      </div>
    `

    

    // Send Admin Email
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Feedback from ${name} (for ${INTENDED_RECIPIENT})`,
      html: adminEmailHtml,
    })

    if (adminEmailResult.error) {
      console.error("Admin email error:", adminEmailResult.error)
      return NextResponse.json({ error: "Failed to send admin email" }, { status: 500 })
    }

   

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    })
  } catch (error) {
    console.error("Unhandled error in feedback route:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
