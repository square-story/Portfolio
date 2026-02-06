import { getBlogPosts } from './blog/utils'
import HomePageClient from './home-page-client'

export const revalidate = 3600 // ISR: re-generate home page at most every hour

export const metadata = {
  title: 'Portfolio',
  description: 'Portfolio of Mohammed Sadik',
}

export default async function Page() {
  const posts = await getBlogPosts()
  const githubData = await getGithubData('square-story')

  return <HomePageClient posts={posts} githubData={githubData} />
}

async function getGithubData(username: string) {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    )
    const json = await res.json()
    return json.contributions || []
  } catch (e) {
    return []
  }
}

