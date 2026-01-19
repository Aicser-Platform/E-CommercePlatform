import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollToTopHandler } from '@/components/scroll-to-top-handler'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans',
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'AicserStore - E-Commerce Demo Platform',
  description: 'Complete online store with product catalog, shopping cart, secure checkout, and order management.',
  icons: {
    icon: [
      {
        url: '/Aicser_Store_Logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/Aicser_Store_Logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/Aicser_Store_Logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/Aicser_Store_Logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ScrollToTopHandler />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
