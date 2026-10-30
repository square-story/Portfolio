import { Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// Loaded directly instead of via `geist/font/pixel`, which declares all five pixel variants and preloads every one.
export const geistPixel = localFont({
    src: '../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2',
    variable: '--font-geist-pixel-square',
    weight: '500',
    fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    adjustFontFallback: false,
})

export const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })
