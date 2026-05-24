'use client'
import Link from 'next/link'
import type { BlogPost } from '@/lib/zenblog'

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    return (
        <div className="flex flex-col space-y-2 pt-4">
            {posts.map((post) => {
                const date = new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })
                return (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-baseline justify-between border-b border-zinc-100 py-3.5 dark:border-zinc-800/60 hover:opacity-70 transition-opacity"
                    >
                        <h3 className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-150">
                            {post.metadata.title}
                        </h3>
                        <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-500 font-mono pl-4">
                            {date}
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}
