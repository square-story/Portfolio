'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { FocusEvent, MouseEvent } from 'react'
import { useState } from 'react'
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { BlogPost } from '@/lib/zenblog'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const springX = useSpring(cursorX, { stiffness: 320, damping: 32, mass: 0.4 })
    const springY = useSpring(cursorY, { stiffness: 320, damping: 32, mass: 0.4 })
    const previewX = shouldReduceMotion ? cursorX : springX
    const previewY = shouldReduceMotion ? cursorY : springY
    const hoveredPost = hoveredIndex === null ? null : posts[hoveredIndex]

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        cursorX.set(event.clientX + 20)
        cursorY.set(event.clientY - 100)
    }

    const showPost = (slug: string) => {
        const index = posts.findIndex((post) => post.slug === slug)
        if (index !== -1) {
            setHoveredIndex(index)
            setIsVisible(true)
        }
    }

    const hidePost = () => {
        setHoveredIndex(null)
        setIsVisible(false)
    }

    const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
        const index = posts.findIndex((post) => post.slug === event.currentTarget.dataset.id)
        if (index !== -1) setHoveredIndex(index)
    }

    return (
        <div className="relative flex flex-col pt-4" onMouseMove={handleMouseMove}>
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
                <AnimatedBackground
                    enableHover
                    className="rounded-md bg-zinc-50 dark:bg-zinc-900/40"
                    transition={{ type: 'spring', bounce: 0, duration: shouldReduceMotion ? 0 : 0.2 }}
                    onValueChange={(id) => {
                        if (id === null) hidePost()
                        else showPost(id)
                    }}
                >
                    {posts.map((post, index) => {
                        const date = new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })

                        return (
                            <Link
                                key={post.slug}
                                data-id={post.slug}
                                href={`/blog/${post.slug}`}
                                onFocus={handleFocus}
                                onBlur={hidePost}
                                className="group -mx-3 flex w-full flex-col px-3 py-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 sm:py-5"
                            >
                                <div className="flex w-full flex-col justify-between gap-1 sm:flex-row sm:items-start">
                                    <div className="inline-flex items-center gap-2">
                                        <h2 className="text-[15px] font-medium text-zinc-800 transition-colors duration-150 group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white">
                                            <span className="relative">
                                                {post.metadata.title}
                                                <span className={`absolute -bottom-0.5 left-0 h-px bg-zinc-800 transition-[width] duration-300 ease-out dark:bg-zinc-200 ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
                                            </span>
                                        </h2>
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className={`size-4 text-zinc-400 transition-[opacity,transform] duration-300 ease-out ${hoveredIndex === index ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-2 translate-y-2 opacity-0'}`}
                                        />
                                    </div>
                                    <time dateTime={post.metadata.publishedAt} className="shrink-0 text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
                                        {date}
                                    </time>
                                </div>
                            </Link>
                        )
                    })}
                </AnimatedBackground>
            )}
        </div>
    )
}
