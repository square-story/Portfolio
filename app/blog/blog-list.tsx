'use client'
import Link from 'next/link'
import type { BlogPost } from '@/lib/zenblog'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    return (
        <div className="flex flex-col pt-4">
            <AnimatedBackground 
                enableHover 
                className="bg-zinc-50 dark:bg-zinc-900/40 rounded-md" 
                transition={{
                    type: 'spring',
                    bounce: 0,
                    duration: 0.2,
                }}
            >
                {posts.map((post) => {
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
                            className="group flex flex-col w-full py-3 sm:py-3.5 hover:opacity-70 transition-opacity no-underline -mx-3 px-3"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full">
                                <h3 className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-150">
                                    {post.metadata.title}
                                </h3>
                                <span className="shrink-0 text-sm text-zinc-400 dark:text-zinc-500">
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
