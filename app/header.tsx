'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-21 h-7" />
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
      defaultValue={theme}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            key={theme.id}
            className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50 cursor-pointer"
            type="button"
            aria-label={`Switch to ${theme.label} theme`}
            data-id={theme.id}
          >
            {theme.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="mb-12 flex items-center justify-between">
      <nav className="flex gap-4 text-sm font-normal text-zinc-500 dark:text-zinc-400">
        <Link 
          href="/" 
          className={`hover:text-black dark:hover:text-white transition-colors ${pathname === '/' ? 'text-black dark:text-white font-medium' : ''}`}
        >
          home
        </Link>
        <Link 
          href="/gallery" 
          className={`hover:text-black dark:hover:text-white transition-colors ${pathname === '/gallery' ? 'text-black dark:text-white font-medium' : ''}`}
        >
          gallery
        </Link>
        <Link 
          href="/blog" 
          className={`hover:text-black dark:hover:text-white transition-colors ${pathname.startsWith('/blog') ? 'text-black dark:text-white font-medium' : ''}`}
        >
          writing
        </Link>
      </nav>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  )
}
