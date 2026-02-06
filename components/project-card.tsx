'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

type ProjectCardProps = {
    project: {
        name: string
        description: string
        slug: string
        media: string[]
        techStack: string[]
        featured: boolean
        repoLink?: string
        link: string
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    const src = project.media[0]
    const isVideo = src.match(/\.(mp4|webm|ogg)$/i) || src.includes('cloudinary')

    return (
        <Link href={`/projects/${project.slug}`} className="group block h-full">
            <div className="flex h-full flex-col space-y-4">
                {/* Media Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                        {isVideo ? (
                            <video
                                src={src}
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onMouseOver={(e) => e.currentTarget.play()}
                                onMouseOut={(e) => e.currentTarget.pause()}
                            />
                        ) : (
                            <Image
                                src={src}
                                alt={project.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="flex items-center justify-center rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm dark:bg-black/90">
                                <ArrowUpRight className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col space-y-2 px-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {project.name}
                        </h3>
                    </div>

                    <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
