import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GeistPixelSquare } from 'geist/font/pixel'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { WEBSITE_URL } from '@/lib/constants'
import { ThemeColorSync } from '@/components/theme-color-sync'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'SADIK - Personal website',
    template: '%s | SADIK',
  },
  description:
    'Mohammed Sadik is a full stack engineer building products, writing, and exploring photography.',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${GeistPixelSquare.variable} bg-white text-zinc-900 tracking-tight antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <ThemeColorSync />
          <div className="flex min-h-screen w-full flex-col font-(family-name:--font-geist-pixel-square)">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <a
                href="#main-content"
                className="sr-only absolute left-4 top-2 z-50 rounded-md bg-background px-3 py-2 text-sm text-foreground shadow focus:not-sr-only focus:outline-2 focus:outline-offset-2"
              >
                Skip to content
              </a>
              <Header />
              <main id="main-content" tabIndex={-1} className="focus-visible:outline-2 focus-visible:outline-offset-4">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
