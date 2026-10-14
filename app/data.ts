export type Project = {
  name: string
  description: string
  link: string
  repoLink?: string
  id: string
  slug: string
  techStack: string[]
  featured: boolean
  thumbnail: string
  category: "Web App" | "Mobile App" | "Tool" | "Other"
}

export const PROJECTS: Project[] = [
  {
    name: 'Blipko',
    description:
      'A Telegram chatbot that acts as a full-stack digital accountant, allowing users to track expenses and ledger balances via voice notes, natural language text, or a web dashboard.',
    link: 'https://blipko.lol/',
    repoLink: 'https://github.com/square-story/blipko',
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
    id: 'project2',
    slug: 'inspecto',
    techStack: ['Stripe', 'SocketIO', 'Git', 'Docker', 'Cloudinary', 'React', 'Node.js', 'Express', 'MongoDB', 'Vercel', 'Tailwind CSS', 'JWT',],
    featured: true,
    thumbnail: '/Inspecto/thumbnail.png',
    category: 'Web App'
  },
]
