export type Project = {
  name: string
  description: string
  link: string
  repoLink?: string
  media: string[]
  id: string
  slug: string
  techStack: string[]
  featured: boolean
  thumbnail: string
  category: "Web App" | "Mobile App" | "Tool" | "Other"
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Blipko',
    description:
      'A Telegram chatbot that acts as a full-stack digital accountant, allowing users to track expenses and ledger balances via voice notes, natural language text, or a web dashboard.',
    link: 'https://blipko.lol/',
    repoLink: 'https://github.com/square-story/blipko',
    media: [
      '/Blipko/blipko-dashboard.mp4',
      '/Blipko/screenshot02.png',
      '/Blipko/screenshot01.png'
    ],
    id: 'project1',
    slug: 'blipko',
    techStack: ['Prisma', 'Node.js', 'WhatsApp API', 'OpenAI', 'PostgreSQL', 'Gemini', 'Tailwind CSS', 'Vercel', 'Nextjs', 'React', 'Express', 'MongoDB'],
    featured: true,
    thumbnail: '/Blipko/thumbnail.png',
    category: 'Tool'
  },
  {
    name: 'Inspecto',
    description:
      'A web application that simplifies vehicle inspections by connecting users with verified inspectors.',
    link: 'https://inspecto-flax.vercel.app/',
    repoLink: 'https://github.com/square-story/Inspecto',
    media: [
      '/Inspecto/inspecto-admin.mp4',
    ],
    id: 'project2',
    slug: 'inspecto',
    techStack: ['Stripe', 'SocketIO', 'Git', 'Docker', 'Cloudinary', 'React', 'Node.js', 'Express', 'MongoDB', 'Vercel', 'Tailwind CSS', 'JWT',],
    featured: true,
    thumbnail: '/Inspecto/thumbnail.png',
    category: 'Web App'
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2024',
    end: 'Present',
    link: 'https://sadik.is-a.dev',
    id: 'work1',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description:
      'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/square-story',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/sadikbuilds',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/sadikkp',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/square_story',
  },
]

export const EMAIL = 'sadik.build@gmail.com'
