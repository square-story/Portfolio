'use client'

import React from 'react'
import { motion } from 'motion/react'
import {
    Nodejs,
    WhatsApp,
    ReactIcon,
    MongoDB,
    Express,
    Tailwind,
    NextJs,
    OpenAI,
    Gemini,
    Nextjs,
    Vercel,
    PostgreSQL,
    JWT,
    Stripe,
    SocketIO,
    Git,
    Docker,
    Cloudinary,
    Prisma
} from '@/components/icons'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export function TechIcon({ name }: { name: string }) {
    const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
        'Node.js': Nodejs,
        'WhatsApp API': WhatsApp,
        'React': ReactIcon,
        'MongoDB': MongoDB,
        'Express': Express,
        'Tailwind CSS': Tailwind,
        'Next.js': NextJs,
        'OpenAI': OpenAI,
        'Gemini': Gemini,
        'Nextjs': Nextjs,
        'Vercel': Vercel,
        'PostgreSQL': PostgreSQL,
        'JWT': JWT,
        'Stripe': Stripe,
        'SocketIO': SocketIO,
        'Git': Git,
        'Docker': Docker,
        'Cloudinary': Cloudinary,
        'Prisma': Prisma,
    }

    const IconComponent = iconMap[name]

    if (!IconComponent) {
        return (
            <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {name}
            </span>
        )
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative flex items-center justify-center p-1 cursor-pointer">
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <IconComponent className="h-5 w-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    </motion.div>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{name}</p>
            </TooltipContent>
        </Tooltip>
    )
}
