'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { FilterBar } from '@/components/filter-bar'
import { ProjectCard } from '@/components/project-card'
import { Project } from '@/app/data'

export function ProjectsClient({ projects }: { projects: Project[] }) {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = Array.from(new Set(projects.map((p) => p.category)))

    const filteredProjects =
        selectedCategory === 'All'
            ? projects
            : projects.filter((p) => p.category === selectedCategory)

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-zinc-600 dark:text-zinc-400">
                    Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </p>
                <FilterBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-zinc-500">No projects found for this category.</p>
                </div>
            )}
        </div>
    )
}
