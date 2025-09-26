"use client";
import { DATA } from "@/data/resume";
import { useState } from "react";


export function MinimalProjectList() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <ul className="flex flex-col gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {DATA.projects.map((project, idx) => (
                <li
                    key={project.title}
                    className={`
            group relative border rounded-xl px-4 py-3 sm:px-5 sm:py-4 transition-all
            cursor-pointer bg-background/70 backdrop-blur-[1px] hover:bg-accent/40
            hover:shadow-md focus:shadow-md outline-none
            ${active === idx ? "ring-2 ring-border/60 shadow-lg z-10" : ""}
          `}
                    onMouseEnter={() => setActive(idx)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(active === idx ? null : idx)}
                    tabIndex={0}
                    onFocus={() => setActive(idx)}
                    onBlur={() => setActive(null)}
                >
                    <div className="flex items-start gap-3">
                        {project.image && (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="hidden xs:block w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover border"
                                loading="lazy"
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold truncate text-sm sm:text-base">
                                    {project.title}
                                </span>
                                <span className="whitespace-nowrap text-[10px] sm:text-xs text-muted-foreground">
                                    {project.dates}
                                </span>
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2 group-focus:line-clamp-none">
                                {project.description}
                            </div>
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mt-2 hidden sm:flex flex-wrap gap-1">
                                    {project.technologies.slice(0, 6).map((tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex items-center px-2 py-0.5 rounded border text-[10px] text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 6 && (
                                        <span className="text-[10px] text-muted-foreground px-1">
                                            +{project.technologies.length - 6}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Reveal on hover/focus/active */}
                    <div
                        className={`
              transition-all overflow-hidden
              ${active === idx ? "max-h-[700px] mt-3 opacity-100" : "max-h-0 opacity-0"}
            `}
                    >
                        {project.image && (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full max-h-52 object-cover rounded-md mb-3 border"
                                loading="lazy"
                            />
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="mb-3 flex sm:hidden flex-wrap gap-1">
                                {project.technologies.slice(0, 6).map((tech) => (
                                    <span
                                        key={tech}
                                        className="inline-flex items-center px-2 py-0.5 rounded border text-[10px] text-muted-foreground"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.technologies.length > 6 && (
                                    <span className="text-[10px] text-muted-foreground px-1">
                                        +{project.technologies.length - 6}
                                    </span>
                                )}
                            </div>
                        )}
                        {project.links && project.links.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 rounded border bg-accent/40 hover:bg-accent/60 transition-colors"
                                    >
                                        {link.icon}
                                        {link.type}
                                    </a>
                                ))}
                            </div>
                        )}
                        {/* Add more details if needed */}
                    </div>
                </li>
            ))}
        </ul>
    );
}