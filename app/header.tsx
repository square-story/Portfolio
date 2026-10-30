'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useWebHaptics } from 'web-haptics/react'
import { useSound } from '@/hooks/use-sound'
import { clickSoftSound } from '@/lib/click-soft'

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
  const { trigger } = useWebHaptics()
  const [playClick] = useSound(clickSoftSound)

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
      {THEMES_OPTIONS.map((option) => {
        return (
          <button
            key={option.id}
            className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50 cursor-pointer"
            type="button"
            aria-label={`Switch to ${option.label} theme`}
            aria-pressed={theme === option.id}
            data-id={option.id}
            onMouseEnter={() => trigger('selection')}
            onClick={() => {
              trigger('medium')
              playClick()
            }}
          >
            {option.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

export function Header() {
  const pathname = usePathname()
  const { trigger } = useWebHaptics()
  const [playClick] = useSound(clickSoftSound)

  return (
    <header className="mb-12 flex items-center justify-between">
      <nav aria-label="Primary navigation" className="flex gap-4 text-sm font-normal text-zinc-500 dark:text-zinc-400">
        <Link 
          href="/" 
          className={`rounded-sm transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-white ${pathname === '/' ? 'font-medium text-black dark:text-white' : ''}`}
          aria-current={pathname === '/' ? 'page' : undefined}
          onMouseEnter={() => trigger('selection')}
          onClick={() => { trigger('medium'); playClick(); }}
        >
          home
        </Link>
        <Link
          href="/work"
          className={`rounded-sm transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-white ${pathname.startsWith('/work') ? 'font-medium text-black dark:text-white' : ''}`}
          aria-current={pathname.startsWith('/work') ? 'page' : undefined}
          onMouseEnter={() => trigger('selection')}
          onClick={() => { trigger('medium'); playClick(); }}
        >
          work
        </Link>
        <Link
          href="/blog"
          className={`rounded-sm transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-white ${pathname.startsWith('/blog') ? 'font-medium text-black dark:text-white' : ''}`}
          aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          onMouseEnter={() => trigger('selection')}
          onClick={() => { trigger('medium'); playClick(); }}
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
