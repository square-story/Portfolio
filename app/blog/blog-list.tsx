'use client'
import Link from 'next/link'
import type { BlogPost } from '@/lib/zenblog'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)

    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const animate = () => {
            setSmoothPosition((prev) => ({
                x: lerp(prev.x, mousePosition.x, 0.15),
                y: lerp(prev.y, mousePosition.y, 0.15),
            }))
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    return (
        <div className="flex flex-col pt-4 relative" ref={containerRef} onMouseMove={handleMouseMove}>

            {/* Floating Image Container */}
            <div
                className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
                style={{
                    left: containerRef.current?.getBoundingClientRect().left ?? 0,
                    top: containerRef.current?.getBoundingClientRect().top ?? 0,
                    transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="relative w-60 h-45 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
                    {posts.map((post, index) => (
                        <img
                            key={post.slug}
                            src={post.metadata.image || "/placeholder.svg"}
                            alt={post.metadata.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                            style={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                scale: hoveredIndex === index ? 1 : 1.1,
                                filter: hoveredIndex === index ? "none" : "blur(10px)",
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
            </div>

            <AnimatedBackground
                enableHover
                className="bg-zinc-50 dark:bg-zinc-900/40 rounded-md"
                transition={{
                    type: 'spring',
                    bounce: 0,
                    duration: 0.2,
                }}
                onValueChange={(id) => {
                    if (id === null) {
                        setHoveredIndex(null)
                        setIsVisible(false)
                    } else {
                        const index = posts.findIndex(p => p.slug === id)
                        if (index !== -1) {
                            setHoveredIndex(index)
                            setIsVisible(true)
                        }
                    }
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
                            className="group flex flex-col w-full py-4 sm:py-5 hover:opacity-70 transition-opacity no-underline -mx-3 px-3"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 w-full">
                                <div className="inline-flex items-center gap-2">
                                    <h3 className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-150">
                                        <span className="relative">
                                            {post.metadata.title}
                                            <span
                                                className={`absolute left-0 -bottom-0.5 h-px bg-zinc-800 dark:bg-zinc-200 transition-all duration-300 ease-out ${hoveredIndex === index ? "w-full" : "w-0"}`}
                                            />
                                        </span>
                                    </h3>
                                    <ArrowUpRight
                                        className={`w-4 h-4 text-zinc-400 transition-all duration-300 ease-out ${hoveredIndex === index
                                            ? "opacity-100 translate-x-0 translate-y-0"
                                            : "opacity-0 -translate-x-2 translate-y-2"
                                            }`}
                                    />
                                </div>
                                <span className="shrink-0 text-sm text-zinc-400 dark:text-zinc-500 tabular-nums">
                                    {date}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </AnimatedBackground>
        </div>
    )
}
