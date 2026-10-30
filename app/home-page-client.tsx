'use client'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Cursor } from '@/components/motion-primitives/cursor'
import { Magnetic } from '@/components/motion-primitives/magnetic'
import { DiaText } from '@/components/ui/dia-text'
import { useWebHaptics } from 'web-haptics/react'
import { useSound } from '@/hooks/use-sound'
import { clickSoftSound } from '@/lib/click-soft'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/r-hover-card'
import { useState, type ReactNode } from 'react'
import { PROJECTS } from '@/app/data'

const blipko = PROJECTS.find((p) => p.slug === 'blipko')!
const inspecto = PROJECTS.find((p) => p.slug === 'inspecto')!

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

type ProjectLinkProps = {
    href: string
    name: string
    role: string
    tagline: string
    favicon: ReactNode
    highlights: string[]
    stack?: string[]
    repo?: string
}

function ProjectLink({ href, name, role, tagline, favicon, highlights, stack = [], repo }: ProjectLinkProps) {
    const { trigger } = useWebHaptics()
    const [playClick] = useSound(clickSoftSound)

    return (
        <HoverCard openDelay={100}>
            <HoverCardTrigger asChild>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-black dark:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 align-baseline"
                    onMouseEnter={() => trigger('selection')}
                    onClick={() => { trigger('medium'); playClick(); }}
                >
                    {favicon}
                    {name}
                </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 [&_img]:size-5">
                            {favicon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-black dark:text-white">{name}</p>
                            <p className="truncate text-xs text-zinc-500">{new URL(href).hostname} · {role}</p>
                        </div>
                    </div>
                    <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{tagline}</p>
                    <ul className="space-y-1 text-xs text-zinc-500">
                        {highlights.map((h) => (
                            <li key={h} className="flex gap-2">
                                <span className="text-zinc-400 dark:text-zinc-600">–</span>
                                {h}
                            </li>
                        ))}
                    </ul>
                    {stack.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {stack.map((t) => (
                                <span key={t} className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-4 border-t border-zinc-200 pt-3 text-xs font-medium dark:border-zinc-800">
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-black hover:underline dark:text-white">
                            Visit site ↗
                        </a>
                        {repo && (
                            <a href={repo} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-black hover:underline dark:hover:text-white">
                                Source ↗
                            </a>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

type RecentPost = { slug: string; title: string; publishedAt: string }

export default function HomePageClient({ posts }: { posts: RecentPost[] }) {
    const { trigger } = useWebHaptics()
    const [playClick] = useSound(clickSoftSound)
    const [portraitIndex, setPortraitIndex] = useState(0)
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.div
            className="space-y-8"
            variants={VARIANTS_CONTAINER}
            initial={shouldReduceMotion ? 'visible' : 'hidden'}
            animate="visible"
        >
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <header className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.button
                            type="button"
                            aria-label={`Show next profile photo; current photo ${portraitIndex + 1} of 3`}
                            title="Tap to cycle profile photos"
                            className="group relative size-14 shrink-0 touch-manipulation rounded-full outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                            onClick={() => {
                                setPortraitIndex((current) => (current + 1) % 3)
                                trigger('medium')
                                playClick()
                            }}
                        >
                            <span className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={portraitIndex}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 1.08 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                                    >
                                        <Image
                                            src={[
                                                '/instagram-profile.png',
                                                '/instagram-profile-alt.png',
                                                '/profile-photo-third.png',
                                            ][portraitIndex]}
                                            alt={`Portrait ${portraitIndex + 1} of Mohammed Sadik`}
                                            fill
                                            sizes="56px"
                                            priority={portraitIndex === 0}
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </span>
                            <span aria-hidden="true" className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-[10px] text-white dark:border-black dark:bg-white dark:text-black transition-transform group-hover:rotate-45">
                                ↻
                            </span>
                            <span aria-hidden="true" className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tabular-nums text-zinc-400 dark:text-zinc-500">
                                {portraitIndex + 1} / 3
                            </span>
                        </motion.button>
                        <div>
                            <h1 className="text-balance font-medium text-black dark:text-white">
                                <Link
                                    href="/"
                                    onMouseEnter={() => trigger('selection')}
                                    onClick={() => { trigger('medium'); playClick(); }}
                                >
                                    MOHAMMED SADIK
                                </Link>
                            </h1>
                            <p className="[--dia-fg:var(--color-zinc-600)] dark:[--dia-fg:var(--color-zinc-500)]">
                                <DiaText text="Full Stack Engineer" delay={shouldReduceMotion ? 0 : 0.5} duration={shouldReduceMotion ? 0 : 1.5} textColor="var(--dia-fg)" />
                            </p>
                        </div>
                    </div>
                </header>


                <div className="space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
                    <div>
                        I&apos;m a Founding Engineer at{' '}
                        <ProjectLink
                            href="https://creeto.ai"
                            name="Creeto.ai"
                            role="Founding Engineer"
                            tagline="AI talking-head videos for founders and creators. Drop in a topic, doc or PDF and get a finished short-form video starring your digital twin."
                            highlights={[
                                'Personal avatars and voice cloning',
                                'Auto scenes, b-roll and timed captions',
                                'Create videos straight from WhatsApp',
                            ]}
                            favicon={
                                <>
                                    <Image src="https://creeto.ai/favicon-dark.ico" alt="" width={14} height={14} unoptimized className="w-3.5 h-3.5 rounded-sm dark:hidden" />
                                    <Image src="https://creeto.ai/favicon-light.ico" alt="" width={14} height={14} unoptimized className="w-3.5 h-3.5 rounded-sm hidden dark:block" />
                                </>
                            }
                        />, working on the agentic workflow and backend architecture to ship scalable solutions. Previously, I created{' '}
                        <ProjectLink
                            href="https://blipko.lol/"
                            name="Blipko"
                            role="Creator"
                            tagline={blipko.description}
                            highlights={[
                                'Log spends by text or voice in Malayalam, Hindi or English',
                                '50/30/20 budgets that follow your payday',
                                '/status and /report right inside the chat',
                            ]}
                            stack={blipko.techStack.slice(0, 6)}
                            repo={blipko.repoLink}
                            favicon={
                                <Image
                                    src="https://blipko.lol/favicon.ico"
                                    alt=""
                                    width={14}
                                    height={14}
                                    unoptimized
                                    className="w-3.5 h-3.5 rounded-sm"
                                    onError={(e) => { e.currentTarget.src = "https://www.google.com/s2/favicons?domain=blipko.lol&sz=64"; }}
                                />
                            }
                        /> to help users track expenses and balances via Telegram, and built{' '}
                        <ProjectLink
                            href="https://inspecto-flax.vercel.app/"
                            name="Inspecto"
                            role="Creator"
                            tagline={inspecto.description}
                            highlights={[
                                'Book verified inspectors for any vehicle',
                                'Real-time updates and Stripe payments',
                            ]}
                            stack={inspecto.techStack.filter((t) => t !== 'Git').slice(0, 6)}
                            repo={inspecto.repoLink}
                            favicon={
                                <Image
                                    src="https://inspecto-flax.vercel.app/favicon.ico"
                                    alt=""
                                    width={14}
                                    height={14}
                                    unoptimized
                                    className="w-3.5 h-3.5 rounded-sm"
                                    onError={(e) => { e.currentTarget.src = "https://www.google.com/s2/favicons?domain=inspecto-flax.vercel.app&sz=64"; }}
                                />
                            }
                        /> to streamline vehicle inspections.
                    </div>

                    <div>
                        Outside work, I&apos;m passionate about{' '}
                        <HoverCard openDelay={100}>
                            <HoverCardTrigger asChild>
                                <a
                                    href="https://www.instagram.com/square_story/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-current dark:text-white dark:decoration-zinc-700"
                                    onMouseEnter={() => trigger('selection')}
                                    onClick={() => { trigger('medium'); playClick(); }}
                                >
                                    photography
                                </a>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64">
                                <div className="space-y-3">
                                    <Image
                                        src="/instagram-profile.png"
                                        alt="Instagram profile photo"
                                        width={64}
                                        height={64}
                                        className="size-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-xs text-zinc-500">Photography</p>
                                        <p className="text-sm font-medium text-black dark:text-white">@square_story</p>
                                    </div>
                                    <a
                                        href="https://www.instagram.com/square_story/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-xs font-medium text-zinc-600 hover:text-black hover:underline dark:text-zinc-400 dark:hover:text-white"
                                        onClick={() => { trigger('medium'); playClick(); }}
                                    >
                                        View Instagram ↗
                                    </a>
                                </div>
                            </HoverCardContent>
                        </HoverCard>, open-source, and exploring new technologies.
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                aria-labelledby="selected-work"
            >
                <h2 id="selected-work" className="mb-3 text-sm font-medium text-black dark:text-white">Selected work</h2>
                <ul className="space-y-3">
                    {PROJECTS.map((project) => (
                        <li key={project.slug}>
                            <Link
                                href={`/work/${project.slug}`}
                                className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                                onMouseEnter={() => trigger('selection')}
                                onClick={() => { trigger('medium'); playClick(); }}
                            >
                                <span className="text-[15px] font-medium text-zinc-800 transition-colors group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white">
                                    {project.name} →
                                </span>
                                <span className="block text-sm text-zinc-500 dark:text-zinc-400">{project.description}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.section>

            {posts.length > 0 && (
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    aria-labelledby="recent-writing"
                >
                    <h2 id="recent-writing" className="mb-3 text-sm font-medium text-black dark:text-white">Recent writing</h2>
                    <ul className="space-y-2">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex items-baseline justify-between gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                                    onMouseEnter={() => trigger('selection')}
                                    onClick={() => { trigger('medium'); playClick(); }}
                                >
                                    <span className="text-[15px] text-zinc-800 transition-colors group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white">
                                        {post.title}
                                    </span>
                                    <time dateTime={post.publishedAt} className="shrink-0 text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </time>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.section>
            )}

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
                            <a
                                href="https://github.com/square-story"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black dark:hover:text-white transition-colors block"
                                onMouseEnter={() => trigger('selection')}
                                onClick={() => { trigger('medium'); playClick(); }}
                            >
                                GitHub
                            </a>
                        </Magnetic>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Follow Updates</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a
                                href="https://twitter.com/sadikbuilds"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black dark:hover:text-white transition-colors block"
                                onMouseEnter={() => trigger('selection')}
                                onClick={() => { trigger('medium'); playClick(); }}
                            >
                                Twitter
                            </a>
                        </Magnetic>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Connect</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a
                                href="https://www.linkedin.com/in/sadikkp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black dark:hover:text-white transition-colors block"
                                onMouseEnter={() => trigger('selection')}
                                onClick={() => { trigger('medium'); playClick(); }}
                            >
                                LinkedIn
                            </a>
                        </Magnetic>
                    </div>
                    <div className="relative">
                        <Cursor attachToParent variants={{ initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } }} transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
                            <div className="px-3 py-1.5 bg-black/80 dark:bg-white/80 text-white dark:text-black rounded-full text-xs font-medium backdrop-blur-md translate-x-12 translate-y-8">Say Hello</div>
                        </Cursor>
                        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="global" range={100}>
                            <a
                                href="mailto:sadik.build@gmail.com"
                                className="hover:text-black dark:hover:text-white transition-colors block"
                                onMouseEnter={() => trigger('selection')}
                                onClick={() => { trigger('medium'); playClick(); }}
                            >
                                Email
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    )
}
