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

export type CaseStudySection = {
  id: string
  title: string
  summary: string
  details: string[]
}

export type ProjectCaseStudy = {
  eyebrow: string
  role: string
  overview: string
  problem: string
  approach: string
  flow: { title: string; description: string }[]
  sections: CaseStudySection[]
  outcome: string
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

export const CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  blipko: {
    eyebrow: 'A conversational finance companion',
    role: 'Creator',
    overview:
      'Blipko is a Telegram chatbot for keeping everyday expenses and ledger balances in one place. People can record activity with voice notes or natural language, and review it through a web dashboard.',
    problem:
      'Expense tracking often asks people to stop what they are doing, open a separate app, and enter details into forms. Blipko explores a lighter interaction: record an expense in a conversation, in the language and format that feels natural.',
    approach:
      'The product centers the chat as the input surface, with a web dashboard for a broader view. Voice and text input support Malayalam, Hindi, and English, while budgets and reports help people review their activity.',
    flow: [
      { title: 'Send a message', description: 'Record an expense by text or voice in Telegram.' },
      { title: 'Capture the details', description: 'Blipko uses natural language input to log the expense or ledger entry.' },
      { title: 'Review your activity', description: 'Check budgets, status, and reports in chat or the web dashboard.' },
    ],
    sections: [
      {
        id: 'approach',
        title: 'A familiar way to log',
        summary: 'The chat interface keeps the action close to where a user already communicates.',
        details: [
          'Text and voice notes are both supported, with Malayalam, Hindi, and English input.',
          'A web dashboard complements the chat for reviewing expenses and ledger balances.',
        ],
      },
      {
        id: 'build',
        title: 'Built around a chat workflow',
        summary: 'The project combines a messaging interface with data storage and AI services.',
        details: [
          'The listed stack includes Prisma, Node.js, PostgreSQL, OpenAI, and Gemini.',
          'The product description also includes a web dashboard and Telegram bot experience.',
        ],
      },
    ],
    outcome:
      'Expense logging can start in a quick chat interaction, while the dashboard and reports give users a place to review their activity and balances.',
  },
  inspecto: {
    eyebrow: 'Vehicle inspections, easier to arrange',
    role: 'Creator',
    overview:
      'Inspecto is a web application that connects people with verified vehicle inspectors, with booking, real-time updates, and Stripe payments in the product.',
    problem:
      'Arranging a vehicle inspection involves finding an inspector and keeping track of what happens next. Inspecto brings discovery, booking, updates, and payment into a single service flow.',
    approach:
      'The service is organized around connecting users to verified inspectors and carrying the booking through payment and live status updates.',
    flow: [
      { title: 'Choose an inspection', description: 'Find a verified inspector for the vehicle.' },
      { title: 'Book and pay', description: 'Complete the booking with Stripe payments.' },
      { title: 'Follow updates', description: 'Receive real-time updates as the inspection progresses.' },
    ],
    sections: [
      {
        id: 'approach',
        title: 'One connected booking flow',
        summary: 'Discovery and follow-up are part of the same product experience.',
        details: [
          'The service connects users with verified inspectors.',
          'Real-time updates and payments are included in the application.',
        ],
      },
      {
        id: 'build',
        title: 'The pieces behind the service',
        summary: 'The project uses a web stack with payment and live communication capabilities.',
        details: [
          'The listed stack includes React, Node.js, Express, MongoDB, Stripe, and Socket.IO.',
          'Cloudinary is also listed for media handling.',
        ],
      },
    ],
    outcome:
      'Users can move from finding an inspector to booking, payment, and progress updates within one connected service flow.',
  },
}
