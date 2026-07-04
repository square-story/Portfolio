'use client'
import { motion } from 'motion/react'
import TossDeckCarousel from '@/components/pixel-perfect/toss-deck-carousel'
import { GALLERY_ITEMS } from '@/app/data'

const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
    duration: 0.4,
}

export default function GalleryPage() {
    return (
        <motion.main
            className="space-y-8"
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
        >
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="w-full flex justify-center py-6"
            >
                <div className="min-h-105 w-full relative bg-transparent flex items-center justify-center">
                    <TossDeckCarousel items={GALLERY_ITEMS} />
                </div>
            </motion.section>
        </motion.main>
    )
}
