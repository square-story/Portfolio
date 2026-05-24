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
  description?: string
  technologies?: string[]
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
    company: 'Creeto.ai',
    title: 'Founding Engineer',
    start: '2026-02',
    end: 'Present',
    link: 'https://creeto.ai',
    id: 'work1',
    description: '',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MongoDB'],
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
