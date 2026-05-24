'use client'
import { WEBSITE_URL } from '@/lib/constants'
import { TextLoop } from '@/components/ui/text-loop'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <a href={WEBSITE_URL} target="_blank">
          <TextLoop className="text-xs text-zinc-400 dark:text-zinc-500">
            <span>© {new Date().getFullYear()} SADIK.</span>
            <span>Built with Next.js and Motion-Primitives.</span>
          </TextLoop>
        </a>
      </div>
    </footer>
  )
}
