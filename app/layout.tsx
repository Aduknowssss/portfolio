import type React from "react";
import "./globals.css";
import type { Metadata } from "next/types";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/react"; // correct: use react
import { SpeedInsights } from "@vercel/speed-insights/next"; 

export const metadata: Metadata = {
  title: "Rona Oliveros | Prulife UK Agent",
  description: "Professional insurance solutions for individuals and families",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights /> 
      </body>
    </html>
  );
}
