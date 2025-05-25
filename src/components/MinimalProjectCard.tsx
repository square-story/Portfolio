"use client";
import { DATA } from "@/data/resume";
import { useState } from "react";


export function MinimalProjectList() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <ul className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
            {DATA.projects.map((project, idx) => (
                <li
                    key={project.title}
                    className={`
            group relative border rounded-lg px-4 py-3 transition-all
            cursor-pointer bg-background hover:bg-accent/30
            ${active === idx ? "shadow-lg z-10" : ""}
          `}
                    onMouseEnter={() => setActive(idx)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(active === idx ? null : idx)}
                    tabIndex={0}
                    onFocus={() => setActive(idx)}
                    onBlur={() => setActive(null)}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">{project.title}</span>
                        <span className="text-xs text-muted-foreground">{project.dates}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{project.description}</div>
                    {/* Reveal on hover/focus/active */}
                    <div
                        className={`
              transition-all overflow-hidden
              ${active === idx ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"}
            `}
                    >
                        {project.image && (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full max-h-48 object-cover rounded-md mb-2"
                            />
                        )}
                        {project.links && project.links.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-accent hover:bg-accent/50"
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