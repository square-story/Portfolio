import { getBlogPosts } from '@/app/blog/utils'
import { BlogList } from './blog-list'
import Link from 'next/link'

export const revalidate = 60 // ISR: re-generate at most every 60 seconds

export default async function BlogPage() {
    let posts = await getBlogPosts()
    posts = posts.sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1
        }
        return 1
    })

    return (
        <section className="mx-auto w-full max-w-2xl px-4 py-8 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-2">Writing</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Thoughts, tutorials, and insights about design and engineering.
                </p>
            </div>

            <BlogList posts={posts} />
        </section>
    )
}
