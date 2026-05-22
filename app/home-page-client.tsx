'use client'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { PROJECTS, EMAIL, SOCIAL_LINKS, Project, WORK_EXPERIENCE } from './data'
import GithubCalendarWidget from '@/components/ui/GithubCalendarWidget'
import { AnimatedBackground } from '@/components/ui/animated-background'
import Link from 'next/link'
import Image from 'next/image'
import { ProjectCard } from '@/components/project-card'
import { Activity } from 'react-activity-calendar'
import { TechLogoLoop } from '@/components/tech-logo-loop'
import { TextLoop } from '@/components/ui/text-loop'

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
    duration: 0.3,
}

export function MagneticSocialLink({
    children,
    link,
}: {
    children: React.ReactNode
    link: string
}) {
    return (
        <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <a
                href={link}
                className="group relative inline-flex shrink-0 items-center gap-px rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
                {children}
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                >
                    <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </a>
        </Magnetic>
    )
}

type BlogPost = {
    metadata: {
        title: string
        summary: string
    }
    slug: string
}

export default function HomePageClient({ posts, githubData }: { posts: BlogPost[], githubData: Activity[] }) {
    return (
        <motion.main
            className="space-y-12"
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
        >
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="flex-1">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Creating{' '}
                        <TextLoop className="font-medium text-black dark:text-zinc-100">
                            <span>intuitive</span>
                            <span>performant</span>
                            <span>delightful</span>
                            <span>beautiful</span>
                        </TextLoop>{' '}
                        web experiences bridging design and development.
                    </p>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <TechLogoLoop />
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Selected Projects</h3>
                    <Link href="/projects" className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">
                        View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <h3 className="text-lg font-medium">Work Experience</h3>
                <div className="flex flex-col space-y-0">
                    <AnimatedBackground
                        enableHover
                        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.2,
                        }}
                    >
                        {WORK_EXPERIENCE.map((exp) => (
                            <a
                                key={exp.id}
                                className="-mx-3 flex flex-col space-y-2 rounded-xl px-3 py-3"
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-id={exp.id}
                            >
                                <div className="flex items-start justify-between w-full gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 font-medium text-black dark:text-zinc-100 group">
                                            <span>{exp.company}</span>
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                        </div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {exp.title}
                                        </p>
                                    </div>
                                    <span className="text-sm text-zinc-400 dark:text-zinc-500 font-normal shrink-0">
                                        {exp.start} — {exp.end}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                        {exp.description}
                                    </p>
                                )}
                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 font-normal"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </a>
                        ))}
                    </AnimatedBackground>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <GithubCalendarWidget data={githubData} />
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Blog</h3>
                    <Link href="/blog" className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">
                        View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
                <div className="flex flex-col space-y-0">
                    <AnimatedBackground
                        enableHover
                        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.2,
                        }}
                    >
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                className="-mx-3 rounded-xl px-3 py-3"
                                href={`/blog/${post.slug}`}
                                data-id={post.slug}
                            >
                                <div className="flex flex-col space-y-1">
                                    <h4 className="font-normal dark:text-zinc-100">
                                        {post.metadata.title}
                                    </h4>
                                    <p className="text-zinc-500 dark:text-zinc-400">
                                        {post.metadata.summary}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </AnimatedBackground>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <h3 className="mb-5 text-lg font-medium">Connect</h3>
                <p className="mb-5 text-zinc-600 dark:text-zinc-400">
                    Feel free to contact me at{' '}
                    <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
                        {EMAIL}
                    </a>
                </p>
                <div className="flex items-center justify-start space-x-3">
                    {SOCIAL_LINKS.map((link) => (
                        <MagneticSocialLink key={link.label} link={link.link}>
                            {link.label}
                        </MagneticSocialLink>
                    ))}
                </div>
            </motion.section>
        </motion.main>
    )
}
