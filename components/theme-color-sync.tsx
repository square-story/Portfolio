'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

/** Keep Safari's browser chrome in step with the active site theme. */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    const themeColors = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColors.length === 0) return

    const color = resolvedTheme === 'dark' ? '#09090b' : '#ffffff'
    themeColors.forEach((themeColor) => {
      themeColor.content = color
    })
  }, [resolvedTheme])

  return null
}
