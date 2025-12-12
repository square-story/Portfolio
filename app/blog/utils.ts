import { zenblog, BlogPost } from '@/lib/zenblog'

export async function getBlogPosts(): Promise<BlogPost[]> {
    const { data: posts } = await zenblog.posts.list({ limit: 100 })
    return posts.map((post: any) => ({
        metadata: {
            title: post.title,
            publishedAt: post.published_at,
            summary: post.excerpt || '',
            image: post.cover_image,
            author: post.authors?.[0] ? {
                name: post.authors[0].name,
                image: post.authors[0].image_url,
                bio: post.authors[0].bio,
                twitter: post.authors[0].twitter_url,
            } : undefined,
            category: post.category ? {
                name: post.category.name,
                slug: post.category.slug,
            } : undefined,
            tags: post.tags?.map((t: any) => t.name) || [],
        },
        slug: post.slug,
        content: '',
    }))
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
    try {
        const { data: post } = await zenblog.posts.get({ slug })
        return {
            metadata: {
                title: post.title,
                publishedAt: post.published_at,
                summary: post.excerpt || '',
                image: post.cover_image,
                author: post.authors?.[0] ? {
                    name: post.authors[0].name,
                    image: post.authors[0].image_url,
                    bio: post.authors[0].bio,
                    twitter: post.authors[0].twitter_url,
                } : undefined,
                category: post.category ? {
                    name: post.category.name,
                    slug: post.category.slug,
                } : undefined,
                tags: post.tags?.map((t: any) => t.name) || [],
            },
            slug: post.slug,
            content: post.html_content || '',
        }
    } catch {
        return undefined
    }
}

export function formatDate(date: string, includeRelative = false) {
    let currentDate = new Date()
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    let targetDate = new Date(date)

    let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
    let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
    let daysAgo = currentDate.getDate() - targetDate.getDate()

    let formattedDate = ''

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`
    } else {
        formattedDate = 'Today'
    }

    let fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    if (!includeRelative) {
        return fullDate
    }

    return `${fullDate} (${formattedDate})`
}
