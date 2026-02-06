import { NextResponse } from 'next/server'
import { getBlogPosts } from '@/app/blog/utils'

export const revalidate = 3600 // ISR for the API route itself

export async function GET() {
    const posts = await getBlogPosts()

    return NextResponse.json(posts, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
        },
    })
}
