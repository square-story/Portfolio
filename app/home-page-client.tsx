'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Cursor } from '@/components/motion-primitives/cursor'

const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
    duration: 0.4,
}

export default function HomePageClient() {
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
                className="space-y-6"
            >
                <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    MOHAMMED SADIK
                </h1>


                <div className="space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
                    <p>
                        I am currently working as a Founding Engineer at{' '}
                        <span className="relative inline-block">
                            <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                                <div className="w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-3 translate-x-12 translate-y-8">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200" alt="Creeto.ai" className="w-full h-24 object-cover rounded-lg" />
                                    <div>
                                        <p className="text-sm font-bold text-black dark:text-white">Creeto.ai</p>
                                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Visual tools to bridge the gap between design and engineering, making web development highly interactive.</p>
                                    </div>
                                </div>
                            </Cursor>
                            <a
                                href="https://creeto.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-black dark:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 align-baseline"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Creeto.ai
                            </a>
                        </span>, a platform building visual tools to bridge the gap between design and engineering. We're on a mission to make web development highly interactive and intuitive. Previously, I created{' '}
                        <span className="relative inline-block">
                            <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                                <div className="w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-3 translate-x-12 translate-y-8">
                                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=200" alt="Blipko" className="w-full h-24 object-cover rounded-lg" />
                                    <div>
                                        <p className="text-sm font-bold text-black dark:text-white">Blipko</p>
                                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">A Telegram bot to track balances and expenses directly from your chat.</p>
                                    </div>
                                </div>
                            </Cursor>
                            <a
                                href="https://blipko.lol/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-black dark:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 align-baseline"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                Blipko
                            </a>
                        </span> to help users track balances and expenses via telegram, and worked on{' '}
                        <span className="relative inline-block">
                            <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                                <div className="w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-3 translate-x-12 translate-y-8">
                                    <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400&h=200" alt="Inspecto" className="w-full h-24 object-cover rounded-lg" />
                                    <div>
                                        <p className="text-sm font-bold text-black dark:text-white">Inspecto</p>
                                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Streamlined vehicle check app for better maintenance and logging.</p>
                                    </div>
                                </div>
                            </Cursor>
                            <a
                                href="https://inspecto-flax.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-black dark:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 align-baseline"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                Inspecto
                            </a>
                        </span> to streamline vehicle checks.
                    </p>

                    <p>
                        Apart from my professional life, I am passionate about photography, open-source development, and exploring new technologies.
                    </p>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-2 translate-x-12 translate-y-8 w-fit">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="font-bold text-sm text-black dark:text-white">GitHub</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Last 30 Days</span>
                                </div>
                                <div className="relative w-40 h-30 overflow-hidden rounded-md border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
                                    <img
                                        src="https://ghchart.rshah.org/square-story"
                                        alt="GitHub Contributions"
                                        className="absolute -right-1.25  h-28.75 max-w-none dark:opacity-80"
                                    />
                                </div>
                            </div>
                        </Cursor>
                        <a href="https://github.com/square-story" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                            ↗ GitHub
                        </a>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Follow Updates</div>
                        </Cursor>
                        <a href="https://twitter.com/sadikbuilds" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                            ↗ Twitter
                        </a>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Connect</div>
                        </Cursor>
                        <a href="https://www.linkedin.com/in/sadikkp" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                            ↗ LinkedIn
                        </a>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Say Hello</div>
                        </Cursor>
                        <a href="mailto:sadik.build@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                            ↗ Email
                        </a>
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <p className="text-sm text-zinc-500 dark:text-zinc-500 font-normal leading-relaxed">
                    Explore my{' '}
                    <Link href="/gallery" className="font-semibold text-black dark:text-white hover:opacity-75 transition-opacity">
                        interactive gallery
                    </Link>{' '}
                    to view the full reflection CoverFlow showcase of my photography.
                </p>
            </motion.section>
        </motion.main>
    )
}
