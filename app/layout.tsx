import type { Metadata, Viewport } from 'next'
import './globals.css'
import { geistMono, geistPixel } from './fonts'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { WEBSITE_URL } from '@/lib/constants'
import { ThemeColorSync } from '@/components/theme-color-sync'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const DEFAULT_OG_IMAGE = '/og?title=Full%20Stack%20Engineer'

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
  title: {
    default: 'Mohammed Sadik — Full Stack Engineer',
    template: '%s | Mohammed Sadik',
  },
  description:
    'Mohammed Sadik is a full stack engineer building products, writing, and exploring photography.',
  authors: [{ name: 'Mohammed Sadik', url: WEBSITE_URL }],
  creator: 'Mohammed Sadik',
  openGraph: {
    type: 'website',
    siteName: 'Mohammed Sadik',
    locale: 'en_US',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sadikbuilds',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistPixel.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body
        className="bg-white text-zinc-900 tracking-tight antialiased dark:bg-zinc-950 dark:text-zinc-50"
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <ThemeColorSync />
          <div className="flex min-h-screen w-full flex-col">
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
