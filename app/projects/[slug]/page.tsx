import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Github, Globe } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { PROJECTS } from '@/app/data'
import { getProjectMDX } from '@/lib/mdx'
import { useMDXComponents } from '@/mdx-components'
import { TechIcon } from '@/components/tech-icon'

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const project = PROJECTS.find((p) => p.slug === params.slug)
    if (!project) {
        return
    }
    return {
        title: `${project.name} - Project Case Study`,
        description: project.description,
    }
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const project = PROJECTS.find((p) => p.slug === params.slug)
    const mdx = getProjectMDX(params.slug)

    if (!project) {
        notFound()
    }

    // Use existing MDX components configuration
    const components = useMDXComponents({})

    return (
        <article className="mx-auto max-w-3xl px-4 py-8 md:px-0 lg:py-12">
            {/* Back Link */}
            <Link
                href="/projects"
                className="group mb-8 inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
            </Link>

            {/* Header */}
            <header className="mb-10 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                                Featured
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                        {project.name}
                    </h1>

                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 border-y border-zinc-200 py-6 dark:border-zinc-800">
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <TechIcon key={tech} name={tech} />
                        ))}
                    </div>

                    <div className="ml-auto flex gap-3">
                        {project.repoLink && (
                            <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                <Github className="h-4 w-4" />
                                <span>Source</span>
                            </a>
                        )}
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            <Globe className="h-4 w-4" />
                            <span>Visit Site</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Image/Video */}
            <div className="mb-12 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                {project.media[0].match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                        src={project.media[0]}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full"
                    />
                ) : (
                    <Image
                        src={project.media[0]}
                        alt={project.name}
                        width={1280}
                        height={720}
                        className="w-full object-cover"
                    />
                )}
            </div>

            {/* Content */}
            <div className="prose prose-zinc max-w-none dark:prose-invert">
                {mdx ? (
                    <MDXRemote source={mdx.content} components={components} />
                ) : (
                    <p className="italic text-zinc-500">Case study content coming soon...</p>
                )}
            </div>
        </article>
    )
}
