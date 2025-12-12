import { getBlogPosts } from './blog/utils'

export const baseUrl = 'https://portfolio-next.js.vercel.app' // Update this with your actual domain

export default async function sitemap() {
    let posts = await getBlogPosts()
    let blogs = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    let routes = ['', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...blogs]
}
