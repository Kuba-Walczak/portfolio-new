import React from "react"
import type { Metadata } from 'next'
import { Inter, Geist_Mono, WDXL_Lubrifont_SC, Space_Grotesk, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/contexts/AppContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/Header'
import './globals.css'
import Footer from "@/components/Footer"

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const wdxlLubrifontSC = WDXL_Lubrifont_SC({ subsets: ["latin"], weight: ["400"], variable: "--font-wdxl-lubrifont-sc" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Welcome to my portfolio. I create beautiful and functional digital experiences that help businesses grow and users succeed.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${wdxlLubrifontSC.variable} ${spaceGrotesk.variable} ${manrope.variable}`}>
        <AppProvider>
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
          <Analytics />
        </AppProvider>
      </body>
    </html>
  )
}
