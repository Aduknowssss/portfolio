This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Feedback Form with Resend Email

This project implements a feedback form that sends submissions via email using Resend.

## Current Setup

The current implementation is configured for testing:

- Uses Resend's default domain (`onboarding@resend.dev`) as the sender
- Sends all emails to the verified testing account (`aduknowssss@gmail.com`)
- Includes notices in the emails indicating the intended recipients

## Moving to Production

To move to production and send emails to actual recipients:

1. **Verify a domain with Resend**:

   - Go to [resend.com/domains](https://resend.com/domains)
   - Add and verify your domain
   - Follow Resend's instructions for adding DNS records

2. **Update the API route**:
   - Open `app/api/feedback/route.ts`
   - Change `FROM_EMAIL` to use your verified domain
   - Change `ADMIN_EMAIL` to the actual recipient (`plukbluesapphire2025@gmail.com`)
   - Update the confirmation email to send to the actual user's email
   - Remove the testing notices and `[TEST]` prefixes

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key (required)
  \`\`\`

Let's also clean up the API route to make it more concise:
