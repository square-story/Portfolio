'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Cursor } from '@/components/motion-primitives/cursor'
import { Magnetic } from '@/components/motion-primitives/magnetic'
import { TextEffect } from '@/components/ui/text-effect'

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
                <h1 className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/" className="font-medium text-black dark:text-white">
                            MOHAMMED SADIK
                        </Link>
                        <TextEffect
                            as="p"
                            preset="fade"
                            per="char"
                            className="text-zinc-600 dark:text-zinc-500"
                            delay={0.5}
                        >
                            Full Stack Engineer
                        </TextEffect>
                    </div>
                </h1>


                <div className="space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
                    <div>
                        I am currently working as a Founding Engineer at{' '}
                        <span className="relative inline-block">
                            <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                                <div className="w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-3 translate-x-12 translate-y-8">
                                    <img src="https://gcdnb.pbrd.co/images/2vvR1aCkAsMh.png"
                                        alt="Creeto.ai" className="w-full h-24 object-cover rounded-lg" />
                                    <div>
                                        <p className="text-sm font-bold text-black dark:text-white">Creeto.ai</p>
                                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Agent that converts any knowledge into informative videos</p>
                                    </div>
                                </div>
                            </Cursor>
                            <a
                                href="https://creeto.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-black dark:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 align-baseline"
                            >
                                <img
                                    src="https://creeto.ai/favicon.ico"
                                    alt="Creeto.ai favicon"
                                    className="w-3.5 h-3.5 rounded-sm"
                                    onError={(e) => { e.currentTarget.src = "https://gcdnb.pbrd.co/images/-Qwlye0gvxgT.png"; }}
                                />
                                Creeto.ai
                            </a>
                        </span>, currently working on the agentic workflow, managing the backend architecture and ensuring the scalable solution is shipped.. Previously, I created{' '}
                        <span className="relative inline-block">
                            <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                                <div className="w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-3 translate-x-12 translate-y-8">
                                    <img src="https://gcdnb.pbrd.co/images/IK7plQ1wzJYb.png"
                                        alt="Blipko" className="w-full h-24 object-cover rounded-lg" />
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
                                <img
                                    src="https://blipko.lol/favicon.ico"
                                    alt="Blipko favicon"
                                    className="w-3.5 h-3.5 rounded-sm"
                                    onError={(e) => { e.currentTarget.src = "https://www.google.com/s2/favicons?domain=blipko.lol&sz=64"; }}
                                />
                                Blipko
                            </a>
                        </span> to help users track balances and expenses via telegram, and worked on{' '}
                        <span className="relative inline-block">
                            <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                                <div className="w-64 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl flex flex-col gap-3 translate-x-12 translate-y-8">
                                    <img src="https://gcdnb.pbrd.co/images/bKASBCR9gBDc.png"
                                        alt="Inspecto" className="w-full h-24 object-cover rounded-lg" />
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
                                <img
                                    src="https://inspecto-flax.vercel.app/favicon.ico"
                                    alt="Inspecto favicon"
                                    className="w-3.5 h-3.5 rounded-sm"
                                    onError={(e) => { e.currentTarget.src = "https://www.google.com/s2/favicons?domain=inspecto-flax.vercel.app&sz=64"; }}
                                />
                                Inspecto
                            </a>
                        </span> to streamline vehicle checks.
                    </div>

                    <div>
                        Apart from my professional life, I am passionate about photography, open-source development, and exploring new technologies.
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">View Projects</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a href="https://github.com/square-story" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors block">
                                GitHub
                            </a>
                        </Magnetic>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Follow Updates</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a href="https://twitter.com/sadikbuilds" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors block">
                                Twitter
                            </a>
                        </Magnetic>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Connect</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a href="https://www.linkedin.com/in/sadikkp" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors block">
                                LinkedIn
                            </a>
                        </Magnetic>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Say Hello</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a href="mailto:sadik.build@gmail.com" className="hover:text-black dark:hover:text-white transition-colors block">
                                Email
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="text-sm text-zinc-500 dark:text-zinc-500 font-normal leading-relaxed">
                    Explore my{' '}
                    <Link href="/gallery" className="font-semibold text-black dark:text-white hover:opacity-75 transition-opacity">
                        interactive gallery
                    </Link>{' '}
                    to view the full reflection CoverFlow showcase of my photography.
                </div>
            </motion.section>
        </motion.main>
    )
}
