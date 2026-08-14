import { Analytics } from '@vercel/analytics/next'
import { Inter, Noto_Sans_Tamil } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const tamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-tamil' })

export const metadata: Metadata = {
  title: 'Vivasaya Nanban | Smart Farming Assistant',
  description: 'A Tamil-first smart farming companion for clearer decisions in every field.',
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

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7fbf6',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ta" className="bg-background">
      <body className={`${inter.variable} ${tamil.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
