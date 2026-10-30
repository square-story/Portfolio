import { getBlogPosts } from '@/app/blog/utils'
import { BlogList } from './blog-list'

export const metadata = {
    title: 'Blogs',
    description: 'Writing by Mohammed Sadik.',
    alternates: { canonical: '/blog' },
}

export const revalidate = 60 // ISR: re-generate at most every 60 seconds

const NEW_WINDOW_MS = 30 * 864e5 // 30 days

export default async function BlogPage() {
    const posts = (await getBlogPosts()).sort((a, b) => +new Date(b.metadata.publishedAt) - +new Date(a.metadata.publishedAt))
    // Checked on the server so the client never compares against its own clock; ISR keeps it fresh.
    const newest = posts[0]
    const newSlug = newest && Date.now() - +new Date(newest.metadata.publishedAt) < NEW_WINDOW_MS ? newest.slug : null

    return (
        <section className="mx-auto w-full max-w-2xl">
            <div className="mb-10 flex flex-col gap-2">
                <h1 className="text-xl font-medium tracking-tight text-zinc-950 dark:text-white">blogs</h1>
                <p className="text-pretty text-[15px] text-zinc-500 dark:text-zinc-400">things i&rsquo;ve learned while building for the web.</p>
            </div>
            <BlogList posts={posts} newSlug={newSlug} />
        </section>
    )
}
