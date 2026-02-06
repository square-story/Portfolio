'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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

export function TechIcon({ name }: { name: string }) {
    const [isHovered, setIsHovered] = useState(false)

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
        <div
            className="relative flex items-center justify-center p-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
            >
                <IconComponent className="h-5 w-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
            </motion.div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900 z-50"
                    >
                        {name}
                        {/* Little arrow */}
                        <div className="absolute -bottom-1 left-1/2 -ml-1 h-2 w-2 rotate-45 bg-zinc-900 dark:bg-zinc-100" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
