import { createZenblogClient } from 'zenblog'

export const zenblog = createZenblogClient({
    blogId: process.env.NEXT_PUBLIC_ZENBLOG_BLOG_ID!,
})

export type BlogPost = {
    metadata: {
        title: string
        publishedAt: string
        summary: string
        image?: string
        author?: {
            name: string
            image?: string
            bio?: string
            twitter?: string
        }
        category?: {
            name: string
            slug: string
        }
        tags?: string[]
    }
    slug: string
    content: string
}
