import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}))
        const secret = body?.secret || req.headers.get('x-secret')
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
        }

        const { path, tag } = body

        if (path) {
            // revalidate a specific path (e.g. '/blog/my-post')
            await revalidatePath(path)
            return NextResponse.json({ revalidated: true, path })
        }

        if (tag) {
            // revalidate all content that used this tag when fetching
            await revalidateTag(tag, process.env.NEXT_PUBLIC_ZENBLOG_BLOG_ID!)
            return NextResponse.json({ revalidated: true, tag })
        }

        // fallback: revalidate blog index
        await revalidatePath('/blog')
        return NextResponse.json({ revalidated: true, fallback: '/blog' })
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({ ok: true })
}
