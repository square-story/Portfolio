import { getBlogPosts } from './blog/utils'
import HomePageClient from './home-page-client'

export const metadata = {
  title: 'Portfolio',
  description: 'Portfolio of Mohammed Sadik',
}

export default async function Page() {
  const posts = await getBlogPosts()

  return <HomePageClient posts={posts} />
}

