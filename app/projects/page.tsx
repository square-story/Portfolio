import { PROJECTS } from '@/app/data'
import { ProjectsClient } from './projects-client'
import { ProjectCard } from '@/components/project-card'

export const metadata = {
    title: 'Projects',
    description: 'A showcase of my projects and experiments.',
}

export default function ProjectsPage() {
    const featuredProjects = PROJECTS.filter((p) => p.featured)

    return (
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-8 md:px-0 lg:py-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                    Projects
                </h1>
                <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
                    A collection of web applications, tools, and experiments I've built.
                </p>
            </div>

            {featuredProjects.length > 0 && (
                <section className="space-y-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Featured</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            )}

            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">All Projects</h2>
                <ProjectsClient projects={PROJECTS} />
            </div>
        </div>
    )
}
