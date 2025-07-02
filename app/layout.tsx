import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Roman Sorokin - Full-Stack Developer",
  description:
    "Personal portfolio of Roman Sorokin, a Full-Stack Developer passionate about backend systems, data architecture, and building purposeful tools.",
  keywords: ["Roman Sorokin", "Full-Stack Developer", "Backend Developer", "Software Development", "Portfolio"],
  authors: [{ name: "Roman Sorokin" }],
  creator: "Roman Sorokin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roman-sorokin.vercel.app",
    title: "Roman Sorokin - Full-Stack Developer",
    description:
      "Personal portfolio of Roman Sorokin, a Full-Stack Developer passionate about backend systems, data architecture, and building purposeful tools.",
    siteName: "Roman Sorokin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Sorokin - Full-Stack Developer",
    description:
      "Personal portfolio of Roman Sorokin, a Full-Stack Developer passionate about backend systems, data architecture, and building purposeful tools.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
