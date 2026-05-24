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
        <section className="mx-auto w-full max-w-2xl">
            <BlogList posts={posts} />
        </section>
    )
}
