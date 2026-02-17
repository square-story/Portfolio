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
        <section className="mx-auto w-full max-w-3xl px-4 py-8 md:py-12 md:border-x min-h-screen">
            <div className="mb-8 space-y-4">
                <h1 className="font-semibold text-3xl md:text-4xl tracking-tight">Read my blog</h1>
                <p className="text-muted-foreground text-lg">
                    Thoughts, tutorials, and insights about design and development.
                </p>
            </div>

            <BlogList posts={posts} />
        </section>
    )
}
