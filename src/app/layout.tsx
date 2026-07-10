import { Rajdhani, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeWatcher } from '@/components/layout/ThemeWatcher'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { EmberField } from '@/components/ui/EmberField'
import { PulseModal } from '@/components/ui/PulseModal'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'TGNSpot',
  description: 'Where gaming, tech, and culture meet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rajdhani.variable} ${inter.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="ohafua6d034eSgG2HDmoV64g6SmE0hD53hncP9aTAp0" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeWatcher />
        <EmberField />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        <PulseModal />
        <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}