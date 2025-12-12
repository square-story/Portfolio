import { getBlogPosts } from '@/app/blog/utils'
import Link from 'next/link'

export const revalidate = 60 // ISR: re-generate at most every 60 seconds

export const metadata = {
    title: 'Blog',
    description: 'Read my thoughts on software development, design, and more.',
}

export default async function BlogPage() {
    let posts = await getBlogPosts()
    posts = posts.sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1
        }
        return 1
    })

    return (
        <section>
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">Read my blog</h1>
            <div className="flex flex-col space-y-4">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        className="flex flex-col space-y-1 mb-4"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="w-full flex flex-col">
                            <p className="tracking-tight">
                                {post.metadata.title}
                            </p>
                            <p className="text-sm">
                                {post.metadata.summary}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
