import HomePageClient from './home-page-client'
import { getBlogPosts } from './blog/utils'
import { WEBSITE_URL } from '@/lib/constants'

export const metadata = {
  description: 'Mohammed Sadik is a full stack engineer building products and sharing what he learns.',
  alternates: { canonical: '/' },
}

export const revalidate = 60

export default async function Page() {
  const posts = (await getBlogPosts())
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3)
    .map(({ slug, metadata }) => ({ slug, title: metadata.title, publishedAt: metadata.publishedAt }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Mohammed Sadik',
            url: WEBSITE_URL,
            image: `${WEBSITE_URL}/instagram-profile.png`,
            jobTitle: 'Full Stack Engineer',
            worksFor: { '@type': 'Organization', name: 'Creeto.ai', url: 'https://creeto.ai' },
            sameAs: [
              'https://github.com/square-story',
              'https://twitter.com/sadikbuilds',
              'https://www.linkedin.com/in/sadikkp',
              'https://www.instagram.com/square_story/',
            ],
          }),
        }}
      />
      <HomePageClient posts={posts} />
    </>
  )
}
