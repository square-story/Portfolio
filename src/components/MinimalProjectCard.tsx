"use client";

import { DATA } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
    project: (typeof DATA.projects)[number];
    index: number;
    active: number | null;
    setActive: (index: number | null) => void;
}

function ProjectCard({ project, index, active, setActive }: ProjectCardProps) {
    const isActive = active === index;

    return (
        <li
            className={cn(
                "group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent/50",
                isActive ? "ring-2 ring-primary/20 bg-accent/50" : "hover:border-primary/50"
            )}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(isActive ? null : index)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(isActive ? null : index);
                }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            aria-label={`View details for ${project.title}`}
        >
            <div className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                    {project.image && (
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md border sm:h-14 sm:w-14 bg-muted">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-base tracking-tight truncate">
                                {project.title}
                            </h3>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap font-mono">
                                {project.dates}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Technologies - Visible on Desktop when not active, hidden on mobile initially */}
                        {!isActive && project.technologies && project.technologies.length > 0 && (
                            <div className="mt-3 hidden sm:flex flex-wrap gap-1.5">
                                {project.technologies.slice(0, 4).map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="secondary"
                                        className="px-1.5 py-0 text-[10px] font-normal"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                                {project.technologies.length > 4 && (
                                    <span className="text-[10px] text-muted-foreground self-center px-1">
                                        +{project.technologies.length - 4}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                        >
                            {/* Expanded Content */}
                            <div className="space-y-3 pt-3 mt-3 border-t border-border/50">
                                {project.image && (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/50 sm:hidden">
                                        <img
                                            src={project.image}
                                            alt={`${project.title} preview`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}



                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.technologies.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="px-2 py-0.5 text-[10px] sm:text-xs font-normal"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {project.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-primary",
                                                    "px-3 py-1.5 rounded-md bg-secondary/50 hover:bg-secondary"
                                                )}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {link.type === "Website" && <Globe className="h-3.5 w-3.5" />}
                                                {link.type === "Source" && <Github className="h-3.5 w-3.5" />}
                                                {link.type}
                                                <ArrowUpRight className="h-3 w-3 opacity-50" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </li>
    );
}

export function MinimalProjectList() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
            <ul className="flex flex-col gap-4">
                {DATA.projects.map((project, idx) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={idx}
                        active={active}
                        setActive={setActive}
                    />
                ))}
            </ul>
        </section>
    );
}