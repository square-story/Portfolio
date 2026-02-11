'use client'

import { LogoLoop, LogoItem } from '@/components/LogoLoop'
import { TechIcon } from '@/components/tech-icon'

const techMap = [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Node.js',
    'MongoDB',
    'Express',
    'PostgreSQL',
    'Prisma',
    'Docker',
    'Git',
    'Vercel',
    'OpenAI',
    'Gemini',
    'Stripe',
    'JWT',
    'SocketIO',
    'WhatsApp API',
    'Cloudinary',
]

const logos: LogoItem[] = techMap.map((name) => ({
    node: <TechIcon name={name} />,
    title: name,
}))

export function TechLogoLoop() {
    return (
        <div className="w-full">
            <LogoLoop
                logos={logos}
                direction="left"
                speed={40}
                pauseOnHover={true}
                gap={32}
                logoHeight={48}
            />
        </div>
    )
}
