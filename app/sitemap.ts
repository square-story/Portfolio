import { WEBSITE_URL } from '@/lib/constants'
import { getBlogPosts } from './blog/utils'
import { PROJECTS } from './data'

export default async function sitemap() {
    let posts = await getBlogPosts()
    let blogs = posts.map((post) => ({
        url: `${WEBSITE_URL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    let routes = ['', '/blog', '/work', ...PROJECTS.map((p) => `/work/${p.slug}`)].map((route) => ({
        url: `${WEBSITE_URL}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...blogs]
}
