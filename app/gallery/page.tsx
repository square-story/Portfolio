'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { CoverFlow } from '@/components/ui/coverflow'

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

const galleryItems = [
    {
        id: 1,
        image: '/assets/workspace_setup.png',
        title: 'Desk Setup',
        subtitle: 'Where ideas turn into code',
    },
    {
        id: 2,
        image: '/assets/misty_mountains.png',
        title: 'Misty Mountains',
        subtitle: 'Chasing the quiet morning sun',
    },
    {
        id: 3,
        image: '/assets/neon_street.png',
        title: 'Neon Streets',
        subtitle: 'Midnight wanders through rain-washed lanes',
    },
    {
        id: 4,
        image: '/assets/abstract_shapes.png',
        title: 'Abstract Worlds',
        subtitle: 'Exploring geometric structures',
    },
]

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
                    <CoverFlow
                        items={galleryItems}
                        itemWidth={290}
                        itemHeight={350}
                        initialIndex={0}
                        enableScroll={true}
                        scrollThreshold={60}
                        centerGap={180}
                        stackSpacing={60}
                        enableReflection={false}
                        enableClickToSnap={true}
                    />
                </div>
            </motion.section>
        </motion.main>
    )
}
