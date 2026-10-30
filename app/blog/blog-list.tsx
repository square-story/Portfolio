'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { BlogPost } from '@/lib/zenblog'

interface BlogListProps {
    posts: BlogPost[]
    newSlug: string | null
}

// Open loop that starts bottom-left, runs clockwise and overshoots its start, like a pen circling a word.
const CIRCLE_PATH = 'M20 33 C10 32 3 26 3.5 18 C4 9 14 3.5 29 3 C44 2.5 57 8 56.5 17.5 C56 27 45 33.5 30 33.8 C24 34 17 32.5 13 30'

function NewBadge() {
    return (
        // Absolute so the row doesn't shift; hidden below md where the side margin is too narrow.
        <span className="absolute left-0 top-1/2 -ml-3 hidden -translate-x-full -translate-y-1/2 -rotate-6 select-none font-(family-name:--font-caveat) text-xl leading-none text-zinc-600 md:block dark:text-zinc-400">
            {/* Width + aspect ratio rather than insets: iOS Safari won't stretch an absolute SVG between insets. */}
            <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 60 36"
                preserveAspectRatio="none"
                className="new-circle pointer-events-none absolute -left-2 -top-1 aspect-[60/36] w-[calc(100%+1rem)]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
            >
                <path d={CIRCLE_PATH} pathLength="1" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
            </svg>
            new
        </span>
    )
}

export function BlogList({ posts, newSlug }: BlogListProps) {
    const [hoveredPost, setHoveredPost] = useState<BlogPost | null>(null)
    const shouldReduceMotion = useReducedMotion()
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const springX = useSpring(cursorX, { stiffness: 320, damping: 32, mass: 0.4 })
    const springY = useSpring(cursorY, { stiffness: 320, damping: 32, mass: 0.4 })
    const previewX = shouldReduceMotion ? cursorX : springX
    const previewY = shouldReduceMotion ? cursorY : springY
    const isVisible = hoveredPost !== null

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        cursorX.set(event.clientX + 20)
        cursorY.set(event.clientY - 100)
    }

    return (
        <div className="relative" onMouseMove={handleMouseMove}>
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-50 hidden overflow-hidden rounded-xl shadow-2xl md:block"
                style={{ x: previewX, y: previewY, opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ opacity: { duration: shouldReduceMotion ? 0 : 0.25 }, scale: { duration: shouldReduceMotion ? 0 : 0.25 } }}
            >
                <div className="relative aspect-[4/3] w-60 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    {hoveredPost?.metadata.image ? (
                        <Image
                            key={hoveredPost.slug}
                            src={hoveredPost.metadata.image}
                            alt=""
                            width={240}
                            height={180}
                            sizes="240px"
                            className="absolute inset-0 m-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                            <ImageIcon className="size-10" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
            </motion.div>

            {posts.length === 0 ? (
                <p className="py-5 text-sm text-zinc-500 dark:text-zinc-400">No posts yet.</p>
            ) : (
                <ul className="-mx-4 my-0 flex list-none flex-col gap-1 pl-0">
                    {posts.map((post) => (
                        <li key={post.slug} className="my-0 pl-0">
                            <Link
                                href={`/blog/${post.slug}`}
                                onMouseEnter={() => setHoveredPost(post)}
                                onMouseLeave={() => setHoveredPost(null)}
                                onFocus={() => setHoveredPost(post)}
                                onBlur={() => setHoveredPost(null)}
                                className="group relative flex items-center gap-3 rounded-full px-4 py-2 no-underline lowercase transition-colors duration-200 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-zinc-900/60"
                            >
                                {/* First child so screen readers hear "new" before the title. */}
                                {post.slug === newSlug && <NewBadge />}
                                <span className="min-w-0 truncate text-[15px] font-normal leading-tight text-zinc-800 dark:text-zinc-200">
                                    {post.metadata.title}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="h-px min-w-4 flex-1 bg-zinc-100 transition-colors duration-200 group-hover:bg-zinc-300 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
                                />
                                <time dateTime={post.metadata.publishedAt} className="shrink-0 text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
                                    {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
