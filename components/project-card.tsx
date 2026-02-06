'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/app/data'
import { cn } from '@/lib/utils'

export function ProjectCard({ project }: { project: Project }) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Link href={`/projects/${project.slug}`} className="group block h-full">
            <div className="flex h-full flex-col space-y-4">
                {/* Media Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-800/50 dark:ring-zinc-800/50">
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                        <Image
                            src={project.thumbnail}
                            alt={project.name}
                            fill
                            className={cn(
                                "object-cover transition-all duration-500 ease-in-out group-hover:scale-105",
                                isLoading ? "scale-110 blur-xl grayscale" : "scale-100 blur-0 grayscale-0"
                            )}
                            onLoad={() => setIsLoading(false)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
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
