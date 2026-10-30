import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts, getPost } from '@/app/blog/utils'
import parse, { Element, domToReact, type DOMNode } from 'html-react-parser'
import { CodeBlock } from '@/components/ui/code-block'
import { WEBSITE_URL } from '@/lib/constants'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
    const posts = await getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export const revalidate = 3600 // ISR: re-generate individual post pages at most every hour

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const post = await getPost(params.slug)
    if (!post) {
        return
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
        author,
    } = post.metadata
    const ogImage = image
        ? image
        : `${WEBSITE_URL}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${WEBSITE_URL}/blog/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: author?.twitter ? `@${author.twitter.split('/').pop()}` : undefined,
        },
    }
}

export default async function Blog(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <section className="mx-auto max-w-2xl py-8">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image: post.metadata.image
                            ? new URL(post.metadata.image, WEBSITE_URL).href
                            : new URL(`/og?title=${encodeURIComponent(post.metadata.title)}`, WEBSITE_URL).href,
                        url: `${WEBSITE_URL}/blog/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: post.metadata.author?.name || 'Sadik',
                        },
                    }),
                }}
            />

            <Link href="/blog" className="mb-7 inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-white">
                <ArrowLeft aria-hidden="true" className="size-3.5" /> All writing
            </Link>

            {/* Header Section */}
            <div className="mb-8 text-center">
                {post.metadata.category && (
                    <div className="mb-4 flex justify-center">
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            {post.metadata.category.name}
                        </span>
                    </div>
                )}

                <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
                    {post.metadata.title}
                </h1>

                <div className="flex items-center justify-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <time dateTime={post.metadata.publishedAt}>
                        {formatDate(post.metadata.publishedAt)}
                    </time>
                    {post.metadata.author && (
                        <>
                            <span>•</span>
                            <div className="flex items-center space-x-2">
                                {post.metadata.author.image && (
                                    <Image
                                        src={post.metadata.author.image}
                                        alt={post.metadata.author.name}
                                        width={24}
                                        height={24}
                                        className="h-6 w-6 rounded-full"
                                    />
                                )}
                                <span>{post.metadata.author.name}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>



            {/* Hero Image */}
            {post.metadata.image && (
                <div className="aspect-auto w-full overflow-hidden rounded-xl">
                    <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        width={1200}
                        height={630}
                        className="h-auto w-full object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <article className="prose prose-zinc dark:prose-invert prose-a:no-underline max-w-none">
                {parse(post.content, {
                    replace: (domNode) => {
                        if (domNode instanceof Element && domNode.name === 'pre') {
                            const { children, attribs } = domNode as Element & { children: DOMNode[] }
                            return (
                                <CodeBlock className={attribs.class}>
                                    {domToReact(children)}
                                </CodeBlock>
                            )
                        }
                    },
                })}
            </article>

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2">
                    {post.metadata.tags.map(tag => (
                        <span key={tag} className="text-sm text-zinc-500 dark:text-zinc-400">#{tag}</span>
                    ))}
                </div>
            )}

            {/* Author Footer */}
            {post.metadata.author && (
                <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        {post.metadata.author.image && (
                            <Image
                                src={post.metadata.author.image}
                                alt={post.metadata.author.name}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-full border border-zinc-200 dark:border-zinc-800"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {post.metadata.author.name}
                            </h3>
                            {post.metadata.author.bio && (
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {post.metadata.author.bio}
                                </p>
                            )}
                            {post.metadata.author.twitter && (
                                <a
                                    href={post.metadata.author.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block text-sm font-medium hover:opacity-75 transition-opacity"
                                >
                                    Follow on X
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
